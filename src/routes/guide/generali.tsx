import { createFileRoute } from "@tanstack/react-router"
import { GeneralGuides } from "@/components/guides/general-guides"
import { pageMeta, STATIC_PAGE_HEADERS } from "@/lib/seo"

export const Route = createFileRoute("/guide/generali")({
  head: () => ({
    meta: pageMeta({
      title: "Guide Generali",
      description: "Le guide generali del Politecnico di Milano.",
    }),
  }),
  headers: () => STATIC_PAGE_HEADERS,
  component: GuidesGeneraliPage,
})

function GuidesGeneraliPage() {
  return <GeneralGuides />
}
