import type { Metadata } from "next"
import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { GradientIcon } from "@/components/gradient-icon"
import { bodies, roles } from "@/components/struttura/constants"
import { LegalForm } from "@/components/struttura/legal-form"
import { OrganizationSection } from "@/components/struttura/organization-section"
import { PeopleGallery } from "@/components/team/people-gallery"
import { Button } from "@/components/ui/button"
import { Hero } from "@/components/ui/hero"
import { StructureSectionShapes } from "./shapes"

export const metadata: Metadata = {
  title: "Struttura",
  description:
    "Un’organizzazione pensata per durare: scopri come funziona PoliNetwork, dal Direttivo ai team operativi, dagli admin ai soci.",
}

const sectionTitleClass =
  "typo-headline-medium md:typo-display-medium text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-center text-transparent"

export default function StructurePage() {
  return (
    <main className="flex w-full flex-col gap-24 pb-24 md:gap-36 md:pb-36">
      <div className="relative">
        <StructureSectionShapes section="hero" />
        <section className="mx-auto flex w-full max-w-330 flex-col items-center gap-6 px-6 pt-52 md:pt-64">
          <Hero title="Struttura" description="Un’organizzazione pensata per durare" />
        </section>
      </div>
      <OrganizationSection />
      <div className="relative">
        <StructureSectionShapes section="board" />
        <section
          aria-labelledby="direttivo-title"
          className="mx-auto flex w-full max-w-330 flex-col items-center gap-10 px-6 md:gap-12"
        >
          <h2 id="direttivo-title" className={sectionTitleClass}>
            Il Direttivo in carica
          </h2>
          <PeopleGallery />
          <p className="typo-label-large max-w-145 text-center text-text-secondary">
            Il Direttivo viene eletto ogni due anni dall’Assemblea dei Soci tra i soci dell’associazione.
          </p>
        </section>
      </div>
      <div className="relative flex flex-col gap-24">
        <StructureSectionShapes section="association" />
        <section
          aria-labelledby="associazione-title"
          className="mx-auto flex w-full max-w-330 flex-col gap-10 px-6 md:gap-12"
        >
          <h2 id="associazione-title" className={sectionTitleClass}>
            Come funziona l’associazione
          </h2>
          <ul className="grid gap-6 md:grid-cols-2">
            {bodies.map((body) => (
              <li key={body.title} className="min-w-0">
                <Glass className="flex h-full flex-col gap-6 rounded-rectangles border-white/50 bg-background-blur p-6">
                  <h3 className="typo-headline-medium sm:typo-display-small text-balance">{body.title}</h3>
                  <p className="typo-body-large text-pretty">{body.description}</p>
                </Glass>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="ruoli-title" className="mx-auto flex w-full max-w-330 flex-col gap-10 px-6 md:gap-12">
          <h2 id="ruoli-title" className={sectionTitleClass}>
            Trova il tuo posto in PoliNetwork
          </h2>
          <ul className="grid gap-6 lg:grid-cols-3">
            {roles.map((role) => (
              <li key={role.title} className="min-w-0">
                <Glass className="flex h-full flex-col gap-6 rounded-rectangles border-white/50 bg-background-blur p-6">
                  <GradientIcon icon={role.icon} className="size-12 sm:size-16" />
                  <h3 className="typo-headline-medium sm:typo-display-small text-balance">{role.title}</h3>
                  <p className="typo-body-large text-pretty">{role.description}</p>
                  <Button asChild size="lg" className="mt-auto w-fit">
                    <a href={role.href}>
                      {role.cta} <FiArrowUpRight aria-hidden />
                    </a>
                  </Button>
                </Glass>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <section className="mx-auto flex w-full max-w-330 flex-col items-center gap-6 px-6 text-center">
        <h2 className="typo-headline-medium sm:typo-display-medium max-w-200 text-balance bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent">
          Tutto ciò che c’è da sapere <span className="sm:block">su PoliNetwork.</span>
        </h2>
        <p className="typo-body-large sm:typo-headline-small max-w-101 text-balance">
          Scopri chi siamo, cosa facciamo e come entrare a far parte della nostra realtà.
        </p>
        <Button asChild size="lg" className="mt-2">
          <Link href="/collabora">
            Unisciti a noi <FiArrowUpRight aria-hidden />
          </Link>
        </Button>
      </section>
      <div className="relative">
        <StructureSectionShapes section="legal-form" />
        <LegalForm />
      </div>
    </main>
  )
}
