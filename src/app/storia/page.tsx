import type { Metadata } from "next"
import { FiMessageCircle } from "react-icons/fi"
import { GradientIcon } from "@/components/gradient-icon"
import TextOnlyLayout from "@/components/layout/TextOnlySection"
import { Boards } from "@/components/storia/boards"
import { CONTAINER } from "@/components/storia/constants"
import { Continuation } from "@/components/storia/continuation"
import { HistoryHero } from "@/components/storia/hero"
import { Organization } from "@/components/storia/organization"
import { HistoryProjects } from "@/components/storia/projects"
import { Thanks } from "@/components/storia/thanks"
import { Chapters, Timeline } from "@/components/storia/timeline"

export const metadata: Metadata = {
  title: "La nostra storia",
  description:
    "Da un gruppo Telegram a una rete costruita dagli studenti, per gli studenti. Scopri la storia di PoliNetwork, dal 2016 a oggi.",
}

export default function HistoryPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full flex-col gap-24 pt-44 pb-32 sm:pt-56 md:gap-32 md:pb-48">
      <HistoryHero />

      <div className="flex w-full flex-col gap-24 md:gap-40">
        {/* Figma reserves the right column for an archive photo that doesn't exist yet: until then the text stands alone.
            The two milestone cards that filled it repeated the timeline right below. */}
        <TextOnlyLayout
          title="Come è nato tutto"
          description={
            <>
              <h3 className="typo-headline-medium sm:typo-display-medium text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
                Una domanda semplice, una grande idea.
              </h3>
              <p className="typo-body-large sm:typo-headline-extrasmall mt-3 text-pretty">
                Tutto è cominciato nel 2016, quando un futuro studente cercava uno spazio per entrare in contatto con i
                propri compagni e trovare risposte alle prime domande sulla vita universitaria.
              </p>
              <p className="typo-body-large sm:typo-headline-extrasmall mt-5 text-pretty">
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
              <h3 className="typo-headline-medium sm:typo-display-medium text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
                Essere lì quando serve.
              </h3>
              <p className="typo-body-large sm:typo-headline-extrasmall mt-3 text-pretty">
                Al di là dei progetti e dei team, PoliNetwork fa una cosa davvero importante: risponde alle domande
                degli studenti.
              </p>
              <p className="typo-body-large sm:typo-headline-extrasmall text-pretty">
                Intorno ai gruppi dei corsi sono nati spazi per tutto ciò che riguarda la vita universitaria: dagli
                esami ai piani di studio, dalla ricerca casa alla compravendita dei libri, fino al tempo libero.
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
          {/* A closing statement, not a card: nothing here is clickable */}
          <figure className="flex flex-col gap-4 border-blue-primary/30 border-l pl-6 sm:pl-10">
            <GradientIcon icon={FiMessageCircle} className="size-10 sm:size-14" />
            <p className="typo-headline-small sm:typo-headline-medium text-balance text-blue-secondary">
              L’obiettivo è raggiunto.
            </p>
            <p className="typo-body-large sm:typo-headline-extrasmall text-pretty">
              Se anche un solo studente ha trovato casa grazie a un nostro gruppo, o si è laureato in tempo perché
              qualcuno gli ha risposto.
            </p>
          </figure>
        </TextOnlyLayout>

        <Organization />

        <Continuation />
      </div>
    </main>
  )
}
