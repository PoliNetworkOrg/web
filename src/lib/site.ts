import { env } from "@/env"

/**
 * Public origin of the site, for absolute URLs in metadata, the sitemap and robots.txt. Static pages, robots.txt and the
 * sitemap are generated at build time, so set it when building (the Docker `SITE_URL` build argument), not only at
 * runtime. `||`, not `??`: Docker builds skip env validation, which is what turns an empty value into `undefined`.
 */
export const SITE_URL = new URL(env.SITE_URL || "https://polinetwork.org")
