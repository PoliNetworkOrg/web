import { formatPeriod, type Term } from "@/lib/people"
import { cn } from "@/lib/utils"
import { InOfficeBadge } from "./in-office-badge"

/**
 * Terms in chronological order, one row each: the period (and the term's name, when it has one), then who held it.
 * The term in office comes last and is the only one marked.
 */
export function TermList({ terms, className }: { terms: Term[]; className?: string }) {
  return (
    <ol className={cn("flex flex-col", className)}>
      {terms.map((term, index) => {
        const period = formatPeriod(term)
        return (
          <li
            // biome-ignore lint/suspicious/noArrayIndexKey: terms are static and never reordered
            key={index}
            className={cn(
              "flex flex-col gap-3 border-white/60 border-b py-4 first:pt-0 last:border-b-0 last:pb-0",
              term.current && "rounded-rectangles border-b-0 bg-white/50 px-4 py-4 first:pt-4 last:pb-4"
            )}
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {term.title && <span className="typo-title-medium text-text-primary">{term.title}</span>}
              {period && <span className="typo-body-medium text-text-secondary tabular-nums">{period}</span>}
              {term.current && <InOfficeBadge />}
            </div>
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {term.people.map((person) => (
                <li key={`${person.name}:${person.role ?? ""}`} className="flex min-w-0 flex-col">
                  <span className="typo-title-medium text-text-primary">{person.name}</span>
                  {person.role && <span className="typo-body-medium text-text-secondary">{person.role}</span>}
                </li>
              ))}
            </ul>
          </li>
        )
      })}
    </ol>
  )
}
