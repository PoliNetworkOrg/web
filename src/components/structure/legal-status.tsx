import { FiArrowUpRight } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { GradientIcon } from "@/components/gradient-icon"
import { Button } from "@/components/ui/button"
import { legalFacts, regulationsHref, statuteHref } from "./constants"

export function LegalStatus() {
  return (
    <Glass className="grid gap-8 rounded-rectangles border-white/50 p-6 lg:grid-cols-2 lg:gap-16 lg:p-10">
      <h2 className="typo-headline-medium sm:typo-display-medium text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-center text-transparent lg:text-start">
        Forma giuridica
      </h2>
      <div className="flex min-w-0 flex-col gap-8 lg:row-span-2">
        {legalFacts.map((fact) => (
          <div key={fact.title} className="flex flex-col gap-4 md:flex-row md:gap-8">
            <GradientIcon icon={fact.icon} className="hidden size-12 shrink-0 md:block" />
            <div className="flex min-w-0 flex-col gap-4">
              <h3 className="typo-headline-small text-balance bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent">
                {fact.title}
              </h3>
              <p className="typo-body-medium text-pretty">{fact.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-6 text-center lg:col-start-1 lg:row-start-2 lg:items-start lg:self-start lg:text-start">
        <h3 className="typo-headline-small max-w-64 text-balance bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent">
          Consulta Statuto e Regolamenti
        </h3>
        <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
          <Button asChild>
            <a href={statuteHref} target="_blank" rel="noopener noreferrer">
              Leggi lo statuto
              <FiArrowUpRight aria-hidden />
            </a>
          </Button>
          <Button asChild variant="tertiary">
            <a href={regulationsHref} target="_blank" rel="noopener noreferrer">
              Leggi i regolamenti
              <FiArrowUpRight aria-hidden />
            </a>
          </Button>
        </div>
      </div>
    </Glass>
  )
}
