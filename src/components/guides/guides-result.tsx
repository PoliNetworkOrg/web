import { notFound } from "next/navigation"
import AccordionList from "@/components/accordion-list"
import { COURSE_GUIDES } from "@/components/guides/constants"
import { FLOW_MAIN, FlowHeader } from "@/components/layout/flow-header"
import { EMPTY_STATE } from "@/components/layout/page"
import { getLevel, getSchool } from "@/components/wizard/constants"
import { getVisibleGroups } from "@/queries/groups"
import { courseFacetsForLevel, humanizeSlug } from "@/utils/labels"
import { createStepHref } from "@/utils/step-href"

const stepHref = createStepHref("/guides/corso")

export async function GuidesResult({
  school: schoolSlug,
  level,
  course,
}: {
  school: string
  level: string
  course: string
}) {
  const school = getSchool(schoolSlug)
  const currentLevel = getLevel(schoolSlug, level)
  if (!school || !currentLevel) notFound()

  const groups = await getVisibleGroups()
  if (!courseFacetsForLevel(groups, schoolSlug, level).has(course)) notFound()

  const courseName = humanizeSlug(course)

  const guides = COURSE_GUIDES[course] ?? []

  return (
    <main className={FLOW_MAIN}>
      <FlowHeader
        title={courseName}
        subtitle={`Laurea ${currentLevel.name}`}
        backHref={stepHref({ school: schoolSlug, level })}
        replaceBack
        closeHref="/guides"
      />

      {guides.length > 0 ? (
        <AccordionList items={guides} />
      ) : (
        <p className={EMPTY_STATE}>Nessuna guida disponibile al momento per questo corso.</p>
      )}
    </main>
  )
}
