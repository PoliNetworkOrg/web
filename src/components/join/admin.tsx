import Image from "next/image"
import connectorFirst from "@/assets/icons/join/connector-first.svg"
import connectorSecond from "@/assets/icons/join/connector-second.svg"
import { InfoCard } from "@/components/collabora/info-card"
import { Highlight } from "@/components/collabora/section"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import { cn } from "@/lib/utils"
import { JoinCards } from "./cards"
import { adminCards, adminSteps } from "./constants"

const connectors = [connectorFirst, connectorSecond]

export function AdminSection() {
  return (
    <section id="admin" className={cn(CONTAINER, "flex scroll-mt-36 flex-col gap-16 xl:gap-20")}>
      <div className="grid min-w-0 items-start gap-10 xl:grid-cols-2 xl:gap-16">
        <div className="flex min-w-0 flex-col gap-6">
          <h2 className={SECTION_TITLE}>Diventa Admin</h2>
          <div className={cn(SECTION_LEAD, "flex max-w-200 flex-col gap-5")}>
            <p>Un admin è la presenza di PoliNetwork nei gruppi ogni giorno.</p>
            <p>
              Non servono competenze specifiche ma solamente{" "}
              <Highlight>conoscenza del Politecnico, disponibilità a rispondere e pazienza</Highlight> con le domande
              che si ripetono ogni anno.
            </p>
            <p>
              Chi diventa admin entra a far parte di una community di centinaia di studenti distribuiti su tutti i corsi
              e tutte le sedi del PoliMi, con cui{" "}
              <Highlight>condivide l’esperienza di tenere in piedi qualcosa di concreto e utile</Highlight>.
            </p>
          </div>
        </div>
        <JoinCards cards={adminCards} carousel />
      </div>
      <div className="flex flex-col gap-6">
        <h3 className="typo-title-large sm:typo-headline-medium text-balance text-text-primary">
          Ti interessano questi compiti?
        </h3>
        <ol className="grid gap-6 lg:grid-cols-3 lg:gap-12">
          {adminSteps.map((card, index) => (
            <li key={card.title} className="relative min-w-0">
              <InfoCard
                card={card}
                className="[&_h3]:typo-title-large h-full md:p-8 [&_h3]:whitespace-normal [&_h3]:text-balance"
              />
              {index < connectors.length && (
                <Image
                  src={connectors[index]}
                  alt=""
                  aria-hidden
                  className="-translate-y-1/2 absolute top-1/2 left-full hidden h-1 w-12 max-w-none lg:block"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
