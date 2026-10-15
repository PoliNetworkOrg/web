import { FiEdit, FiFileText, FiUsers } from "react-icons/fi"
import { Card, CardAction, CardContent } from "@/components/ui/card"

const questions = [
  { text: "Dove trovo il gruppo del mio corso?", icon: FiUsers },
  { text: "Come funziona il piano degli studi?", icon: FiFileText },
  { text: "Cosa succede se non passo l’OFA di inglese?", icon: FiEdit },
] as const

export function ProblemSection() {
  return (
    <section className="page-container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="flex min-w-0 flex-col gap-6">
        <h2 className="typo-headline-medium sm:typo-display-medium text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
          Il problema
        </h2>
        <p className="typo-body-large sm:typo-headline-extrasmall text-pretty">
          Il PoliMi è complesso. Le informazioni non dovrebbero esserlo.
        </p>
      </div>
      <div className="grid min-w-0 gap-4">
        {questions.map((question) => (
          <Card key={question.text} className="h-auto w-full flex-row items-center justify-between gap-6 p-6">
            <CardContent className="typo-body-large text-pretty">{question.text}</CardContent>
            <CardAction icon={question.icon} className="shrink-0" />
          </Card>
        ))}
      </div>
    </section>
  )
}
