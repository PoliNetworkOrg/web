import type { Metadata } from "next"
import { CONTAINER, PAGE_MAIN, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import { Boards } from "@/components/storia/boards"
import { Continuation } from "@/components/storia/continuation"
import { HistoryHero } from "@/components/storia/hero"
import { HistoryProjects } from "@/components/storia/projects"
import { Chapters, Timeline } from "@/components/storia/timeline"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "La nostra storia",
  description:
    "Da un gruppo Telegram a una rete costruita dagli studenti, per gli studenti. Scopri la storia di PoliNetwork, dal 2016 a oggi.",
}

// The featured projects come from the backend at request time, like /progetti
export const dynamic = "force-dynamic"

export default function HistoryPage() {
  return (
    <main className={PAGE_MAIN}>
      <HistoryHero />

      <section className={`${CONTAINER} flex flex-col gap-4`}>
        <h2 className={cn(SECTION_TITLE, "max-w-200")}>Una domanda semplice, una grande idea</h2>
        <div className={cn(SECTION_LEAD, "flex max-w-180 flex-col gap-5")}>
          <p>
            Tutto è cominciato nel 2016, quando un futuro studente cercava uno spazio per entrare in contatto con i
            propri compagni e trovare risposte alle prime domande sulla vita universitaria.
          </p>
          <p>
            Da questa esigenza è nato un progetto collettivo, che nel tempo si è trasformato in una{" "}
            <span className="text-blue-secondary">rete capillare costruita dagli studenti, per gli studenti</span>.
          </p>
        </div>
      </section>

      <Timeline />
      <Chapters />
      <Boards />
      <HistoryProjects />
      <Continuation />
    </main>
  )
}
