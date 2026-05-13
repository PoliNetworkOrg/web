import type { Metadata } from "next"
import { MatricoleIntro } from "@/components/matricole/intro"

export const metadata: Metadata = {
  title: "Matricole",
  description: "Risorse utili, guide e strumenti per le matricole del Politecnico di Milano.",
}

export default function MatricolePage() {
  return (
    <main className="w-full">
      <MatricoleIntro />
    </main>
  )
}
