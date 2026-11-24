import AccordionList from "@/components/accordion-list"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import { CourseAdmins } from "@/components/people/course-admins"
import { InOfficeBadge } from "@/components/people/in-office-badge"
import { Roster } from "@/components/people/roster"
import { TermList } from "@/components/people/term-list"
import { type Area, arbiters, areas, courseAdmins, currentTerm, formatPeriod, founders, guarantors } from "@/lib/people"

/** Departments still running come first; within each area the people in office are the last row */
function Areas({ items }: { items: Area[] }) {
  const sorted = [
    ...items.filter((area) => currentTerm(area.terms)),
    ...items.filter((area) => !currentTerm(area.terms)),
  ]
  return (
    <ul className="grid gap-x-12 gap-y-10 lg:grid-cols-2">
      {sorted.map((area) => (
        <li key={area.name} className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h4 className="typo-title-large text-text-primary">{area.name}</h4>
            {!currentTerm(area.terms) && <span className="typo-body-medium text-text-secondary">Area conclusa</span>}
          </div>
          <TermList terms={area.terms} />
        </li>
      ))}
    </ul>
  )
}

export function HistoricalPeople() {
  return (
    <section
      id="incarichi"
      aria-labelledby="incarichi-title"
      className={`${CONTAINER} flex scroll-mt-36 flex-col gap-8 md:gap-10`}
    >
      <div className="flex max-w-200 flex-col gap-4">
        <h2 id="incarichi-title" className={SECTION_TITLE}>
          Chi ha fatto crescere la rete
        </h2>
        <p className={SECTION_LEAD}>
          Tutte le persone che hanno avuto un incarico in PoliNetwork, dal 2016 a oggi. Ogni elenco segue l’ordine dei
          mandati: chi è in carica oggi è sempre l’ultimo.
        </p>
        <p className="typo-body-large flex flex-wrap items-center gap-x-2 gap-y-1 text-text-secondary">
          <InOfficeBadge /> segna i mandati in corso. “Nomina” indica le date per cui conosciamo solo l’inizio.
        </p>
      </div>
      <AccordionList
        contentClassName="max-w-none"
        items={[
          {
            value: "fondatori",
            trigger: "I fondatori",
            content: (
              <div className="flex flex-col gap-4">
                <p className="typo-body-medium text-text-secondary">{formatPeriod(founders)}</p>
                <Roster people={founders.people} />
              </div>
            ),
          },
          {
            value: "garanti",
            trigger: "I garanti del Consiglio degli Admin, 2016–2022",
            content: <TermList terms={guarantors} />,
          },
          {
            value: "probiviri",
            trigger: "Il Collegio dei Probiviri, dal 2023",
            content: <TermList terms={arbiters} />,
          },
          {
            value: "dipartimenti",
            trigger: "Deleghe e dipartimenti, dal 2016",
            content: <Areas items={areas} />,
          },
          {
            value: "capi-admin",
            trigger: "I capi admin dei corsi, 2016–2023",
            content: <CourseAdmins courses={courseAdmins} />,
          },
        ]}
      />
    </section>
  )
}
