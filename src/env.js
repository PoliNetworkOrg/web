import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    BACKEND_URL: z.url().default("http://localhost:3000"),

    // PoliNetwork IdP (RFC v3 §6). Backend calls carry a service token for the `website` client; the
    // backend refuses calls without one.
    IDP_PUBLIC_URL: z.url(),
    /** In-cluster address for token requests; identifiers always come from IDP_PUBLIC_URL. */
    IDP_INTERNAL_URL: z.url().optional(),
    OAUTH_BACKEND_RESOURCE_URI: z.url(),
    OAUTH_WEBSITE_CLIENT_ID: z.string().min(1),
    /** The website client's private signing key as a JWK (JSON), with `kid` and `alg`. */
    OAUTH_WEBSITE_PRIVATE_JWK: z.string().min(1),
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
