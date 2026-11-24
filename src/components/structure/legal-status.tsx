import { FiArrowUpRight } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { GradientIcon } from "@/components/gradient-icon"
import { SECTION_TITLE } from "@/components/layout/page"
import { Link } from "@/components/link"
import { Button } from "@/components/ui/button"
import { legalFacts } from "./constants"

export function LegalStatus() {
  return (
    <Glass className="grid gap-8 rounded-rectangles border-white/50 p-6 lg:grid-cols-2 lg:gap-16 lg:p-10">
      {/* The title, a word on what the documents are, then the way to them: the button follows from the text */}
      <div className="flex min-w-0 flex-col items-center gap-6 text-center lg:items-start lg:text-start">
        <h2 className={SECTION_TITLE}>Forma giuridica</h2>
        <p className="typo-body-large max-w-120 text-pretty">
          Come ogni ente del Terzo Settore, PoliNetwork ha uno statuto e dei regolamenti che ne definiscono il
          funzionamento. Sono pubblici: puoi consultarli quando vuoi, insieme agli altri documenti dell’associazione.
        </p>
        {/* Statute, regulations and the rest live on the documents page: one way in */}
        <Button asChild size="lg" className="mt-2">
          <Link href="/documenti">
            I nostri documenti
            <FiArrowUpRight aria-hidden />
          </Link>
        </Button>
      </div>
      <div className="flex min-w-0 flex-col gap-8">
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
    </Glass>
  )
}
