import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"

/** The pages reachable from the navigation; the per-course pages are listed by their wizards */
const ROUTES = [
  "/",
  "/chi-siamo",
  "/storia",
  "/ringraziamenti",
  "/about",
  "/team",
  "/join",
  "/collabora",
  "/contact",
  "/groups",
  "/groups/didattica",
  "/groups/extra",
  "/matricole",
  "/matricole/guida",
  "/associations",
  "/guides",
  "/guides/generali",
  "/guides/corso",
  "/faqs",
  "/projects",
]

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({ url: new URL(route, SITE_URL).href }))
}
