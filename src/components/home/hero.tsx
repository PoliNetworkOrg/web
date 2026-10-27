import Link from "next/link"
import { FiNavigation, FiUserPlus } from "react-icons/fi"
import { Button } from "../ui/button"
import { GroupSearch } from "./group-search"

export function Hero() {
  return (
    <section className="flex w-full flex-col items-center justify-center px-6 pt-36 pb-16 sm:min-h-[min(88svh,52rem)] sm:px-10 sm:pt-40 sm:pb-24">
      <div className="flex w-full max-w-6xl flex-col items-center gap-10 text-center sm:gap-14">
        <h1 className="typo-display-fluid-large text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
          Trova gruppi, risorse e supporto tra gli studenti del Polimi
        </h1>

        <div className="flex w-full flex-col items-center gap-6">
          <GroupSearch />

          {/* The freshman path sits next to the primary action, instead of floating alone in the corner */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="primary" size="lg" asChild>
              <Link href="/groups">
                More groups
                <FiNavigation />
              </Link>
            </Button>
            <Button variant="tertiaryBlur" size="lg" className="typo-label-large text-blue-secondary" asChild>
              <Link href="/matricole">
                <FiUserPlus />
                Sei una matricola?
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
