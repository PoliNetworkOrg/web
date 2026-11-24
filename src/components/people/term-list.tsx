import { ScrollFillLine } from "@/components/fill-line"
import { formatPeriod, type Term } from "@/lib/people"
import { cn } from "@/lib/utils"

/**
 * Terms in chronological order on a vertical line, like the timelines on /storia: one node per term with its years
 * (and name, when it has one), then who held it. The term in office comes last; its node and years are in blue.
 */
export function TermList({ terms, className }: { terms: Term[]; className?: string }) {
  return (
    <ol className={cn("flex flex-col gap-6", className)}>
      {terms.map((term, index) => {
        const period = formatPeriod(term)
        return (
          <li
            // biome-ignore lint/suspicious/noArrayIndexKey: terms are static and never reordered
            key={index}
            className="relative grid grid-cols-[1rem_minmax(0,1fr)] gap-x-4"
          >
            {index < terms.length - 1 && (
              // Down to the next node, through the gap between the rows; the lines fill one after the other, as in the
              // site's other timelines
              <ScrollFillLine className="-bottom-6 absolute top-5 left-1.5 w-1" />
            )}
            <span
              aria-hidden
              className={cn(
                "mt-1 size-4 rounded-full",
                term.current
                  ? "bg-linear-to-b from-blue-secondary to-blue-primary"
                  : "border-4 border-blue-primary/25 bg-white/70"
              )}
            />
            <div className="flex min-w-0 flex-col gap-2">
              <p
                className={cn(
                  "typo-title-medium tabular-nums",
                  term.current
                    ? "bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent"
                    : "text-text-secondary"
                )}
              >
                {[term.title, period].filter(Boolean).join(" · ")}
              </p>
              <ul className="flex flex-wrap gap-x-8 gap-y-2">
                {term.people.map((person) => (
                  <li key={`${person.name}:${person.role ?? ""}`} className="flex min-w-0 flex-col">
                    <span className="typo-title-medium text-text-primary">{person.name}</span>
                    {person.role && <span className="typo-body-medium text-text-secondary">{person.role}</span>}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
