import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { GradientIcon } from "@/components/gradient-icon"
import { SECTION_TITLE } from "@/components/layout/page"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { legalFacts } from "./constants"

export function LegalStatus() {
  return (
    <Glass className="grid gap-8 rounded-rectangles border-white/50 p-6 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-16 lg:p-10">
      <h2 className={cn(SECTION_TITLE, "text-center lg:text-start")}>Forma giuridica</h2>
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
      {/* Statute, regulations and the rest live on the documents page: one way in */}
      <div className="flex justify-center lg:col-start-1 lg:row-start-2 lg:justify-start lg:self-start">
        <Button asChild size="lg">
          <Link href="/documenti">
            I nostri documenti
            <FiArrowUpRight aria-hidden />
          </Link>
        </Button>
      </div>
    </Glass>
  )
}
