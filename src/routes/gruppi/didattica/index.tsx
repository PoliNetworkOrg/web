import { createFileRoute } from "@tanstack/react-router"
import { SchoolStep } from "@/components/wizard/school-step"
import { pageMeta, STATIC_PAGE_HEADERS } from "@/lib/seo"
import { createStepHref } from "@/utils/step-href"

const stepHref = createStepHref("/gruppi/didattica")

export const Route = createFileRoute("/gruppi/didattica/")({
  head: () => ({
    meta: pageMeta({
      title: "Gruppi Didattici",
      description: "Trova i gruppi Telegram e WhatsApp del tuo corso di studi, partendo dalla tua scuola.",
    }),
  }),
  headers: () => STATIC_PAGE_HEADERS,
  component: DidatticaWizard,
})

function DidatticaWizard() {
  return <SchoolStep caption="Troviamo il tuo gruppo partendo dalla base!" landingHref="/gruppi" stepHref={stepHref} />
}
