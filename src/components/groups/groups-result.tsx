import Link from "next/link"
import { notFound } from "next/navigation"
import { FiArrowLeft, FiX } from "react-icons/fi"
import { CardCourseGroup } from "@/components/card-course-group"
import { getCourse, getFaculty, getLevel } from "@/components/groups/constants"
import { stepHref } from "./step-href"

// TODO: placeholder da cambiare
const FIRST_YEAR_GROUPS_PLACEHOLDER = Array.from({ length: 7 }, (_, i) => `Sezione P${i + 1}`)

export function GroupsResult({ school, level, course }: { school: string; level: string; course: string }) {
  const faculty = getFaculty(school)
  const currentCourse = getCourse(school, level, course)
  const currentLevel = getLevel(level)
  if (!faculty || !currentCourse || !currentLevel) notFound()

  return (
    <main className="mx-auto flex min-h-svh w-full min-w-0 max-w-7xl flex-col gap-8 px-6 py-50 md:gap-0">
      <header className="relative flex flex-col items-center gap-1 md:static md:flex-row md:items-center md:gap-4">
        <Link
          href={stepHref({ school, level })}
          replace
          aria-label="Indietro"
          className="absolute top-0 left-0 grid size-10 shrink-0 place-items-center rounded-full bg-white/60 md:static"
        >
          <FiArrowLeft className="size-5" />
        </Link>
        <div className="flex min-w-0 flex-col items-center gap-1 text-center md:flex-1">
          <h1 className="typo-title-large md:typo-display-medium text-text-primary">{currentCourse.name}</h1>
          <p className="typo-label-large md:typo-headline-small text-text-secondary md:text-text-primary">
            Laurea {currentLevel.name}
          </p>
        </div>
        <Link
          href="/groups"
          aria-label="Chiudi"
          className="absolute top-0 right-0 grid size-10 shrink-0 place-items-center rounded-full bg-white/60 md:static"
        >
          <FiX className="size-5" />
        </Link>
      </header>

      <div className="flex flex-row gap-3 md:mt-25.75">
        <CardCourseGroup groupName={`Gruppo Generale ${faculty.name}`} stacked />
        <CardCourseGroup groupName={`Gruppo Generale Community ${currentLevel.name}`} secondary stacked />
      </div>

      <div className="flex flex-col gap-4 md:mt-16.25 md:gap-0">
        <div className="relative flex items-center justify-center md:static md:justify-between">
          <p className="typo-body-large md:typo-headline-small text-center text-text-primary md:text-left">
            Gruppi del Primo Anno
          </p>
          <p className="typo-label-small md:typo-label-medium -translate-y-1/2 absolute top-1/2 right-0 rounded-full border border-white/50 bg-background-blur px-3 py-1 text-text-secondary md:static md:translate-y-0 md:rounded-buttonsM md:border-0 md:py-2">
            {FIRST_YEAR_GROUPS_PLACEHOLDER.length} Gruppi
          </p>
        </div>
        <div className="flex flex-col gap-3 md:mt-6.75">
          {FIRST_YEAR_GROUPS_PLACEHOLDER.map((name) => (
            <CardCourseGroup key={name} groupName={name} />
          ))}
        </div>
      </div>
    </main>
  )
}
