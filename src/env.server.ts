import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    BACKEND_URL: z.url().default("http://localhost:3000"),
    /** Public origin of the site, used for absolute URLs in metadata (Open Graph images, sitemap) */
    SITE_URL: z.url().optional(),
    /** Public base URL of the admin dashboard (association portal link). */
    ADMIN_URL: z.url().default("https://admin.polinetwork.org"),

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

  /** Read at runtime, on the server only: this module is never part of the browser bundle. */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    BACKEND_URL: process.env.BACKEND_URL,
    SITE_URL: process.env.SITE_URL,
    ADMIN_URL: process.env.ADMIN_URL,
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
