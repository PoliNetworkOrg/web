import { env } from "@/env"

/** Public origin of the site, for absolute URLs in metadata, the sitemap and robots.txt */
export const SITE_URL = new URL(env.SITE_URL ?? "https://polinetwork.org")
