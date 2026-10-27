import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CONTAINER } from "./constants"

const years = ["2016", "2022", "2026", "?"]

// Figma: text on the left, the years on a line on the right. No panel or gradient behind it, and the "?" is a
// quiet open slot rather than a filled pill that looks like a button.
export function Continuation() {
  return (
    <section
      className={`${CONTAINER} grid items-center gap-12 xl:grid-cols-2 xl:gap-16`}
      aria-labelledby="continua-title"
    >
      <div className="flex min-w-0 flex-col items-start gap-6">
        <h2
          id="continua-title"
          className="typo-headline-medium sm:typo-display-medium text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent"
        >
          La storia continua.
        </h2>
        <p className="typo-body-large sm:typo-headline-extrasmall max-w-145 text-pretty">
          Ogni anno qualcuno arriva, qualcuno si laurea e qualcun altro raccoglie il testimone. Nuove persone, nuove
          idee, nuovi progetti. La missione rimane la stessa: rendere la vita universitaria più semplice, accessibile e
          umana.
        </p>
      </div>

      <div className="flex min-w-0 flex-col items-start gap-8 xl:items-center">
        <ol className="flex w-full max-w-120 items-center" aria-label="Dal primo gruppo al prossimo capitolo">
          {years.map((year, index) => (
            <li key={year} className={cn("flex items-center", index > 0 && "flex-1")}>
              {index > 0 && <span aria-hidden className="mx-2 h-px flex-1 bg-blue-primary/40 sm:mx-3" />}
              <span
                className={cn(
                  "typo-title-medium sm:typo-headline-small flex h-12 min-w-14 items-center justify-center rounded-rectangles border px-3 sm:h-16 sm:min-w-20",
                  year === "?"
                    ? "border-blue-primary/60 border-dashed text-blue-secondary"
                    : "border-white/50 bg-background-blur text-blue-secondary"
                )}
              >
                {year}
              </span>
            </li>
          ))}
        </ol>
        <p className="typo-title-large sm:typo-headline-medium text-balance text-blue-secondary xl:text-center">
          Il prossimo capitolo lo scriviamo insieme.
        </p>
        <Button asChild size="lg">
          <Link href="/collabora">
            Unisciti a noi <FiArrowUpRight aria-hidden />
          </Link>
        </Button>
      </div>
    </section>
  )
}
