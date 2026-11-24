import { FiMail } from "react-icons/fi"
import { InfoCard } from "@/components/collabora/info-card"
import { Highlight } from "@/components/collabora/section"
import { FillLine } from "@/components/fill-line"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { JoinCards } from "./cards"
import { adminApplicationEmail, adminCards, adminSteps } from "./constants"

export function AdminSection() {
  return (
    <section id="admin" className={cn(CONTAINER, "flex scroll-mt-36 flex-col gap-20 xl:gap-25")}>
      <div className="grid min-w-0 items-start gap-12.5 xl:grid-cols-2 xl:gap-20">
        <div className="flex min-w-0 flex-col gap-7.5">
          <h2 className={SECTION_TITLE}>Diventa Admin</h2>
          <div className={cn(SECTION_LEAD, "flex max-w-200 flex-col gap-6.25")}>
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
      <div className="flex flex-col gap-7.5">
        <h3 className="typo-title-large sm:typo-headline-medium text-balance text-text-primary">
          Ti interessano questi compiti?
        </h3>
        <ol className="grid gap-7.5 lg:grid-cols-3 lg:gap-15">
          {adminSteps.map((card, index) => (
            <li key={card.title} className="relative min-w-0">
              <InfoCard
                card={card}
                className="h-full md:p-8"
                titleClassName="md:typo-title-large md:whitespace-normal text-balance"
              />
              {index < adminSteps.length - 1 && (
                // The line to the next card from lg, filling with blue one after the other
                <FillLine
                  direction="across"
                  delay={index * 0.5}
                  className="-translate-y-1/2 absolute top-1/2 left-full hidden h-1 w-15 lg:block"
                  fillClassName="bg-linear-to-r from-blue-secondary to-blue-primary"
                />
              )}
            </li>
          ))}
        </ol>
        <div className="flex flex-col items-start gap-7.5 pt-5">
          <p className={cn(SECTION_LEAD, "max-w-200")}>
            Il primo passo è farti conoscere nel <Highlight>gruppo del tuo corso</Highlight>, rispondendo a chi ha
            bisogno. Se vuoi proporti, scrivi al team HR: ti diremo come continuare.
          </p>
          <Button asChild size="lg">
            <a href={adminApplicationEmail}>
              Scrivi al team HR
              <FiMail aria-hidden />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
