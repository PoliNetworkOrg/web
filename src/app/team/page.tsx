import type { Metadata } from "next"
import { FiUsers } from "react-icons/fi"
import { ClosingCta } from "@/components/layout/closing-cta"
import { CONTAINER, PAGE_HERO, PAGE_MAIN } from "@/components/layout/page"
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
    <main className={PAGE_MAIN}>
      <section className={`${CONTAINER} ${PAGE_HERO}`}>
        <Hero
          title="I Team"
          description="PoliNetwork si muove grazie a quattro anime operative distinte, guidate dai rispettivi Capi Dipartimento."
        />
      </section>
      {teams.map((team, index) => (
        <TeamSection key={team.id} team={team} reverse={index % 2 === 1} />
      ))}
      <ClosingCta
        title="Vuoi fare la differenza?"
        lead="Le porte di PoliNetwork sono aperte a tutti gli studenti del Politecnico di Milano. Segui i nostri social per non perdere i periodi di recruiting ufficiali… ma se hai talento e motivazione, non aspettare: valutiamo le candidature spontanee tutto l’anno."
        action={
          <Button asChild size="lg">
            <a href={applicationHref()}>
              Unisciti a noi <FiUsers aria-hidden />
            </a>
          </Button>
        }
      />
    </main>
  )
}
