import type { Metadata } from "next"
import { FaqsTabs } from "@/components/faqs/faqs-tabs"
import { CONTAINER, PAGE_HERO_TOP, PAGE_MAIN } from "@/components/layout/page"
import { Hero } from "@/components/ui/hero"
import { cn } from "@/lib/utils"
import { getAllFaqs } from "@/queries/faqs"

export const metadata: Metadata = {
  title: "FAQs",
  description: "Risposte chiare per vivere al meglio la community",
}

export const dynamic = "force-dynamic"

export default async function FAQsPage() {
  const categories = await getAllFaqs()

  return (
    <main className={PAGE_MAIN}>
      {/* The tabs belong to the hero, so they follow it without the usual break after the hero */}
      <section className={cn(CONTAINER, PAGE_HERO_TOP, "flex flex-col gap-16 md:gap-24")}>
        <Hero title="FAQs" description="Risposte chiare per vivere al meglio la community" />
        <FaqsTabs categories={categories} />
      </section>
    </main>
  )
}
