import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { Button } from "@/components/ui/button"

export function AboutUs() {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10 px-6 py-24 text-center sm:gap-12 sm:px-10 sm:py-32 xl:py-40">
      {/* Grey gradient only: the background already carries the decoration (style guide: shapes OR coloured text) */}
      <h2 className="typo-headline-medium sm:typo-display-medium xl:typo-display-large text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
        PoliNetwork unisce gli studenti del Poli: gruppi, risorse e supporto, tutti in un'unica community.
      </h2>

      <Button variant="primary" size="lg" asChild>
        <Link href="/about">
          About us
          <FiArrowUpRight />
        </Link>
      </Button>
    </section>
  )
}
