import Link from "next/link"
import { FiArrowDown } from "react-icons/fi"
import { CONTAINER } from "@/components/layout/page"
import { OrganizationDiagram } from "@/components/structure/organization-chart"
import { Button } from "@/components/ui/button"

export function Organization() {
  return (
    <section className={`${CONTAINER} flex flex-col gap-10`} aria-labelledby="struttura-title">
      <div className="flex max-w-140 flex-col gap-6">
        <h2 id="struttura-title" className="typo-headline-medium sm:typo-display-medium text-balance">
          Come è organizzata PoliNetwork
        </h2>
        <p className="typo-body-large sm:typo-headline-extrasmall max-w-94 text-pretty">
          Direttivo, team operativi, admin e soci. Guarda come funziona la macchina dall’interno.
        </p>
        <Button asChild className="w-fit">
          <Link href="#organigramma">
            Scopri la struttura <FiArrowDown aria-hidden />
          </Link>
        </Button>
      </div>
      <OrganizationDiagram id="organigramma" className="xl:-mt-57 scroll-mt-32 xl:max-w-220 xl:self-end" />
    </section>
  )
}
