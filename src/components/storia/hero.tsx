import Link from "next/link"
import { FiArrowDown } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Hero } from "@/components/ui/hero"
import { CONTAINER } from "./constants"

// Figma: a centred XL title and nothing else. The board portraits appear further down, under "I nostri direttivi".
export function HistoryHero() {
  return (
    <section className={`${CONTAINER} flex flex-col items-center gap-10`}>
      <Hero
        title="La nostra storia"
        description="Da un gruppo Telegram a una rete costruita dagli studenti, per gli studenti."
        gradientDescription
        className="[&_h2]:typo-display-fluid-extralarge [&_h2]:py-0 [&_p]:max-w-145 [&_p]:text-balance"
      />
      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <Link href="#capitoli">
            Leggi la nostra storia <FiArrowDown aria-hidden />
          </Link>
        </Button>
        <Button asChild size="lg" variant="glass">
          <Link href="#direttivi">
            Conosci le persone <FiArrowDown aria-hidden />
          </Link>
        </Button>
      </div>
    </section>
  )
}
