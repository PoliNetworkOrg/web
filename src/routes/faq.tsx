import { createFileRoute } from "@tanstack/react-router"
import { FaqsTabs } from "@/components/faqs/faqs-tabs"
import { CONTAINER, PAGE_HERO, PAGE_MAIN } from "@/components/layout/page"
import { Hero } from "@/components/ui/hero"
import { pageMeta } from "@/lib/seo"
import { cn } from "@/lib/utils"
import { fetchFaqs } from "@/queries/functions"

export const Route = createFileRoute("/faq")({
  loader: () => fetchFaqs(),
  head: () => ({
    meta: pageMeta({ title: "FAQ", description: "Risposte chiare per vivere al meglio la community" }),
  }),
  component: FAQsPage,
})

function FAQsPage() {
  const categories = Route.useLoaderData()

  return (
    <main className={PAGE_MAIN}>
      {/* The same break after the hero as on the other pages (Associazioni, Team…) */}
      <section className={cn(CONTAINER, PAGE_HERO)}>
        <Hero title="FAQ" description="Risposte chiare per vivere al meglio la community" />
      </section>
      <section aria-label="Domande frequenti" className={CONTAINER}>
        <FaqsTabs categories={categories} />
      </section>
    </main>
  )
}
