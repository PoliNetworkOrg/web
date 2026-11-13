import Link from "next/link"
import { FiArrowDown } from "react-icons/fi"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import { OrganizationDiagram } from "@/components/structure/organization-chart"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Organization() {
  return (
    <section className={`${CONTAINER} flex flex-col gap-10`} aria-labelledby="struttura-title">
      <div className="flex max-w-140 flex-col gap-6">
        <h2 id="struttura-title" className={SECTION_TITLE}>
          Come è organizzata PoliNetwork
        </h2>
        <p className={cn(SECTION_LEAD, "max-w-94")}>
          Direttivo, team operativi, admin e soci. Guarda come funziona la macchina dall’interno.
        </p>
        <Button asChild className="w-fit">
          <Link href="#organigramma">
            Scopri la struttura <FiArrowDown aria-hidden />
          </Link>
        </Button>
      </div>
      {/* From xl the diagram rises beside the intro: its narrow top (the Direttivo node) fits next to the text */}
      <OrganizationDiagram id="organigramma" className="xl:-mt-57 scroll-mt-32 xl:max-w-220 xl:self-end" />
    </section>
  )
}
