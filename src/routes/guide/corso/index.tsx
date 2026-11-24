import { createFileRoute } from "@tanstack/react-router"
import { SchoolStep } from "@/components/wizard/school-step"
import { pageMeta, STATIC_PAGE_HEADERS } from "@/lib/seo"
import { createStepHref } from "@/utils/step-href"

const stepHref = createStepHref("/guide/corso")

export const Route = createFileRoute("/guide/corso/")({
  head: () => ({
    meta: pageMeta({
      title: "Guide del tuo corso",
      description: "Trova le guide del tuo corso di studi, partendo dalla tua scuola.",
    }),
  }),
  headers: () => STATIC_PAGE_HEADERS,
  component: GuidesCorsoWizard,
})

function GuidesCorsoWizard() {
  return <SchoolStep caption="Troviamo la tua guida partendo dalla base!" landingHref="/guide" stepHref={stepHref} />
}
