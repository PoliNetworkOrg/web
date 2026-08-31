import type { Metadata } from "next"
import { SchoolStep } from "@/components/groups/school-step"

export const metadata: Metadata = {
  title: "Gruppi Didattici",
  description: "Trova i gruppi Telegram e WhatsApp del tuo corso di studi, partendo dalla tua scuola.",
}

export default function DidatticaWizard() {
  return <SchoolStep />
}
