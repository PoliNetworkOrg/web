import Link from "next/link"
import { notFound } from "next/navigation"
import { FiArrowLeft, FiX } from "react-icons/fi"
import { CardCourseGroup } from "@/components/card-course-group"
import { getLevel, getSchool } from "@/components/groups/constants"
import { getVisibleGroups, type VisibleGroup } from "@/queries/groups"
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
import { mergeGroupsByTitle } from "@/utils/merge-groups"
import { stepHref } from "../../utils/step-href"

function GroupSection({ title, groups }: { title: string; groups: VisibleGroup[] }) {
  const merged = mergeGroupsByTitle(groups)
  if (merged.length === 0) return null

  return (
    <div className="flex flex-col gap-4 md:mt-16.25 md:gap-0">
      <div className="relative flex items-center justify-center md:static md:justify-between">
        <p className="typo-body-large md:typo-headline-small text-center text-text-primary md:text-left">{title}</p>
        <p className="typo-label-small md:typo-label-medium -translate-y-1/2 absolute top-1/2 right-0 rounded-full border border-white/50 bg-background-blur px-3 py-1 text-text-secondary md:static md:translate-y-0 md:rounded-buttonsM md:border-0 md:py-2">
          {merged.length} Gruppi
        </p>
      </div>
      <div className="flex flex-col gap-3 md:mt-6.75">
        {merged.map((g) => (
          <CardCourseGroup key={g.key} groupName={g.title} waLink={g.waLink} tgLink={g.tgLink} />
        ))}
      </div>
    </div>
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

  return (
    <main className="mx-auto flex min-h-svh w-full min-w-0 max-w-7xl flex-col gap-8 px-6 py-52 md:gap-0">
      <header className="relative flex flex-col items-center gap-1 md:static md:flex-row md:items-center md:gap-4">
        <Link
          href={stepHref({ school: schoolSlug, level })}
          replace
          aria-label="Indietro"
          className="absolute top-0 left-0 grid size-10 shrink-0 place-items-center rounded-full bg-white/60 md:static"
        >
          <FiArrowLeft className="size-5" />
        </Link>
        <div className="flex min-w-0 flex-col items-center gap-1 text-center md:flex-1">
          <h1 className="typo-title-large md:typo-display-medium text-text-primary">{courseName}</h1>
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

      {(mergedSiteGroups.length > 0 ||
        mergedSchoolGroups.length > 0 ||
        mergedLevelGroups.length > 0 ||
        mergedGeneralCourseGroups.length > 0) && (
        <div className="flex flex-row flex-wrap gap-3 md:mt-25.75">
          {mergedSiteGroups.map((g) => (
            <CardCourseGroup key={g.key} groupName={g.title} waLink={g.waLink} tgLink={g.tgLink} stacked />
          ))}
          {mergedSchoolGroups.map((g) => (
            <CardCourseGroup key={g.key} groupName={g.title} waLink={g.waLink} tgLink={g.tgLink} stacked />
          ))}
          {mergedLevelGroups.map((g) => (
            <CardCourseGroup key={g.key} groupName={g.title} waLink={g.waLink} tgLink={g.tgLink} secondary stacked />
          ))}
          {mergedGeneralCourseGroups.map((g) => (
            <CardCourseGroup key={g.key} groupName={g.title} waLink={g.waLink} tgLink={g.tgLink} secondary stacked />
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

      {!hasAnyGroup && (
        <p className="typo-body-medium text-center text-text-secondary md:mt-16.25">
          Nessun gruppo disponibile al momento per questo corso.
        </p>
      )}
    </main>
  )
}
