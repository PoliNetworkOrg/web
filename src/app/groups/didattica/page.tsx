import type { Metadata } from "next"
import { SchoolStep } from "@/components/wizard/school-step"
import { createStepHref } from "@/utils/step-href"

const stepHref = createStepHref("/groups/didattica")

export const metadata: Metadata = {
  title: "Gruppi Didattici",
  description: "Trova i gruppi Telegram e WhatsApp del tuo corso di studi, partendo dalla tua scuola.",
}

export default function DidatticaWizard() {
  return <SchoolStep caption="Troviamo il tuo gruppo partendo dalla base!" landingHref="/groups" stepHref={stepHref} />
}
