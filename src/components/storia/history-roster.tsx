import type { HistoricalPerson } from "./people-data"

export function HistoryRoster({ people }: { people: HistoricalPerson[] }) {
  return (
    <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {people.map((person) => (
        <div
          key={`${person.name}:${person.role}:${person.period ?? ""}`}
          className="flex min-w-0 flex-col gap-1 border-white/60 border-b pb-5"
        >
          <dt className="typo-title-medium text-text-primary">{person.name}</dt>
          <dd className="typo-body-large text-text-primary">{person.role}</dd>
          {person.period && <dd className="typo-body-medium text-text-secondary">{person.period}</dd>}
        </div>
      ))}
    </dl>
  )
}
