import { CONTAINER, PAGE_HERO } from "@/components/layout/page"
import { Hero } from "@/components/ui/hero"

export function HistoryHero() {
  return (
    <section className={`${CONTAINER} ${PAGE_HERO}`}>
      {/* A wider subtitle than the default: on one line from desktop, instead of wrapping in a narrow column */}
      <Hero
        title="La nostra storia"
        description="Da un gruppo Telegram a una rete costruita dagli studenti, per gli studenti."
        descriptionClassName="max-w-260"
      />
    </section>
  )
}
