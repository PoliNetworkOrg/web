import "server-only"

import { idpEndpoints, type ServiceTokenSourceOptions, serviceTokenSource } from "@polinetwork/auth-kit"
import { type AppRouter, TRPC_PATH } from "@polinetwork/backend"
import { createTRPCClient, httpBatchLink, retryLink, splitLink } from "@trpc/client"
import SuperJSON from "superjson"
import { env } from "@/env"

/** Scope of the `website` client (RFC v3 §6.2). */
const PUBLIC_READ_SCOPE = "backend:public:read"

/**
 * Procedures the backend does not yet open to `backend:public:read`: a service token is refused
 * there, so they stay on the anonymous legacy path until the backend accepts the website's token.
 */
const ANONYMOUS_PROCEDURES = new Set(["groups.search.getAll", "groups.search.search"])

function parsePrivateKey(value: string): ServiceTokenSourceOptions["privateKey"] {
  try {
    return JSON.parse(value)
  } catch {
    throw new Error("OAUTH_WEBSITE_PRIVATE_JWK must be a JSON Web Key")
  }
}

/** Client credentials for the `website` client, or null while the IdP is not configured. */
function createTokenSource() {
  // env.js enforces all or none of these, so a partial configuration never reaches this point.
  const publicUrl = env.IDP_PUBLIC_URL
  const resource = env.OAUTH_BACKEND_RESOURCE_URI
  const clientId = env.OAUTH_WEBSITE_CLIENT_ID
  const privateKey = env.OAUTH_WEBSITE_PRIVATE_JWK
  if (!publicUrl || !resource || !clientId || !privateKey) return null
  const endpoints = idpEndpoints({
    publicUrl,
    ...(env.IDP_INTERNAL_URL ? { internalUrl: env.IDP_INTERNAL_URL } : {}),
  })
  return serviceTokenSource({
    clientId,
    privateKey: parsePrivateKey(privateKey),
    tokenUrl: endpoints.tokenUrl,
    tokenAudience: endpoints.tokenAudience,
    resource,
    scopes: [PUBLIC_READ_SCOPE],
    // auth-kit errors carry a stable code and never include tokens or keys.
    onError: (error) => console.warn("[IDP] token renewal failed", error),
  })
}

const tokens = createTokenSource()
const url = env.BACKEND_URL + TRPC_PATH
const anonymousLink = httpBatchLink({ url, transformer: SuperJSON })

export const trpc = createTRPCClient<AppRouter>({
  links: tokens
    ? [
        // A 401 is decided before the procedure runs, so retrying once with a new token is safe for
        // mutations too. The backend may have rejected an expired or revoked token we still cached.
        retryLink({
          retry: ({ op, error, attempts }) => {
            if (attempts > 1 || ANONYMOUS_PROCEDURES.has(op.path) || error.data?.httpStatus !== 401) return false
            tokens.invalidate()
            return true
          },
        }),
        splitLink({
          condition: (op) => ANONYMOUS_PROCEDURES.has(op.path),
          true: anonymousLink,
          false: httpBatchLink({
            url,
            transformer: SuperJSON,
            headers: async () => ({ Authorization: `Bearer ${await tokens.getToken()}` }),
          }),
        }),
      ]
    : [anonymousLink],
})
