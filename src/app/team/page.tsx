import type { Metadata } from "next"
import { FiUsers } from "react-icons/fi"
import { CONTAINER, SECTION_TITLE } from "@/components/layout/page"
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
    <main className="flex w-full flex-col gap-24 pb-24 md:gap-36 md:pb-36 xl:gap-48">
      <section className={`${CONTAINER} pt-52 md:pt-57.5`}>
        <Hero
          title="I Team"
          description="PoliNetwork si muove grazie a quattro anime operative distinte, guidate dai rispettivi Capi Dipartimento."
          gradientDescription
        />
      </section>
      {teams.map((team) => (
        <TeamSection key={team.id} team={team} />
      ))}
      {/* A closing statement on the background, as in Figma, not a panel with its own gradient */}
      <section className={`${CONTAINER} flex flex-col items-center gap-8 py-10 text-center md:py-16`}>
        <h2 className={SECTION_TITLE}>Vuoi fare la differenza?</h2>
        <p className="typo-body-large sm:typo-headline-extrasmall max-w-200 text-balance">
          Le porte di PoliNetwork sono aperte a tutti gli studenti del Politecnico di Milano. Segui i nostri social per
          non perdere i periodi di recruiting ufficiali… ma se hai talento e motivazione, non aspettare: valutiamo le
          candidature spontanee tutto l’anno.
        </p>
        <Button asChild size="lg">
          <a href={applicationHref()}>
            Unisciti a noi <FiUsers aria-hidden />
          </a>
        </Button>
      </section>
    </main>
  )
}
