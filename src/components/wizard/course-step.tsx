import { notFound } from "@tanstack/react-router"
import { FiChevronRight } from "react-icons/fi"
import { CardCourse } from "@/components/card-course"
import { EMPTY_STATE } from "@/components/layout/page"
import { Link } from "@/components/link"
import { getLevel, getSchool } from "@/components/wizard/constants"
import { CourseFilters, type FilterOption } from "@/components/wizard/course-filters"
import { WizardShell } from "@/components/wizard/wizard-shell"
import {
  CAMPUS_FACETS,
  campusFacet,
  campusLabel,
  humanizeSlug,
  LANGUAGE_FACETS,
  languageFacet,
  languageLabel,
} from "@/utils/labels"
import type { StepHrefBuilder } from "@/utils/step-href"

/** A course of the level with the facets (campus, language…) its groups carry, as `fetchCourses` returns it */
type Course = { slug: string; facets: string[] }

function facetOptions(courses: Course[], known: string[], label: (facet: string) => string) {
  const values = new Set<string>()
  for (const { facets } of courses) {
    for (const facet of facets) {
      if (known.includes(facet)) values.add(facet)
    }
  }
  return [...values].sort().map((value) => ({ value, label: label(value) }) satisfies FilterOption)
}

export function CourseStep({
  school: schoolSlug,
  level,
  campus,
  lang,
  courses,
  landingHref,
  stepHref,
}: {
  school: string
  level: string
  campus?: string
  lang?: string
  /** Every course of the level, sorted by slug */
  courses: Course[]
  landingHref: string
  stepHref: StepHrefBuilder
}) {
  const school = getSchool(schoolSlug)
  const currentLevel = getLevel(schoolSlug, level)
  // The route's loader has already answered 404 for an unknown school or level
  if (!school || !currentLevel) throw notFound()

  const campusOptions = facetOptions(courses, CAMPUS_FACETS, campusLabel)
  const languageOptions = facetOptions(courses, LANGUAGE_FACETS, languageLabel)

  const shown = courses.filter(({ facets }) => {
    if (campus && !facets.includes(campus)) return false
    if (lang && !facets.includes(lang)) return false
    return true
  })

  return (
    <WizardShell
      activeStep={2}
      title="Quale corso segui?"
      caption={`Perfetto, cerchiamo tra i corsi della ${currentLevel.name.toLowerCase()}!`}
      captionPosition="above"
      backHref={stepHref({ school: schoolSlug })}
      closeHref={landingHref}
      action={
        campusOptions.length > 0 || languageOptions.length > 0 ? (
          <CourseFilters campuses={campusOptions} languages={languageOptions} />
        ) : undefined
      }
    >
      <div className="flex flex-col gap-3">
        {shown.length === 0 && <p className={EMPTY_STATE}>Nessun corso disponibile al momento.</p>}
        {shown.map(({ slug: course, facets }) => {
          const courseCampus = campusFacet(facets)
          const courseLanguage = languageFacet(facets)
          return (
            <Link
              key={course}
              href={stepHref({ school: schoolSlug, level, course })}
              data-course-option
              className="press-feedback block rounded-rectangles outline-none focus-visible:ring-2 focus-visible:ring-blue-secondary"
            >
              <CardCourse
                courseName={humanizeSlug(course)}
                location={courseCampus ? campusLabel(courseCampus) : undefined}
                language={courseLanguage ? languageLabel(courseLanguage) : undefined}
                iconSelect={FiChevronRight}
              />
            </Link>
          )
        })}
      </div>
    </WizardShell>
  )
}
