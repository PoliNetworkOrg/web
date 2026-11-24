import { createFileRoute } from "@tanstack/react-router"
import { SITE_URL } from "@/lib/site.server"

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(`User-Agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap.xml", SITE_URL).href}\n`, {
          headers: { "Content-Type": "text/plain", "Cache-Control": "public, max-age=0, must-revalidate" },
        }),
    },
  },
})
