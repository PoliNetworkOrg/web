/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js"

/** @type {import("next").NextConfig} */
const config = {
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
  reactCompiler: true,
  experimental: {
    turbopackRustReactCompiler: true,
  },
  // The pages were renamed in Italian: the old English URLs (shared links, bookmarks) go to the new ones
  async redirects() {
    const renamed = {
      about: "struttura",
      associations: "associazioni",
      contact: "contatti",
      documents: "documenti",
      faqs: "faq",
      groups: "gruppi",
      guides: "guide",
      join: "unisciti",
      projects: "progetti",
    }
    return Object.entries(renamed).flatMap(([from, to]) => [
      { source: `/${from}`, destination: `/${to}`, permanent: true },
      { source: `/${from}/:path*`, destination: `/${to}/:path*`, permanent: true },
    ])
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.blob.core.windows.net",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/toto04/webeep-sync/**",
        search: "",
      },
    ],
  },
}

export default config
