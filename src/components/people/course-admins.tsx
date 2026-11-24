import { type Area, formatPeriod } from "@/lib/people"

/** Consecutive terms of the same person become one line with all their periods */
function byPerson(area: Area) {
  const rows: { name: string; periods: string[] }[] = []
  for (const term of area.terms) {
    const name = term.people.map((person) => person.name).join(", ")
    const last = rows.at(-1)
    if (last?.name === name) last.periods.push(formatPeriod(term))
    else rows.push({ name, periods: [formatPeriod(term)] })
  }
  return rows
}

/** Every course with its admin leads, oldest first, in a compact grid */
export function CourseAdmins({ courses }: { courses: Area[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => (
        <li key={course.name} className="flex min-w-0 flex-col gap-3">
          <h4 className="typo-title-large text-text-primary">{course.name}</h4>
          <ol className="flex flex-col gap-2">
            {byPerson(course).map((row) => (
              <li key={`${row.name}:${row.periods[0]}`} className="flex min-w-0 flex-col">
                <span className="typo-title-medium text-text-primary">{row.name}</span>
                <span className="typo-body-medium text-text-secondary tabular-nums">{row.periods.join(" · ")}</span>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ul>
  )
}
