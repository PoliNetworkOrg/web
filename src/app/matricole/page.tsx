import type { Metadata } from "next"
import { FAQsPage } from "@/components/matricole/faqs"
import { MatricoleGuides } from "@/components/matricole/guides"
import { MatricoleIntro } from "@/components/matricole/intro"
import { ResourcesHeroShapes } from "@/components/resources/shapes"
import { getFreshmanContent } from "@/queries/freshman"
import { MatricoleFAQsShapes, MatricoleGuidesShapes } from "./shapes"

export const metadata: Metadata = {
  title: "Matricole",
  description: "Risorse utili, guide e strumenti per le matricole del Politecnico di Milano.",
}

export const dynamic = "force-dynamic"

export default async function MatricolePage() {
  const content = await getFreshmanContent()
  return (
    <main className="w-full">
      <div className="relative">
        <ResourcesHeroShapes />
        <MatricoleIntro resources={content?.resources ?? []} />
      </div>
      {content ? (
        <>
          <div className="relative">
            <MatricoleGuidesShapes />
            <MatricoleGuides content={content} />
          </div>
          <div className="relative">
            <MatricoleFAQsShapes />
            <FAQsPage faqs={content.faqs} />
          </div>
        </>
      ) : (
        <p className="typo-body-large px-6 pb-32 text-center text-text-primary">
          Le risorse per le matricole non sono disponibili al momento. Riprova più tardi.
        </p>
      )}
    </main>
  )
}
