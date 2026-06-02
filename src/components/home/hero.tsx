import Link from "next/link"
import { FiNavigation, FiSearch, FiUserPlus } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Hero() {
  return (
    <section className="flex min-h-screen flex-col gap-40 px-6 pt-67 pb-15 sm:gap-70 sm:px-12">
      <div className="flex flex-col items-center gap-17.5 text-center">
        <h1 className="typo-display-small sm:typo-display-medium md:typo-display-large w-fit max-w-4xl bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
          Trova gruppi, risorse e supporto tra gli studenti del Polimi
        </h1>

        <Input
          icon={<FiSearch className="h-5 w-5" />}
          type="text"
          placeholder="Find your group"
          aria-label="Find your group"
          containerClassName="max-w-lg"
          className="typo-body-medium"
        />

        <Button variant="primary" size="lg" asChild>
          <Link href="/groups" className="flex items-center gap-2">
            More groups
            <FiNavigation />
          </Link>
        </Button>
      </div>

      <div className="flex items-end justify-end">
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
