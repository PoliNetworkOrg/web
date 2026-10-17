import type { Metadata } from "next"
import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { AssociationBodies } from "@/components/structure/association-bodies"
import { BoardGallery } from "@/components/structure/board-gallery"
import { LegalStatus } from "@/components/structure/legal-status"
import { OrganizationChart } from "@/components/structure/organization-chart"
import { Participation } from "@/components/structure/participation"
import { Button } from "@/components/ui/button"
import { Hero } from "@/components/ui/hero"

export const metadata: Metadata = {
  title: "Struttura",
  description:
    "Un’organizzazione pensata per durare: scopri l’organigramma, il Direttivo, gli organi associativi e i ruoli di PoliNetwork APS.",
}

const containerClass = "mx-auto flex w-full max-w-330 flex-col gap-10 px-6 md:gap-14"
const titleClass =
  "typo-headline-medium sm:typo-display-medium text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-center text-transparent"

export default function StructurePage() {
  return (
    <main className="flex w-full flex-col gap-24 pb-24 md:gap-36 md:pb-36">
      <section className="mx-auto w-full max-w-330 px-6 pt-52 md:pt-57.5">
        <Hero title="Struttura" description="Un’organizzazione pensata per durare" />
      </section>
      <OrganizationChart />
      <section aria-labelledby="direttivo-title" className={containerClass}>
        <h2 id="direttivo-title" className={titleClass}>
          Il Direttivo in carica
        </h2>
        <div className="flex flex-col gap-6">
          <BoardGallery />
          <p className="typo-body-medium mx-auto max-w-160 text-balance text-center text-text-secondary">
            Il Direttivo viene eletto ogni due anni dall’Assemblea dei Soci tra i soci dell’associazione.
          </p>
        </div>
      </section>
      <section aria-labelledby="associazione-title" className={containerClass}>
        <h2 id="associazione-title" className={titleClass}>
          Come funziona l’associazione
        </h2>
        <AssociationBodies />
      </section>
      <section aria-labelledby="partecipa-title" className={containerClass}>
        <h2 id="partecipa-title" className={titleClass}>
          Trova il tuo posto in PoliNetwork
        </h2>
        <Participation />
      </section>
      <section className="mx-auto flex w-full max-w-330 flex-col items-center gap-8 px-6 py-10 text-center md:py-16">
        <h2 className="typo-headline-medium md:typo-display-medium max-w-160 text-balance bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent">
          Tutto ciò che c’è da sapere su PoliNetwork.
        </h2>
        <p className="typo-body-large sm:typo-headline-extrasmall max-w-110 text-balance">
          Scopri chi siamo, cosa facciamo e come entrare a far parte della nostra realtà.
        </p>
        <Button asChild size="lg">
          <Link href="/join">
            Unisciti a noi
            <FiArrowUpRight aria-hidden />
          </Link>
        </Button>
      </section>
      <section aria-label="Forma giuridica e documenti associativi" className="mx-auto w-full max-w-330 px-6">
        <LegalStatus />
      </section>
    </main>
  )
}
