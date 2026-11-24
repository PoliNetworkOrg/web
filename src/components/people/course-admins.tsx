import TabsNavigation from "@/components/tabs"
import { Tabs } from "@/components/tabs/tabs"
import { TabsContent } from "@/components/tabs/tabs-content"
import { type Area, formatPeriod, type Term } from "@/lib/people"

const SCHOOLS = [
  { value: "ingegneria", label: "Ingegneria" },
  { value: "design", label: "Design" },
  { value: "architettura", label: "Architettura e Urbanistica" },
] as const

const ARCHITECTURE = ["Progettazione dell’Architettura", "Urbanistica", "Management of Built Environment"]

function schoolOf(course: string): (typeof SCHOOLS)[number]["value"] {
  if (course.startsWith("Design")) return "design"
  if (ARCHITECTURE.includes(course)) return "architettura"
  return "ingegneria"
}

/** Consecutive terms of the same person become one span, from their first year to their last */
function byPerson(course: Area) {
  const rows: { name: string; first: Term; last: Term }[] = []
  for (const term of course.terms) {
    const name = term.people.map((person) => person.name).join(", ")
    const previous = rows.at(-1)
    if (previous?.name === name) previous.last = term
    else rows.push({ name, first: term, last: term })
  }
  return rows.map(({ name, first, last }) => ({
    name,
    period: formatPeriod({ from: first.from, to: last.to ?? last.from }),
  }))
}

/** One line per course: the course on the left, its admin leads in order on the right */
function CourseRow({ course }: { course: Area }) {
  return (
    <li className="grid gap-x-6 gap-y-1 border-grey border-b py-3 last:border-b-0 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]">
      <h4 className="typo-title-medium text-text-primary">{course.name}</h4>
      <ul className="flex flex-wrap gap-x-5 gap-y-1">
        {byPerson(course).map((row) => (
          <li key={`${row.name}:${row.period}`} className="typo-body-medium">
            <span className="text-text-primary">{row.name}</span>{" "}
            <span className="text-text-secondary tabular-nums">{row.period}</span>
          </li>
        ))}
      </ul>
    </li>
  )
}

/** Courses by school, one tab each: Engineering alone is twenty courses, so its rows split in two columns */
export function CourseAdmins({ courses }: { courses: Area[] }) {
  return (
    <Tabs defaultValue="ingegneria" className="gap-6">
      <TabsNavigation items={SCHOOLS.map(({ value, label }) => ({ value, label }))} />
      {SCHOOLS.map((school) => (
        <TabsContent key={school.value} value={school.value}>
          <ul className="gap-x-12 xl:columns-2 [&>li]:break-inside-avoid">
            {courses
              .filter((course) => schoolOf(course.name) === school.value)
              .map((course) => (
                <CourseRow key={course.name} course={course} />
              ))}
          </ul>
        </TabsContent>
      ))}
    </Tabs>
  )
}
