import { notFound } from "@tanstack/react-router"
import AccordionList from "@/components/accordion-list"
import { COURSE_GUIDES } from "@/components/guides/constants"
import { EMPTY_STATE } from "@/components/layout/page"
import { getLevel, getSchool } from "@/components/wizard/constants"
import { WizardShell } from "@/components/wizard/wizard-shell"
import { humanizeSlug } from "@/utils/labels"
import { createStepHref } from "@/utils/step-href"

const stepHref = createStepHref("/guide/corso")

export function GuidesResult({ school: schoolSlug, level, course }: { school: string; level: string; course: string }) {
  const school = getSchool(schoolSlug)
  const currentLevel = getLevel(schoolSlug, level)
  // The route's loader has already answered 404 for an unknown school, level or course
  if (!school || !currentLevel) throw notFound()

  const courseName = humanizeSlug(course)

  const guides = COURSE_GUIDES[course] ?? []

  // The last step of the wizard: shown in its card, with every step done
  return (
    <WizardShell
      activeStep={3}
      title={courseName}
      caption={`Laurea ${currentLevel.name}`}
      captionPosition="above"
      backHref={stepHref({ school: schoolSlug, level })}
      closeHref="/guide"
    >
      {guides.length > 0 ? (
        <AccordionList items={guides} />
      ) : (
        <p className={EMPTY_STATE}>Nessuna guida disponibile al momento per questo corso.</p>
      )}
    </WizardShell>
  )
}
