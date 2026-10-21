import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

const IDP_REQUIRED_VARIABLES = /** @type {const} */ ([
  "IDP_PUBLIC_URL",
  "OAUTH_BACKEND_RESOURCE_URI",
  "OAUTH_WEBSITE_CLIENT_ID",
  "OAUTH_WEBSITE_PRIVATE_JWK",
])
const IDP_VARIABLES = /** @type {const} */ ([...IDP_REQUIRED_VARIABLES, "IDP_INTERNAL_URL"])

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    BACKEND_URL: z.url().default("http://localhost:3000"),

    // PoliNetwork IdP (RFC v3 §6, §13 Phase 4a). With these set, backend calls carry a service token
    // for the `website` client; with none set, they stay anonymous (legacy path).
    IDP_PUBLIC_URL: z.url().optional(),
    /** In-cluster address for token requests; identifiers always come from IDP_PUBLIC_URL. */
    IDP_INTERNAL_URL: z.url().optional(),
    OAUTH_BACKEND_RESOURCE_URI: z.url().optional(),
    OAUTH_WEBSITE_CLIENT_ID: z.string().min(1).optional(),
    /** The website client's private signing key as a JWK (JSON), with `kid` and `alg`. */
    OAUTH_WEBSITE_PRIVATE_JWK: z.string().min(1).optional(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    BACKEND_URL: process.env.BACKEND_URL,
    IDP_PUBLIC_URL: process.env.IDP_PUBLIC_URL,
    IDP_INTERNAL_URL: process.env.IDP_INTERNAL_URL,
    OAUTH_BACKEND_RESOURCE_URI: process.env.OAUTH_BACKEND_RESOURCE_URI,
    OAUTH_WEBSITE_CLIENT_ID: process.env.OAUTH_WEBSITE_CLIENT_ID,
    OAUTH_WEBSITE_PRIVATE_JWK: process.env.OAUTH_WEBSITE_PRIVATE_JWK,
  },
  /**
   * The IdP variables are all or nothing: a partial set would silently fall back to anonymous calls.
   * IDP_INTERNAL_URL is optional within the set.
   */
  createFinalSchema: (shape, isServer) =>
    z.object(shape).superRefine((values, ctx) => {
      if (!isServer || !IDP_VARIABLES.some((name) => values[name] !== undefined)) return
      for (const name of IDP_REQUIRED_VARIABLES)
        if (values[name] === undefined)
          ctx.addIssue({
            code: "custom",
            path: [name],
            message: `${name} is missing: set all of ${IDP_REQUIRED_VARIABLES.join(", ")}, or none of the IdP variables`,
          })
    }),
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
})
