import type { Metadata } from "next"
import { CONTAINER, PAGE_MAIN } from "@/components/layout/page"
import { FAQsPage } from "@/components/matricole/faqs"
import { MatricoleGuides } from "@/components/matricole/guides"
import { MatricoleIntro } from "@/components/matricole/intro"
import { getFreshmanContent } from "@/queries/freshman"

export const metadata: Metadata = {
  title: "Matricole",
  description: "Risorse utili, guide e strumenti per le matricole del Politecnico di Milano.",
}

export const dynamic = "force-dynamic"

export default async function MatricolePage() {
  const content = await getFreshmanContent()
  return (
    <main className={PAGE_MAIN}>
      <MatricoleIntro resources={content?.resources ?? []} />
      {content ? (
        <>
          <MatricoleGuides content={content} />
          <FAQsPage faqs={content.faqs} />
        </>
      ) : (
        <p className={`${CONTAINER} typo-body-large text-center text-text-primary`}>
          Le risorse per le matricole non sono disponibili al momento. Riprova più tardi.
        </p>
      )}
    </main>
  )
}
