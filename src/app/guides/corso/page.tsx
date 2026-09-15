import type { Metadata } from "next"
import { SchoolStep } from "@/components/wizard/school-step"
import { createStepHref } from "@/utils/step-href"

const stepHref = createStepHref("/guides/corso")

export const metadata: Metadata = {
  title: "Guide del tuo Corso",
  description: "Trova le guide del tuo corso di studi, partendo dalla tua scuola.",
}

export default function GuidesCorsoWizard() {
  return <SchoolStep caption="Troviamo la tua guida partendo dalla base!" landingHref="/guides" stepHref={stepHref} />
}
