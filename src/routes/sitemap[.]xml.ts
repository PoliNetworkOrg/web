import { createFileRoute } from "@tanstack/react-router"
import { SITE_URL } from "@/lib/site.server"

/** The pages reachable from the navigation; the per-course pages are listed by their wizards */
const ROUTES = [
  "/",
  "/chi-siamo",
  "/storia",
  "/ringraziamenti",
  "/struttura",
  "/team",
  "/unisciti",
  "/collabora",
  "/contatti",
  "/gruppi",
  "/gruppi/didattica",
  "/gruppi/extra",
  "/matricole",
  "/matricole/guida",
  "/associazioni",
  "/guide",
  "/guide/generali",
  "/guide/corso",
  "/faq",
  "/progetti",
]

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = ROUTES.map((route) => `<url>\n<loc>${new URL(route, SITE_URL).href}</loc>\n</url>`)
        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
          { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=0, must-revalidate" } }
        )
      },
    },
  },
})
