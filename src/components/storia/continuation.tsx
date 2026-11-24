import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { FillLine } from "@/components/fill-line"
import { Glass } from "@/components/glass"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const years = ["2016", "2022", "Oggi"] as const

// The years on the same line as the other timelines: glass tiles on a 4px line that fills up to today. The next chapter
// is an open, dashed tile at the end of a dashed stretch: it hasn't been written yet.
export function Continuation() {
  return (
    <section
      className={`${CONTAINER} grid items-center gap-12 xl:grid-cols-2 xl:gap-16`}
      aria-labelledby="continua-title"
    >
      <div className="flex min-w-0 flex-col items-start gap-6">
        <h2 id="continua-title" className={SECTION_TITLE}>
          La storia continua
        </h2>
        <p className={cn(SECTION_LEAD, "max-w-145")}>
          Ogni anno qualcuno arriva, qualcuno si laurea e qualcun altro raccoglie il testimone. Nuove persone, nuove
          idee, nuovi progetti. La missione rimane la stessa: rendere la vita universitaria più semplice, accessibile e
          umana.
        </p>
      </div>

      <div className="flex min-w-0 flex-col items-center gap-8">
        <ol className="flex w-full max-w-130 items-center" aria-label="Dal primo gruppo al prossimo capitolo">
          {years.map((year, index) => (
            <li key={year} className={cn("flex items-center", index > 0 && "flex-1")}>
              {index > 0 && (
                <FillLine direction="across" delay={(index - 1) * 0.5} className="mx-2 h-1 flex-1 sm:mx-3" />
              )}
              <Glass className="typo-title-medium sm:typo-title-large flex h-14 min-w-16 items-center justify-center rounded-rectangles border-white bg-white/70 px-3 py-0 text-blue-secondary sm:h-18 sm:min-w-20">
                {year}
              </Glass>
            </li>
          ))}
          <li className="flex flex-1 items-center">
            <span aria-hidden className="mx-2 h-0 flex-1 border-blue-primary/50 border-t-4 border-dashed sm:mx-3" />
            <span className="typo-title-medium sm:typo-title-large flex h-14 min-w-16 items-center justify-center rounded-rectangles border-2 border-blue-primary/60 border-dashed px-3 text-blue-secondary sm:h-18 sm:min-w-20">
              <span aria-hidden>?</span>
              <span className="sr-only">Il prossimo capitolo</span>
            </span>
          </li>
        </ol>
        <p className="typo-title-large sm:typo-headline-medium text-balance text-center text-blue-secondary">
          Il prossimo capitolo lo scriviamo insieme.
        </p>
        <Button asChild size="lg">
          <Link href="/unisciti">
            Unisciti a noi <FiArrowUpRight aria-hidden />
          </Link>
        </Button>
      </div>
    </section>
  )
}
