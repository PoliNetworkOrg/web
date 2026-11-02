import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { Button } from "@/components/ui/button"

export function AboutUs() {
  return (
    <section className="mx-auto flex min-h-svh w-full max-w-4xl flex-col items-center justify-center gap-16 px-7.5 py-12 text-center sm:gap-24">
      <h2 className="typo-headline-medium sm:typo-display-large bg-linear-to-r from-text-primary via-blue-secondary to-blue-primary bg-clip-text text-transparent">
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
