import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { Button } from "@/components/ui/button"

export function AboutUs() {
  return (
    <section className="page-container flex flex-col items-center gap-block text-center">
      <h1 className="typo-headline-medium sm:typo-display-large max-w-4xl bg-linear-to-r from-text-primary via-blue-secondary to-blue-primary bg-clip-text text-transparent">
        PoliNetwork unisce gli studenti del Poli: gruppi, risorse e supporto, tutti in un'unica community.
      </h1>

      <Button variant="primary" size="lg" asChild>
        <Link href="/about" className="flex items-center gap-2">
          About us
          <FiArrowUpRight />
        </Link>
      </Button>
    </section>
  )
}
