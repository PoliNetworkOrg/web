import type { Metadata } from "next"
import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { Glass } from "@/components/glass"
import TextOnlyLayout from "@/components/layout/TextOnlySection"
import { Boards } from "@/components/storia/boards"
import { Organization } from "@/components/storia/organization"
import { HistoryProjects } from "@/components/storia/projects"
import { Thanks } from "@/components/storia/thanks"
import { Chapters, Timeline } from "@/components/storia/timeline"
import { Button } from "@/components/ui/button"
import { Hero } from "@/components/ui/hero"
import {
  HistoryBoardsShapes,
  HistoryChaptersShapes,
  HistoryHeroShapes,
  HistoryIntroShapes,
  HistoryProjectsShapes,
  HistoryThanksShapes,
  HistoryTimelineShapes,
} from "./shapes"

export const metadata: Metadata = {
  title: "La nostra storia",
  description:
    "Da un gruppo Telegram a una rete costruita dagli studenti, per gli studenti. Scopri la storia di PoliNetwork, dal 2016 a oggi.",
}

export default function HistoryPage() {
  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-700 flex-col gap-28 px-4 pt-49 pb-32 md:gap-44 md:pb-49">
      <HistoryHeroShapes />
      <div className="sm:[&_h2]:typo-display-large xl:[&_h2]:typo-display-extralarge sm:[&_h2]:py-8 xl:[&_h2]:py-14 [&_p]:max-w-145">
        <Hero
          title="La nostra storia"
          description="Da un gruppo Telegram a una rete costruita dagli studenti, per gli studenti."
        />
      </div>

      <div className="relative flex w-full flex-col gap-28 md:mt-34 md:gap-44">
        <div className="relative w-full">
          <HistoryIntroShapes />
          <TextOnlyLayout
            title="Come è nato tutto"
            description={
              <>
                <h3 className="typo-display-small 2xl:typo-display-large bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
                  Una domanda semplice, una grande idea.
                </h3>
                <p className="typo-body-large md:typo-headline-extrasmall xl:typo-headline-small mt-3">
                  Tutto è cominciato nel 2016, quando un futuro studente cercava uno spazio per entrare in contatto con
                  i propri compagni e trovare risposte alle prime domande sulla vita universitaria.
                </p>
                <p className="typo-body-large md:typo-headline-extrasmall xl:typo-headline-small mt-5">
                  Da questa esigenza è nato un progetto collettivo, che nel tempo si è trasformato in una{" "}
                  <strong>rete capillare costruita dagli studenti, per gli studenti.</strong>
                </p>
              </>
            }
            classNames={{
              section: "mx-auto max-w-330 gap-12 px-6 md:px-6 xl:flex-row xl:items-center",
              textDiv: "xl:w-165 xl:shrink-0",
              title: "max-sm:typo-headline-medium xl:text-start",
              descriptionDiv: "xl:text-start",
              contentDiv: "min-w-0 xl:w-1/2",
            }}
          >
            {/* Il design contiene un riquadro neutro, senza una fotografia. */}
            <Glass
              aria-hidden
              className="aspect-[608/405] w-full rounded-rectangles border-0 bg-background p-0 backdrop-blur-none"
            />
          </TextOnlyLayout>
        </div>
        <div className="relative w-full">
          <HistoryTimelineShapes />
          <Timeline />
        </div>
        <div className="relative w-full">
          <HistoryChaptersShapes />
          <Chapters />
        </div>
        <div className="relative w-full">
          <HistoryBoardsShapes />
          <Boards />
        </div>
        <div className="relative w-full">
          <HistoryProjectsShapes />
          <HistoryProjects />
        </div>
        <div className="relative w-full">
          <HistoryThanksShapes />
          <Thanks />
        </div>

        <TextOnlyLayout
          title="Quello che abbiamo fatto di più"
          description={
            <>
              <h3 className="typo-display-small 2xl:typo-display-large bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
                Essere lì quando serve.
              </h3>
              <p className="typo-body-large md:typo-headline-extrasmall xl:typo-headline-small mt-3">
                Al di là dei progetti e dei team, PoliNetwork fa una cosa davvero importante: risponde alle domande
                degli studenti.
              </p>
              <p className="typo-body-large md:typo-headline-extrasmall xl:typo-headline-small">
                Intorno ai gruppi dei corsi sono nati spazi per tutto ciò che riguarda la vita universitaria: dagli
                esami ai piani di studio, dalla ricerca casa alla compravendita dei libri, fino al tempo libero.
              </p>
              <p className="typo-body-large md:typo-headline-extrasmall xl:typo-headline-small mt-3">
                Se anche un solo studente ha trovato casa grazie a un nostro gruppo, o si è laureato in tempo perché
                qualcuno gli ha risposto, l’obiettivo è raggiunto.
              </p>
            </>
          }
          classNames={{
            section: "mx-auto max-w-330 px-6 md:px-6",
            title: "max-sm:typo-headline-medium",
            textDiv: "max-w-165",
            contentDiv: "hidden",
          }}
        />

        <Organization />

        <TextOnlyLayout
          title="La storia continua."
          description={
            <p className="typo-body-large md:typo-headline-extrasmall xl:typo-headline-small">
              Ogni anno qualcuno arriva, qualcuno si laurea e qualcun altro raccoglie il testimone. Nuove persone, nuove
              idee, nuovi progetti. La missione rimane la stessa:{" "}
              <strong>rendere la vita universitaria più semplice, accessibile e umana.</strong> Il prossimo capitolo lo
              scriviamo insieme.
            </p>
          }
          classNames={{
            section: "mx-auto max-w-330 gap-16 px-6 md:px-6 xl:flex-row xl:items-center",
            textDiv: "min-w-0 xl:w-1/2",
            title: "max-sm:typo-headline-medium xl:text-start",
            descriptionDiv: "xl:text-start",
            contentDiv: "min-w-0 xl:w-1/2",
          }}
        >
          <div className="flex w-full flex-col items-center gap-10">
            <ol className="flex w-full items-center justify-between gap-3">
              {["2016", "2022", "2026", "?"].map((year, index) => (
                <li key={year} className="relative flex min-w-0 flex-1 justify-center">
                  <Glass className="typo-body-large sm:typo-headline-small relative z-10 flex size-12 items-center justify-center rounded-rectangles p-0 sm:size-21 min-[360px]:size-16">
                    {year}
                  </Glass>
                  {index < 3 && <span aria-hidden className="absolute top-1/2 left-1/2 h-px w-full bg-blue-primary" />}
                </li>
              ))}
            </ol>
            <Button asChild>
              <Link href="/collabora">
                Unisciti a noi <FiArrowUpRight aria-hidden />
              </Link>
            </Button>
          </div>
        </TextOnlyLayout>
      </div>
    </main>
  )
}
