import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"

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

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({ url: new URL(route, SITE_URL).href }))
}
