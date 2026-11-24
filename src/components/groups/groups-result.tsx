import { notFound } from "@tanstack/react-router"
import { CardCourseGroup } from "@/components/card-course-group"
import { EMPTY_STATE } from "@/components/layout/page"
import { getLevel, getSchool } from "@/components/wizard/constants"
import { WizardShell } from "@/components/wizard/wizard-shell"
import { cohortLabelText, humanizeSlug } from "@/utils/labels"
import type { MergedGroup } from "@/utils/merge-groups"
import { createStepHref } from "@/utils/step-href"

const stepHref = createStepHref("/gruppi/didattica")

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

function GroupSection({ title, groups: merged }: { title: string; groups: MergedGroup[] }) {
  if (merged.length === 0) return null

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="typo-title-large md:typo-headline-small text-text-primary">{title}</h2>
        <p className="typo-label-medium shrink-0 rounded-full border border-white/50 bg-background-blur px-3 py-1 text-text-secondary">
          {merged.length} {merged.length === 1 ? "gruppo" : "gruppi"}
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

/** The groups of a course as `fetchCourseGroups` returns them: already filtered, merged by title and in order */
type CourseGroups = {
  /** The site, school, level and course groups */
  general: { group: MergedGroup; secondary: boolean }[]
  /** The groups of each cohort ("26-27"), by cohort */
  cohorts: { cohort: string; groups: MergedGroup[] }[]
  hasAnyGroup: boolean
}

export function GroupsResult({
  school: schoolSlug,
  level,
  course,
  groups: { general: generalGroups, cohorts, hasAnyGroup },
}: {
  school: string
  level: string
  course: string
  groups: CourseGroups
}) {
  const school = getSchool(schoolSlug)
  const currentLevel = getLevel(schoolSlug, level)
  // The route's loader has already answered 404 for an unknown school, level or course
  if (!school || !currentLevel) throw notFound()

  const courseName = humanizeSlug(course)

  // The last step of the wizard: shown in its card, with every step done
  return (
    <WizardShell
      activeStep={3}
      title={courseName}
      caption={`Laurea ${currentLevel.name}`}
      captionPosition="above"
      backHref={stepHref({ school: schoolSlug, level })}
      closeHref="/gruppi"
    >
      <div className="flex flex-col gap-12 md:gap-16">
        {/* The site, school, level and course groups */}
        {generalGroups.length > 0 && (
          <section aria-labelledby="gruppi-generali" className="grid gap-3 lg:grid-cols-2 lg:gap-4">
            <h2 id="gruppi-generali" className="sr-only">
              Gruppi generali
            </h2>
            {generalGroups.map(({ group, secondary }) => (
              <GroupCard key={group.key} group={group} secondary={secondary} />
            ))}
          </section>
        )}

        {cohorts.map(({ cohort, groups }) => (
          <GroupSection key={cohort} title={`Gruppi ${cohortLabelText(cohort)}`} groups={groups} />
        ))}

        {!hasAnyGroup && <p className={EMPTY_STATE}>Nessun gruppo disponibile al momento per questo corso.</p>}
      </div>
    </WizardShell>
  )
}
