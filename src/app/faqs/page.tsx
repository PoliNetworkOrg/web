import type { Metadata } from "next"
import { FaqsTabs } from "@/components/faqs/faqs-tabs"
import { ResourcesHeroShapes } from "@/components/resources/shapes"
import { Hero } from "@/components/ui/hero"
import { getAllFaqs } from "@/queries/faqs"

export const metadata: Metadata = {
  title: "FAQs",
  description: "Risposte chiare per vivere al meglio la community",
}

export const dynamic = "force-dynamic"

export default async function FAQsPage() {
  const categories = await getAllFaqs()

  return (
    <main className="page-layout relative flex flex-col items-center gap-section">
      <ResourcesHeroShapes />
      <Hero title="FAQs" description="Risposte chiare per vivere al meglio la community" />
      <FaqsTabs categories={categories} />
    </main>
  )
}
