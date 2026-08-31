import Link from "next/link"
import { notFound } from "next/navigation"
import { FiChevronRight } from "react-icons/fi"
import { CardCourse } from "@/components/card-course"
import { getLevel, getSchool } from "@/components/groups/constants"
import { CourseFilters, type FilterOption } from "@/components/groups/course-filters"
import { WizardShell } from "@/components/groups/wizard-shell"
import { getVisibleGroups } from "@/queries/groups"
import {
  CAMPUS_FACETS,
  campusFacet,
  campusLabel,
  courseFacetsForLevel,
  humanizeSlug,
  LANGUAGE_FACETS,
  languageFacet,
  languageLabel,
} from "@/utils/labels"
import { stepHref } from "../../utils/step-href"

function facetOptions(facetsByCourse: Map<string, string[]>, known: string[], label: (facet: string) => string) {
  const values = new Set<string>()
  for (const facets of facetsByCourse.values()) {
    for (const facet of facets) {
      if (known.includes(facet)) values.add(facet)
    }
  }
  return [...values].sort().map((value) => ({ value, label: label(value) }) satisfies FilterOption)
}

export async function CourseStep({
  school: schoolSlug,
  level,
  campus,
  lang,
}: {
  school: string
  level: string
  campus?: string
  lang?: string
}) {
  const school = getSchool(schoolSlug)
  const currentLevel = getLevel(schoolSlug, level)
  if (!school || !currentLevel) notFound()

  const groups = await getVisibleGroups()
  const facetsByCourse = courseFacetsForLevel(groups, schoolSlug, level)
  const allCourseSlugs = [...facetsByCourse.keys()].sort()

  const campusOptions = facetOptions(facetsByCourse, CAMPUS_FACETS, campusLabel)
  const languageOptions = facetOptions(facetsByCourse, LANGUAGE_FACETS, languageLabel)

  const courseSlugs = allCourseSlugs.filter((course) => {
    const facets = facetsByCourse.get(course) ?? []
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
      action={
        campusOptions.length > 0 || languageOptions.length > 0 ? (
          <CourseFilters campuses={campusOptions} languages={languageOptions} />
        ) : undefined
      }
    >
      <div className="flex flex-col gap-3">
        {courseSlugs.length === 0 && (
          <p className="typo-body-medium text-text-secondary">Nessun corso disponibile al momento.</p>
        )}
        {courseSlugs.map((course) => {
          const facets = facetsByCourse.get(course) ?? []
          const courseCampus = campusFacet(facets)
          const courseLanguage = languageFacet(facets)
          return (
            <Link key={course} href={stepHref({ school: schoolSlug, level, course })} className="block">
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
