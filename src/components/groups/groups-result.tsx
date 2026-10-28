import { notFound } from "next/navigation"
import { CardCourseGroup } from "@/components/card-course-group"
import { FLOW_MAIN, FlowHeader } from "@/components/layout/flow-header"
import { EMPTY_STATE } from "@/components/layout/page"
import { getLevel, getSchool } from "@/components/wizard/constants"
import { getVisibleGroups } from "@/queries/groups"
import type { VisibleGroup } from "@/queries/types"
import {
  cohortLabelText,
  courseCohortFromLabels,
  courseFacetsForLevel,
  courseLabel,
  humanizeSlug,
  levelLabel,
  matchesLabelBranch,
  SITE_LABEL,
  schoolLabel,
} from "@/utils/labels"
import { type MergedGroup, mergeGroupsByTitle } from "@/utils/merge-groups"
import { createStepHref } from "@/utils/step-href"

const stepHref = createStepHref("/groups/didattica")

function GroupCard({ group, secondary }: { group: MergedGroup; secondary?: boolean }) {
  return (
    <CardCourseGroup
      key={group.key}
      groupName={group.title}
      waLink={group.waLink}
      waGroupId={group.waGroupId}
      tgLink={group.tgLink}
      tgGroupId={group.tgGroupId}
      secondary={secondary}
    />
  )
}

function GroupSection({ title, groups }: { title: string; groups: VisibleGroup[] }) {
  const merged = mergeGroupsByTitle(groups)
  if (merged.length === 0) return null

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="typo-title-large md:typo-headline-small text-text-primary">{title}</h2>
        <p className="typo-label-medium shrink-0 rounded-full border border-white/50 bg-background-blur px-3 py-1 text-text-secondary">
          {merged.length} Gruppi
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {merged.map((g) => (
          <GroupCard key={g.key} group={g} />
        ))}
      </div>
    </section>
  )
}

export async function GroupsResult({
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

  const siteGroups = groups.filter((g) => g.labels.includes(SITE_LABEL))
  const schoolGroups = groups.filter((g) => g.labels.includes(schoolLabel(schoolSlug)))
  const levelGroups = groups.filter((g) => g.labels.includes(levelLabel(schoolSlug, level)))
  const mergedSiteGroups = mergeGroupsByTitle(siteGroups)
  const mergedSchoolGroups = mergeGroupsByTitle(schoolGroups)
  const mergedLevelGroups = mergeGroupsByTitle(levelGroups)

  const coursePath = courseLabel(schoolSlug, level, course)
  const courseGroups = groups.filter((g) => matchesLabelBranch(g.labels, coursePath))
  const generalCourseGroups = courseGroups.filter((g) => courseCohortFromLabels(g.labels, coursePath) === null)
  const mergedGeneralCourseGroups = mergeGroupsByTitle(generalCourseGroups)

  const groupsByCohort = new Map<string, VisibleGroup[]>()
  for (const g of courseGroups) {
    const cohort = courseCohortFromLabels(g.labels, coursePath)
    if (cohort === null) continue
    groupsByCohort.set(cohort, [...(groupsByCohort.get(cohort) ?? []), g])
  }
  const cohorts = [...groupsByCohort.keys()].sort()

  const hasAnyGroup =
    mergedSiteGroups.length > 0 ||
    mergedSchoolGroups.length > 0 ||
    mergedLevelGroups.length > 0 ||
    courseGroups.length > 0

  const generalGroups = [
    ...mergedSiteGroups.map((group) => ({ group, secondary: false })),
    ...mergedSchoolGroups.map((group) => ({ group, secondary: false })),
    ...mergedLevelGroups.map((group) => ({ group, secondary: true })),
    ...mergedGeneralCourseGroups.map((group) => ({ group, secondary: true })),
  ]

  return (
    <main className={FLOW_MAIN}>
      <FlowHeader
        title={courseName}
        subtitle={`Laurea ${currentLevel.name}`}
        backHref={stepHref({ school: schoolSlug, level })}
        replaceBack
        closeHref="/groups"
      />

      {/* The general groups (site, school, level, course) sit two per row, as in Figma, instead of squeezing into one */}
      {generalGroups.length > 0 && (
        <div className="grid gap-3 lg:grid-cols-2 lg:gap-4">
          {generalGroups.map(({ group, secondary }) => (
            <GroupCard key={group.key} group={group} secondary={secondary} />
          ))}
        </div>
      )}

      {cohorts.map((cohort) => (
        <GroupSection
          key={cohort}
          title={`Gruppi ${cohortLabelText(cohort)}`}
          groups={groupsByCohort.get(cohort) ?? []}
        />
      ))}

      {!hasAnyGroup && <p className={EMPTY_STATE}>Nessun gruppo disponibile al momento per questo corso.</p>}
    </main>
  )
}
