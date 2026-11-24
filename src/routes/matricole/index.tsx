import { createFileRoute } from "@tanstack/react-router"
import { CONTAINER, PAGE_MAIN } from "@/components/layout/page"
import { FAQsPage } from "@/components/matricole/faqs"
import { MatricoleGuides } from "@/components/matricole/guides"
import { MatricoleIntro } from "@/components/matricole/intro"
import { pageMeta } from "@/lib/seo"
import { fetchFreshmanContent } from "@/queries/functions"

export const Route = createFileRoute("/matricole/")({
  loader: () => fetchFreshmanContent(),
  head: () => ({
    meta: pageMeta({
      title: "Matricole",
      description: "Risorse utili, guide e strumenti per le matricole del Politecnico di Milano.",
    }),
  }),
  component: MatricolePage,
})

function MatricolePage() {
  const content = Route.useLoaderData()
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
