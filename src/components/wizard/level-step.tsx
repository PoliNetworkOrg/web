import Link from "next/link"
import { notFound } from "next/navigation"
import { FiBook } from "react-icons/fi"
import { CardPathSelection } from "@/components/card-path-selection"
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
  if (!school) notFound()

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
              className={cn("block", isLastOdd && "md:col-span-2")}
            >
              <CardPathSelection caption={level.name} className="w-full" icon={FiBook} />
            </Link>
          )
        })}
      </div>
    </WizardShell>
  )
}
