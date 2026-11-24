import Link from "next/link"
import { FiNavigation } from "react-icons/fi"
import { Button } from "../ui/button"
import { GroupSearch } from "./group-search"

export function Hero() {
  return (
    // Full screen from sm; on phones it ends after the buttons, so the projects follow at the site's section rhythm
    <section className="flex w-full flex-col items-center justify-center px-6 pt-36 pb-12 sm:min-h-svh sm:px-10 sm:py-36">
      <div className="flex w-full max-w-6xl flex-col items-center gap-10 text-center sm:gap-14">
        <h1 className="typo-display-fluid-large text-balance text-gradient-grey motion-safe:animate-hero-enter">
          Trova gruppi, risorse e supporto tra gli studenti del Polimi
        </h1>

        <div className="flex w-full flex-col items-center gap-6">
          <GroupSearch />

          <Button variant="primary" size="lg" className="[animation-delay:45ms] motion-safe:animate-hero-enter" asChild>
            <Link href="/gruppi">
              Altri gruppi
              <FiNavigation />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
