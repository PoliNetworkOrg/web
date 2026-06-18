import type { Metadata } from "next"
import { FaqsTabs } from "@/components/faqs/faqs-tabs"
import { Hero } from "@/components/ui/hero"

export const metadata: Metadata = {
  title: "FAQs",
  description: "Risposte chiare per vivere al meglio la community",
}

export default function FAQsPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-400 flex-col items-center justify-center gap-24 px-4 py-49">
      <Hero title="FAQs" description="Risposte chiare per vivere al meglio la community" />
      <FaqsTabs />
    </main>
  )
}
