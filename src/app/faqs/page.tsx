import type { Metadata } from "next"
import { FaqsTabs } from "@/components/faqs/faqs-tabs"
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
    <main className="mx-auto flex min-h-screen w-full max-w-400 flex-col items-center justify-center gap-24 px-4 py-49">
      <Hero title="FAQs" description="Risposte chiare per vivere al meglio la community" />
      <FaqsTabs categories={categories} />
    </main>
  )
}
