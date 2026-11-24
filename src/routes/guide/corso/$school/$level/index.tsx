import { createFileRoute, notFound } from "@tanstack/react-router"
import { getLevel, getSchool } from "@/components/wizard/constants"
import { CourseStep } from "@/components/wizard/course-step"
import { pageMeta } from "@/lib/seo"
import { fetchCourses } from "@/queries/functions"
import { createStepHref } from "@/utils/step-href"

const stepHref = createStepHref("/guide/corso")

/**
 * A filter as the URL has it. Anything is kept as text, so an unexpected value (a number, the parameter repeated)
 * filters every course out instead of being silently dropped.
 */
const filter = (value: unknown) => (value === undefined || value === "" ? undefined : String(value))

export const Route = createFileRoute("/guide/corso/$school/$level/")({
  loader: ({ params }) => {
    if (!getSchool(params.school) || !getLevel(params.school, params.level)) throw notFound()
    return fetchCourses({ data: params })
  },
  head: ({ params }) => {
    const school = getSchool(params.school)
    const level = getLevel(params.school, params.level)
    if (!school || !level) return {}
    return {
      meta: pageMeta({
        title: `${level.name} - ${school.name}`,
        description: `Trova le guide del tuo corso di ${level.name.toLowerCase()} alla ${school.name}.`,
      }),
    }
  },
  component: CoursePage,
})

function CoursePage() {
  const { school, level } = Route.useParams()
  // Read as they are: validating the search would make the router redirect any URL it would write differently
  const { campus, lang }: { campus?: unknown; lang?: unknown } = Route.useSearch()
  return (
    <CourseStep
      school={school}
      level={level}
      campus={filter(campus)}
      lang={filter(lang)}
      courses={Route.useLoaderData()}
      landingHref="/guide"
      stepHref={stepHref}
    />
  )
}
