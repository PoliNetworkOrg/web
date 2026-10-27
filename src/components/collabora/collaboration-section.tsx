import { CONTAINER } from "@/components/layout/page"
import { cn } from "@/lib/utils"
import { Aside, Highlight, SectionTitle, sectionTextClass } from "./section"

export function CollaborationSection() {
  return (
    <section className={CONTAINER}>
      <div className="flex flex-col gap-6 md:gap-3">
        <SectionTitle>Cosa possiamo fare insieme?</SectionTitle>
        <div className={cn(sectionTextClass, "flex flex-col gap-5 pb-2 md:gap-3 md:pb-0")}>
          {/* Figma runs this paragraph 959px wide at 24px; at 20px that is ~90 characters a line, so it narrows below 3xl */}
          <p className="3xl:max-w-239.75 md:max-w-180">
            Collaborare con noi significa <Highlight>accedere a questa community in modo diretto</Highlight>. Non siamo
            un canale pubblicitario e non accettiamo promozioni commerciali generiche: ogni collaborazione viene
            valutata in termini di <Highlight>valore concreto per gli studenti del Politecnico</Highlight>{" "}
            <Aside>(e nel rispetto dei nostri valori sanciti sul nostro statuto).</Aside>
          </p>
          <p className="md:max-w-161">
            Se il progetto ha senso per la nostra community, siamo disponibili a costruirlo insieme!
          </p>
        </div>
      </div>
    </section>
  )
}
