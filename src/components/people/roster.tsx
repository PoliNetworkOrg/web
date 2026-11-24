import type { Holder } from "@/lib/people"
import { cn } from "@/lib/utils"

/** Names with their roles, in as many columns as fit */
export function Roster({ people, className }: { people: Holder[]; className?: string }) {
  return (
    <ul className={cn("grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}>
      {people.map((person) => (
        <li key={`${person.name}:${person.role ?? ""}`} className="flex min-w-0 flex-col gap-0.5">
          <span className="typo-title-medium text-text-primary">{person.name}</span>
          {person.role && <span className="typo-body-medium text-text-secondary">{person.role}</span>}
        </li>
      ))}
    </ul>
  )
}
