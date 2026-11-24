import { createFileRoute, notFound } from "@tanstack/react-router"
import { GroupsResult } from "@/components/groups/groups-result"
import { getLevel, getSchool } from "@/components/wizard/constants"
import { missingPage, pageMeta } from "@/lib/seo"
import { fetchCourseGroups } from "@/queries/functions"
import { humanizeSlug } from "@/utils/labels"

/** The page's title and description; nothing for a school or level that doesn't exist */
function courseMeta({
  school: schoolSlug,
  level: levelSlug,
  course,
}: {
  school: string
  level: string
  course: string
}) {
  const school = getSchool(schoolSlug)
  const level = getLevel(schoolSlug, levelSlug)
  if (!school || !level) return {}
  const courseName = humanizeSlug(course)
  return {
    title: `${courseName} - Gruppi`,
    description: `Gruppi Telegram e WhatsApp per ${courseName}, ${level.name} alla ${school.name}.`,
  }
}

export const Route = createFileRoute("/gruppi/didattica/$school/$level/$course")({
  loader: async ({ params }) => {
    if (!getSchool(params.school) || !getLevel(params.school, params.level)) throw notFound()
    // A course exists on the site when it has groups
    const groups = await fetchCourseGroups({ data: params })
    if (!groups) throw missingPage(courseMeta(params))
    return groups
  },
  head: ({ params }) => ({ meta: pageMeta(courseMeta(params)) }),
  component: GroupsResultPage,
})

function GroupsResultPage() {
  const { school, level, course } = Route.useParams()
  return <GroupsResult school={school} level={level} course={course} groups={Route.useLoaderData()} />
}
