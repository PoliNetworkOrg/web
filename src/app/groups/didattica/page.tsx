import Link from "next/link"
import { notFound } from "next/navigation"
import type { IconType } from "react-icons"
import { FiBook, FiBox, FiChevronRight, FiFeather, FiPenTool } from "react-icons/fi"
import { CardCourse } from "@/components/card-course"
import { CardCourseGroup } from "@/components/card-course-group"
import { CardIcon } from "@/components/card-icon"
import { CardPathSelection } from "@/components/card-path-selection"
import {
  FACULTIES,
  getCourse,
  getCourseFilters,
  getCourses,
  getFaculty,
  getLevel,
  LEVELS,
} from "@/components/groups/constants"
import { CourseFilters } from "@/components/groups/course-filters"
import type { WizardParams } from "@/components/groups/types"
import { WizardShell } from "@/components/groups/wizard-shell"

const FACULTY_ICONS: Record<string, IconType> = {
  architettura: FiPenTool,
  design: FiFeather,
  ingegneria: FiBox,
}

function stepHref(params: Pick<WizardParams, "school" | "level" | "course">) {
  const query = new URLSearchParams()
  if (params.school) query.set("school", params.school)
  if (params.level) query.set("level", params.level)
  if (params.course) query.set("course", params.course)
  const search = query.toString()
  return search ? `/groups/didattica?${search}` : "/groups/didattica"
}

export default async function DidatticaWizard({ searchParams }: { searchParams: Promise<WizardParams> }) {
  const { school, level, course, campus, lang } = await searchParams

  if (school && level && course) return <GroupsResult school={school} level={level} course={course} />
  if (school && level) return <CourseStep school={school} level={level} campus={campus} lang={lang} />
  if (school) return <LevelStep school={school} />

  return <FacultyStep />
}

function FacultyStep() {
  return (
    <WizardShell activeStep={0} title="Seleziona la tua facoltà" caption="Troviamo il tuo gruppo partendo dalla base!">
      <div className="grid gap-4 sm:grid-cols-3 sm:gap-12.5">
        {FACULTIES.map((faculty) => (
          <CardIcon
            key={faculty.slug}
            title={faculty.name}
            icon={FACULTY_ICONS[faculty.slug] ?? FiPenTool}
            href={stepHref({ school: faculty.slug })}
            hoverEffect
          />
        ))}
      </div>
    </WizardShell>
  )
}

function LevelStep({ school }: { school: string }) {
  const faculty = getFaculty(school)
  if (!faculty) notFound()

  return (
    <WizardShell activeStep={1} title="A che punto del percorso sei?" caption={faculty.name}>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {LEVELS.map((level) => (
          <Link key={level.slug} href={stepHref({ school, level: level.slug })} className="block">
            <CardPathSelection caption={level.name} className="w-full" icon={FiBook} />
          </Link>
        ))}
      </div>
    </WizardShell>
  )
}

function CourseStep({
  school,
  level,
  campus,
  lang,
}: {
  school: string
  level: string
  campus?: string
  lang?: string
}) {
  const faculty = getFaculty(school)
  const currentLevel = getLevel(level)
  if (!faculty || !currentLevel) notFound()

  const { campuses, languages } = getCourseFilters(school, level)
  const courses = getCourses(school, level).filter(
    (course) => (!campus || course.location === campus) && (!lang || course.language === lang)
  )

  return (
    <WizardShell
      activeStep={2}
      title="Quale corso segui?"
      caption={`Perfetto, cerchiamo tra i corsi della ${currentLevel.name.toLowerCase()}!`}
      action={<CourseFilters campuses={campuses} languages={languages} />}
    >
      <div className="flex flex-col gap-3">
        {courses.length === 0 && (
          <p className="typo-body-medium text-text-secondary">Nessun corso corrisponde ai filtri.</p>
        )}
        {courses.map((course) => (
          <Link key={course.slug} href={stepHref({ school, level, course: course.slug })} className="block">
            <CardCourse
              courseName={course.name}
              location={course.location}
              language={course.language}
              iconSelect={FiChevronRight}
            />
          </Link>
        ))}
      </div>
    </WizardShell>
  )
}

function GroupsResult({ school, level, course }: { school: string; level: string; course: string }) {
  const currentCourse = getCourse(school, level, course)
  const currentLevel = getLevel(level)
  if (!currentCourse || !currentLevel) notFound()

  return (
    <main className="mx-auto flex min-h-svh max-w-7xl flex-col items-center gap-26 px-4 pt-42 pb-16">
      <header className="flex flex-col items-center gap-2 text-center">
        <h1 className="typo-display-medium">{currentCourse.name}</h1>
        <p className="typo-headline-small text-text-secondary">Laurea {currentLevel.name}</p>
      </header>

      <div className="flex flex-row gap-3">
        <CardCourseGroup groupName="Gruppo Generale Scuola" />
        <CardCourseGroup groupName="Gruppo Generale Community" secondary />
      </div>
    </main >
  )
}
