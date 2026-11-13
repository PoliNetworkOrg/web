import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { Button } from "@/components/ui/button"

export function AboutUs() {
  return (
    // Full screen only from lg: on phones and tablets one sentence and a button would float in an empty screen
    <section className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-10 px-7.5 py-12 text-center sm:gap-14 sm:py-24 lg:min-h-svh lg:py-12">
      <h2 className="typo-display-fluid-medium text-balance bg-linear-to-r from-text-primary via-blue-secondary to-blue-primary bg-clip-text text-transparent">
        PoliNetwork unisce gli studenti del Poli: gruppi, risorse e supporto, tutti in un'unica community.
      </h2>

      <Button variant="primary" size="lg" asChild>
        <Link href="/about">
          Scopri di più
          <FiArrowUpRight />
        </Link>
      </Button>
    </section>
  )
}
