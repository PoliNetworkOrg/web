import Link from "next/link"
import { FiNavigation, FiUserPlus } from "react-icons/fi"
import { Button } from "../ui/button"
import { GroupSearch } from "./group-search"

export function Hero() {
  return (
    <section className="flex min-h-screen flex-col gap-10 px-6 pt-67 pb-15 sm:px-12">
      <div className="flex flex-1 justify-center flex-col items-center gap-17.5 text-center">
        <h1 className="typo-display-small sm:typo-display-medium md:typo-display-large w-fit max-w-4xl bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
          Trova gruppi, risorse e supporto tra gli studenti del Polimi
        </h1>

        <GroupSearch />

        <Button variant="primary" size="lg" asChild>
          <Link href="/groups" className="flex items-center gap-2">
            More groups
            <FiNavigation />
          </Link>
        </Button>
      </div>

      <div className="mt-auto flex justify-end">
        <Button variant="tertiaryBlur" size="lg" className="text-blue-secondary" asChild>
          <Link href="/matricole">
            <FiUserPlus />
            Sei una matricola?
          </Link>
        </Button>
      </div>
    </section>
  )
}
