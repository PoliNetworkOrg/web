import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { Highlight, SectionTitle } from "@/components/collabora/section"
import { Button } from "@/components/ui/button"
import { JoinCards } from "./cards"
import { teamCards } from "./constants"

export function TeamsSection() {
  return (
    <section
      id="team"
      className={"mx-auto grid w-full max-w-330 scroll-mt-36 items-start gap-10 px-6 xl:grid-cols-2 xl:gap-16"}
    >
      <div className="flex min-w-0 flex-col items-center gap-6 text-center md:items-start md:text-start">
        <SectionTitle>Entra in un Team</SectionTitle>
        <div className="typo-body-large sm:typo-headline-extrasmall flex flex-col gap-5 text-pretty">
          <p>
            Entrare in un team significa avere un <Highlight>ruolo operativo con deliverable reali</Highlight>, non
            essere osservatori di un progetto altrui.
          </p>
          <p>
            <Highlight>Non servono esperienze pregresse per tutti i ruoli</Highlight>. Serve chiarezza su cosa si sa
            fare, disponibilità a lavorare in modo autonomo e apertura ad occuparsi di cose nuove.
          </p>
          <p>
            PoliNetwork è in una fase di costruzione attiva:{" "}
            <Highlight>chi entra adesso ha l’opportunità di definire come funzionerà nel medio periodo</Highlight>,
            invece di limitarsi a eseguire procedure già consolidate.
          </p>
        </div>
        <Button asChild size="lg" className="mt-2 max-w-full">
          <Link href="/team">
            Scopri i team e come entrarci <FiArrowUpRight aria-hidden />
          </Link>
        </Button>
      </div>
      <div className="hidden min-w-0 md:block">
        <JoinCards cards={teamCards} />
      </div>
    </section>
  )
}
