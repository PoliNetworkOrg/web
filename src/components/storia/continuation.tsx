import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Continuation() {
  return (
    <section className="mx-auto w-full max-w-330 px-6" aria-labelledby="continua-title">
      <Glass className="grid items-center gap-10 rounded-rectangles border-white/50 bg-linear-to-br from-background-blur to-blue-tertiary/30 p-6 sm:p-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex min-w-0 flex-col items-start gap-6">
          <h2
            id="continua-title"
            className="typo-headline-medium sm:typo-display-medium text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent"
          >
            La storia continua.
          </h2>
          <p className="typo-body-large sm:typo-headline-extrasmall text-pretty">
            Ogni anno qualcuno arriva, qualcuno si laurea e qualcun altro raccoglie il testimone. La missione rimane la
            stessa: rendere la vita universitaria più semplice, accessibile e umana.
          </p>
          <Button asChild size="lg">
            <Link href="/collabora">
              Unisciti a noi <FiArrowUpRight aria-hidden />
            </Link>
          </Button>
        </div>
        <div className="flex min-w-0 flex-col gap-6">
          <ol className="grid grid-cols-4 gap-3" aria-label="Dal primo gruppo al prossimo capitolo">
            {["2016", "2022", "2026", "?"].map((year) => (
              <li key={year} className="min-w-0">
                <Glass
                  className={cn(
                    "typo-body-medium sm:typo-headline-small flex h-14 items-center justify-center rounded-rectangles border-white/50 p-0 sm:h-18",
                    year === "?"
                      ? "bg-button-primary text-text-accent-lightbg"
                      : "bg-background-blur text-blue-secondary"
                  )}
                >
                  {year}
                </Glass>
              </li>
            ))}
          </ol>
          <p className="typo-body-large text-pretty text-text-secondary">Nuove persone, nuove idee, nuovi progetti.</p>
          <p className="typo-title-large sm:typo-headline-medium text-balance text-blue-secondary">
            Il prossimo capitolo lo scriviamo insieme.
          </p>
        </div>
      </Glass>
    </section>
  )
}
