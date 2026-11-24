import AccordionList from "@/components/accordion-list"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import { HistoryRoster } from "./history-roster"
import { founders, guarantors, historicalArbiters, historicalDelegates, historicalDepartments } from "./people-data"

export function HistoricalPeople() {
  return (
    <section aria-labelledby="incarichi-storici" className={`${CONTAINER} flex flex-col gap-8 md:gap-10`}>
      <div className="flex max-w-200 flex-col gap-4">
        <h2 id="incarichi-storici" className={SECTION_TITLE}>
          Chi ha fatto crescere la rete
        </h2>
        <p className={SECTION_LEAD}>
          Fondatori, garanti, probiviri, delegati e responsabili di dipartimento hanno accompagnato PoliNetwork nelle
          sue trasformazioni. Qui conserviamo i loro incarichi come riportati nel sito precedente.
        </p>
      </div>
      <AccordionList
        contentClassName="max-w-none"
        items={[
          { value: "fondatori", trigger: "I fondatori", content: <HistoryRoster people={founders} /> },
          { value: "garanti", trigger: "I garanti", content: <HistoryRoster people={guarantors} /> },
          {
            value: "probiviri",
            trigger: "Il Collegio dei Probiviri",
            content: <HistoryRoster people={historicalArbiters} />,
          },
          {
            value: "deleghe",
            trigger: "Le deleghe, dal 2016 al 2024",
            content: <HistoryRoster people={historicalDelegates} />,
          },
          {
            value: "dipartimenti",
            trigger: "I dipartimenti, da dicembre 2024",
            content: (
              <div className="flex flex-col gap-6">
                <p className="typo-body-large">
                  La composizione riportata nel precedente sito a partire da dicembre 2024.
                </p>
                <HistoryRoster people={historicalDepartments} />
              </div>
            ),
          },
        ]}
      />
    </section>
  )
}
