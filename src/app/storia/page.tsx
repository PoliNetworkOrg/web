import type { Metadata } from "next"
import { FiMessageCircle, FiUserCheck } from "react-icons/fi"
import telegram from "@/assets/icons/telegram-gradient.svg"
import { CardCaption } from "@/components/card-caption"
import { CardIcon } from "@/components/card-icon"
import TextOnlyLayout from "@/components/layout/TextOnlySection"
import { Boards } from "@/components/storia/boards"
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
    <main className="mx-auto flex min-h-screen w-full max-w-700 flex-col gap-24 px-4 pt-44 pb-32 md:gap-32 md:pt-49 md:pb-49">
      <HistoryHero />

      <div className="flex w-full flex-col gap-24 md:gap-36">
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
            section: "mx-auto max-w-330 gap-12 px-6 md:px-6 xl:flex-row xl:items-center [&>div>h2]:typo-title-large",
            textDiv: "min-w-0 xl:w-1/2 xl:items-start",
            title: "text-balance text-blue-secondary xl:text-start",
            descriptionDiv: "xl:text-start",
            contentDiv: "min-w-0 xl:w-1/2",
          }}
        >
          <div className="grid w-full gap-6 sm:grid-cols-2">
            <CardIcon
              title="2016"
              description="Il primo gruppo Telegram"
              icon={telegram.src}
              size="compact"
              align="start"
              className="h-full"
            />
            <CardIcon
              title="2022"
              description="Nasce PoliNetwork APS"
              icon={FiUserCheck}
              size="compact"
              align="start"
              className="h-full"
            />
          </div>
        </TextOnlyLayout>
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
            section: "mx-auto max-w-330 gap-12 px-6 md:px-6 xl:flex-row xl:items-center [&>div>h2]:typo-title-large",
            title: "text-balance text-blue-secondary xl:text-start",
            textDiv: "min-w-0 xl:w-1/2 xl:items-start",
            descriptionDiv: "xl:text-start",
            contentDiv: "min-w-0 xl:w-1/2",
          }}
        >
          <CardCaption
            title="L’obiettivo è raggiunto."
            icon={FiMessageCircle}
            iconPosition="top"
            caption={
              <p className="typo-body-large sm:typo-headline-extrasmall text-pretty">
                Se anche un solo studente ha trovato casa grazie a un nostro gruppo, o si è laureato in tempo perché
                qualcuno gli ha risposto.
              </p>
            }
            className="h-auto w-full gap-6 p-6 sm:p-10"
          />
        </TextOnlyLayout>

        <Organization />

        <Continuation />
      </div>
    </main>
  )
}
