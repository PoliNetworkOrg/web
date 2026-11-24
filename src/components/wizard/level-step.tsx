import { notFound } from "@tanstack/react-router"
import { CardPathSelection } from "@/components/card-path-selection"
import { Link } from "@/components/link"
import { getLevelsForSchool, getSchool } from "@/components/wizard/constants"
import { WizardShell } from "@/components/wizard/wizard-shell"
import { cn } from "@/lib/utils"
import type { StepHrefBuilder } from "@/utils/step-href"

export function LevelStep({
  school: schoolSlug,
  landingHref,
  stepHref,
}: {
  school: string
  landingHref: string
  stepHref: StepHrefBuilder
}) {
  const school = getSchool(schoolSlug)
  // The route's loader has already answered 404 for an unknown school
  if (!school) throw notFound()

  const levels = getLevelsForSchool(schoolSlug)

  return (
    <WizardShell
      activeStep={1}
      title="A che punto del percorso sei?"
      caption={`Ottimo, ${school.name}!`}
      captionPosition="above"
      backHref={stepHref({})}
      closeHref={landingHref}
    >
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {levels.map((level, index) => {
          const isLastOdd = levels.length % 2 !== 0 && index === levels.length - 1
          return (
            <Link
              key={level.slug}
              href={stepHref({ school: schoolSlug, level: level.slug })}
              className={cn(
                // Pressed, the card shrinks a little like the site's other clickable cards
                "press-feedback block rounded-rectangles outline-none focus-visible:ring-2 focus-visible:ring-blue-secondary",
                isLastOdd && "md:col-span-2"
              )}
            >
              <CardPathSelection caption={level.name} className="w-full" icon={level.icon} />
            </Link>
          )
        })}
      </div>
    </WizardShell>
  )
}
