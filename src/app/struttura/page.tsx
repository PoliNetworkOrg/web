import type { Metadata } from "next"
import { CONTAINER, PAGE_HERO, PAGE_MAIN, SECTION_TITLE } from "@/components/layout/page"
import { AssociationBodies } from "@/components/structure/association-bodies"
import { BoardGallery } from "@/components/structure/board-gallery"
import { CurrentRoles } from "@/components/structure/current-roles"
import { LegalStatus } from "@/components/structure/legal-status"
import { OrganizationChart } from "@/components/structure/organization-chart"
import { Participation } from "@/components/structure/participation"
import { Hero } from "@/components/ui/hero"

export const metadata: Metadata = {
  title: "Struttura",
  description:
    "Un’organizzazione pensata per durare: scopri l’organigramma, il Direttivo, gli organi associativi e i ruoli di PoliNetwork APS.",
}

const titleClass = `${SECTION_TITLE} text-center`
/** A heading closer to its content than SECTION_STACK's: the title belongs to what follows it */
const SECTION = `${CONTAINER} flex flex-col gap-6 md:gap-8`

export default function StructurePage() {
  return (
    <main className={PAGE_MAIN}>
      <section className={`${CONTAINER} ${PAGE_HERO}`}>
        <Hero title="Struttura" description="Un’organizzazione pensata per durare" />
      </section>
      <OrganizationChart />
      <section aria-labelledby="direttivo-title" className={SECTION}>
        <h2 id="direttivo-title" className={titleClass}>
          Il Direttivo in carica
        </h2>
        <BoardGallery />
      </section>
      <section aria-labelledby="incarichi-title" className={SECTION}>
        <h2 id="incarichi-title" className={titleClass}>
          Probiviri e capi dipartimento
        </h2>
        <CurrentRoles />
      </section>
      <section aria-labelledby="associazione-title" className={SECTION}>
        <h2 id="associazione-title" className={titleClass}>
          Come funziona l’associazione
        </h2>
        <AssociationBodies />
      </section>
      <section aria-labelledby="partecipa-title" className={SECTION}>
        <h2 id="partecipa-title" className={titleClass}>
          Trova il tuo posto in PoliNetwork
        </h2>
        <Participation />
      </section>
      <section aria-label="Forma giuridica e documenti associativi" className={CONTAINER}>
        <LegalStatus />
      </section>
    </main>
  )
}
