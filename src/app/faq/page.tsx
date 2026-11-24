import type { Metadata } from "next"
import { FaqsTabs } from "@/components/faqs/faqs-tabs"
import { CONTAINER, PAGE_HERO, PAGE_MAIN } from "@/components/layout/page"
import { Hero } from "@/components/ui/hero"
import { cn } from "@/lib/utils"
import { getAllFaqs } from "@/queries/faqs"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Risposte chiare per vivere al meglio la community",
}

export const dynamic = "force-dynamic"

export default async function FAQsPage() {
  const categories = await getAllFaqs()

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
