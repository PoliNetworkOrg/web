import type { Metadata } from "next"
import { FiUsers } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { applicationHref, teams } from "@/components/team/constants"
import { PeopleGallery } from "@/components/team/people-gallery"
import { TeamSection } from "@/components/team/team-section"
import { Button } from "@/components/ui/button"
import { Hero } from "@/components/ui/hero"
import { TeamHeroShapes, TeamSectionShapes } from "./shapes"

export const metadata: Metadata = {
  title: "I Team",
  description:
    "Scopri i team di PoliNetwork: IT, Design & Marketing, HR, Events & Partnership e International, in sinergia con il Consiglio Direttivo.",
}

export default function TeamPage() {
  return (
    <main className="flex w-full flex-col gap-24 pb-24 md:gap-36 md:pb-36">
      <div className="relative">
        <TeamHeroShapes />
        <section className="mx-auto flex w-full max-w-330 flex-col items-center gap-6 px-6 pt-52 md:pt-64">
          <Hero
            title="I Team"
            description="PoliNetwork si muove grazie a quattro anime operative distinte, guidate dai rispettivi Capi Dipartimento in sinergia con il Consiglio Direttivo."
            gradientDescription
          />
          <p className="typo-body-large sm:typo-headline-extrasmall max-w-180 text-balance text-center">
            Il punto d’incontro? Il <span className="text-blue-secondary">Team Growth</span>, il cuore strategico dove i
            responsabili uniscono le forze per coordinare i progetti interarea e disegnare il futuro dell’associazione.
          </p>
        </section>
      </div>
      <div className="relative">
        <TeamSectionShapes section="board" />
        <section
          aria-labelledby="direttivo-title"
          className="mx-auto flex w-full max-w-330 flex-col items-center gap-10 px-6 md:gap-12"
        >
          <div className="flex max-w-260 flex-col gap-6 text-center">
            <h2
              id="direttivo-title"
              className="typo-headline-medium md:typo-display-medium text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent"
            >
              Consiglio direttivo
            </h2>
            <p className="typo-body-large sm:typo-headline-extrasmall text-pretty">
              Il Consiglio Direttivo è l’organo garante dell’associazione. Ha l’obiettivo di vigilare sulle attività di
              PoliNetwork e di monitorarne l’andamento per preservare i valori dello statuto; di conseguenza, può
              approvare o respingere le linee d’azione intraprese dai singoli dipartimenti o le strategie delineate dal
              Growth Team. I membri del consiglio sono eletti ogni due anni dall’Assemblea dei Soci tra i soci
              dell’associazione.
            </p>
          </div>
          <PeopleGallery />
          <p className="typo-body-medium text-center text-text-secondary">
            Il Direttivo attuale è in carica da novembre 2024.
          </p>
        </section>
      </div>
      {teams.map((team) => (
        <div key={team.id} className="relative">
          <TeamSectionShapes section={team.id} />
          <TeamSection team={team} />
        </div>
      ))}
      <section className="mx-auto w-full max-w-330 px-6">
        <Glass className="flex flex-col items-center gap-6 rounded-rectangles border-white/50 bg-linear-to-br from-background-blur to-blue-tertiary/30 p-6 text-center sm:p-12">
          <h2 className="typo-headline-medium sm:typo-display-medium text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
            Vuoi fare la differenza?
          </h2>
          <p className="typo-body-large sm:typo-headline-extrasmall max-w-200 text-balance">
            Le porte di PoliNetwork sono aperte a tutti gli studenti del Politecnico di Milano. Segui i nostri social
            per non perdere i periodi di recruiting ufficiali… ma se hai talento e motivazione, non aspettare: valutiamo
            le candidature spontanee tutto l’anno.
          </p>
          <Button asChild size="lg">
            <a href={applicationHref()}>
              Unisciti a noi <FiUsers aria-hidden />
            </a>
          </Button>
        </Glass>
      </section>
    </main>
  )
}
