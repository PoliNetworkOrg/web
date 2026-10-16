import { FiBookOpen } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { GradientIcon } from "@/components/gradient-icon"
import { Button } from "@/components/ui/button"
import { legalFacts } from "./constants"

export function LegalForm() {
  return (
    <section className="mx-auto w-full max-w-330 px-6" aria-labelledby="forma-giuridica-title">
      <Glass className="grid gap-10 rounded-rectangles border-white/50 bg-background-blur p-6 sm:p-8 lg:grid-cols-2 lg:gap-16">
        <div className="flex min-w-0 flex-col items-start gap-6 lg:gap-18">
          <h2
            id="forma-giuridica-title"
            className="typo-headline-medium sm:typo-display-medium text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent"
          >
            Forma giuridica
          </h2>
          <div className="flex flex-col items-start gap-6">
            <p className="typo-title-large sm:typo-headline-medium max-w-64 text-balance bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent">
              Consulta Statuto e Regolamenti
            </p>
            {/* TODO: link the Statute once it is published on the website */}
            <Button size="lg" disabled>
              Leggi lo statuto <FiBookOpen aria-hidden />
            </Button>
          </div>
        </div>
        <ul className="flex min-w-0 flex-col gap-4">
          {legalFacts.map((fact) => (
            <li key={fact.title} className="flex gap-4 sm:gap-8 sm:p-6">
              <GradientIcon icon={fact.icon} className="size-10 shrink-0 sm:size-12" />
              <div className="flex flex-col gap-3 sm:gap-6">
                <h3 className="typo-title-large sm:typo-headline-small text-balance bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent">
                  {fact.title}
                </h3>
                <p className="typo-body-medium text-pretty">{fact.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Glass>
    </section>
  )
}
