import Link from "next/link"
import { notFound } from "next/navigation"
import { FiChevronRight } from "react-icons/fi"
import { CardCourse } from "@/components/card-course"
import { getCourseFilters, getCourses, getFaculty, getLevel } from "@/components/groups/constants"
import { CourseFilters } from "@/components/groups/course-filters"
import { WizardShell } from "@/components/groups/wizard-shell"
import { stepHref } from "./step-href"

export function CourseStep({
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
      captionPosition="above"
      backHref={stepHref({ school })}
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
