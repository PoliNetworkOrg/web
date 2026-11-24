import Link from "next/link"
import AccordionList from "@/components/accordion-list"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import { CourseAdmins } from "@/components/people/course-admins"
import { Roster } from "@/components/people/roster"
import { TermList } from "@/components/people/term-list"
import { type Area, arbiters, areas, courseAdmins, formatPeriod, founders, guarantors } from "@/lib/people"

/** Today's teams first, then the areas that ended; within each the people in office are the last row */
function Areas({ items }: { items: Area[] }) {
  const sorted = [...items.filter((area) => area.teamId), ...items.filter((area) => !area.teamId)]
  return (
    <ul className="grid gap-x-12 gap-y-10 lg:grid-cols-2">
      {sorted.map((area) => (
        <li key={area.name} className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h4 className="typo-title-large text-text-primary">
              {area.teamId ? (
                <Link
                  href={`/team#${area.teamId}`}
                  className="underline-offset-4 hover:text-blue-secondary hover:underline"
                >
                  {area.name}
                </Link>
              ) : (
                area.name
              )}
            </h4>
            <p className="typo-body-medium text-text-secondary">
              {area.teamId ? `Prima: ${area.formerNames?.join(", poi ") ?? ""}` : (area.note ?? "Area conclusa")}
            </p>
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
            trigger: "Dalle deleghe ai team, dal 2016",
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
