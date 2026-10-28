import type { Metadata } from "next"
import { FaqsTabs } from "@/components/faqs/faqs-tabs"
import { CONTAINER, PAGE_HERO, PAGE_MAIN } from "@/components/layout/page"
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
      {/* The tabs are the hero's own content (no new section title), so they follow it closely instead of after the
          usual post-hero break: Figma leaves ~100px between the description and the tabs */}
      <section className={cn(CONTAINER, PAGE_HERO, "flex flex-col gap-16 pb-0 md:gap-24 md:pb-0 xl:pb-0")}>
        <Hero title="FAQs" description="Risposte chiare per vivere al meglio la community" />
        <FaqsTabs categories={categories} />
      </section>
    </main>
  )
}
