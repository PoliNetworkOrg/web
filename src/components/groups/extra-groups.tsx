import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import { CardCourseGroup } from "@/components/card-course-group"

// TODO: placeholder da cambiare
const EXTRA_GROUPS_PLACEHOLDER = ["Affitti", "Mercatino", "Eventi", "Hobby"]

export function ExtraGroups() {
  return (
    <main className="mx-auto flex min-h-svh w-full min-w-0 max-w-7xl flex-col gap-16 px-6 py-50 md:gap-0">
      <header className="relative flex flex-col items-center gap-1 md:static md:flex-row md:items-center md:gap-4">
        <Link
          href="/groups"
          aria-label="Indietro"
          className="absolute top-0 left-0 grid size-10 shrink-0 place-items-center rounded-full bg-white/60 md:static"
        >
          <FiArrowLeft className="size-5" />
        </Link>
        <div className="flex min-w-0 flex-col items-center gap-1 text-center md:flex-1">
          <h1 className="typo-title-large md:typo-display-medium text-text-primary">Gruppi Extra</h1>
        </div>
      </header>

      <div className="flex flex-col gap-3 md:mt-25.75">
        {EXTRA_GROUPS_PLACEHOLDER.map((name) => (
          <CardCourseGroup key={name} groupName={name} />
        ))}
      </div>
    </main>
  )
}
