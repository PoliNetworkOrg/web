import { FiEdit, FiFileText, FiUsers } from "react-icons/fi"
import { Card, CardAction, CardContent } from "@/components/ui/card"

const questions = [
  { text: "Dove trovo il gruppo del mio corso?", icon: FiUsers },
  { text: "Come funziona il piano degli studi?", icon: FiFileText },
  { text: "Cosa succede se non passo l’OFA di inglese?", icon: FiEdit },
] as const

export function ProblemSection() {
  return (
    <section className="page-container flex flex-col gap-block lg:flex-row lg:items-start lg:justify-between">
      <div className="flex flex-col gap-6 text-center md:text-start">
        <h2 className="typo-headline-medium md:typo-display-medium bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
          Il problema
        </h2>
        <p className="typo-body-large md:typo-headline-small">
          Il PoliMi è complesso.
          <br />
          Le informazioni non dovrebbero esserlo.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {questions.map((question) => (
          <Card key={question.text} className="h-auto min-h-42.5 w-full p-6 lg:w-50">
            <CardAction icon={question.icon} />
            <CardContent className="typo-body-medium">{question.text}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
