import type { Metadata } from "next"
import { FiUsers } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { applicationHref, teams } from "@/components/team/constants"
import { TeamSection } from "@/components/team/team-section"
import { Button } from "@/components/ui/button"
import { Hero } from "@/components/ui/hero"

export const metadata: Metadata = {
  title: "I Team",
  description: "Scopri i team di PoliNetwork: IT, Design & Marketing, HR ed Events & Partnership.",
}

export default function TeamPage() {
  return (
    <main className="flex w-full flex-col gap-24 pb-24 md:gap-36 md:pb-36">
      <section className="mx-auto flex w-full max-w-330 flex-col items-center gap-6 px-6 pt-52 md:pt-64">
        <Hero
          title="I Team"
          description="PoliNetwork si muove grazie a quattro anime operative distinte, guidate dai rispettivi Capi Dipartimento."
          gradientDescription
        />
      </section>
      {teams.map((team) => (
        <TeamSection key={team.id} team={team} />
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
