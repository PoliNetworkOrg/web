import type { Metadata } from "next"
import { FAQsPage } from "@/components/matricole/faqs"
import { MatricoleGuides } from "@/components/matricole/guides"
import { MatricoleIntro } from "@/components/matricole/intro"
import { MatricoleFAQsShapes, MatricoleGuidesShapes, MatricoleIntroShapes } from "./shapes"

export const metadata: Metadata = {
  title: "Matricole",
  description: "Risorse utili, guide e strumenti per le matricole del Politecnico di Milano.",
}

export default function MatricolePage() {
  return (
    <main className="w-full">
      <div className="relative">
        <MatricoleIntroShapes />
        <MatricoleIntro />
      </div>
      <div className="relative">
        <MatricoleGuidesShapes />
        <MatricoleGuides />
      </div>
      <div className="relative">
        <MatricoleFAQsShapes />
        <FAQsPage />
      </div>
    </main>
  )
}
