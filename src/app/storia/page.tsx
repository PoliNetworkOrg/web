import type { Metadata } from "next"
import { FiMessageCircle } from "react-icons/fi"
import { GradientIcon } from "@/components/gradient-icon"
import { CONTAINER, PAGE_MAIN, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import TextOnlyLayout from "@/components/layout/TextOnlySection"
import { Boards } from "@/components/storia/boards"
import { Continuation } from "@/components/storia/continuation"
import { HistoryHero } from "@/components/storia/hero"
import { Organization } from "@/components/storia/organization"
import { HistoryProjects } from "@/components/storia/projects"
import { Thanks } from "@/components/storia/thanks"
import { Chapters, Timeline } from "@/components/storia/timeline"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "La nostra storia",
  description:
    "Da un gruppo Telegram a una rete costruita dagli studenti, per gli studenti. Scopri la storia di PoliNetwork, dal 2016 a oggi.",
}

export default function HistoryPage() {
  return (
    <main className={PAGE_MAIN}>
      <HistoryHero />

      <TextOnlyLayout
        title="Come è nato tutto"
        description={
          <>
            <h3 className={SECTION_TITLE}>Una domanda semplice, una grande idea.</h3>
            <p className={cn(SECTION_LEAD, "mt-3")}>
              Tutto è cominciato nel 2016, quando un futuro studente cercava uno spazio per entrare in contatto con i
              propri compagni e trovare risposte alle prime domande sulla vita universitaria.
            </p>
            <p className={cn(SECTION_LEAD, "mt-5")}>
              Da questa esigenza è nato un progetto collettivo, che nel tempo si è trasformato in una{" "}
              <strong>rete capillare costruita dagli studenti, per gli studenti.</strong>
            </p>
          </>
        }
        classNames={{
          section: `${CONTAINER} items-start [&>div>h2]:typo-title-large`,
          textDiv: "max-w-180 items-start",
          title: "text-balance text-start text-blue-secondary",
          descriptionDiv: "text-start",
          contentDiv: "hidden",
        }}
      />
      <Timeline />
      <Chapters />
      <Boards />
      <HistoryProjects />
      <Thanks />

      <TextOnlyLayout
        title="Quello che abbiamo fatto di più"
        description={
          <>
            <h3 className={SECTION_TITLE}>Essere lì quando serve.</h3>
            <p className={cn(SECTION_LEAD, "mt-3")}>
              Al di là dei progetti e dei team, PoliNetwork fa una cosa davvero importante: risponde alle domande degli
              studenti.
            </p>
            <p className={SECTION_LEAD}>
              Intorno ai gruppi dei corsi sono nati spazi per tutto ciò che riguarda la vita universitaria: dagli esami
              ai piani di studio, dalla ricerca casa alla compravendita dei libri, fino al tempo libero.
            </p>
          </>
        }
        classNames={{
          section: `${CONTAINER} gap-12 xl:flex-row xl:items-center xl:gap-16 [&>div>h2]:typo-title-large`,
          title: "text-balance text-start text-blue-secondary",
          textDiv: "min-w-0 items-start xl:w-1/2",
          descriptionDiv: "text-start",
          contentDiv: "min-w-0 xl:w-1/2",
        }}
      >
        <div className="flex flex-col gap-4 border-blue-primary/30 border-l pl-6 sm:pl-10">
          <GradientIcon icon={FiMessageCircle} className="size-10 sm:size-14" />
          <p className="typo-headline-small sm:typo-headline-medium text-balance text-blue-secondary">
            L’obiettivo è raggiunto.
          </p>
          <p className={SECTION_LEAD}>
            Se anche un solo studente ha trovato casa grazie a un nostro gruppo, o si è laureato in tempo perché
            qualcuno gli ha risposto.
          </p>
        </div>
      </TextOnlyLayout>

      <Organization />

      <Continuation />
    </main>
  )
}
