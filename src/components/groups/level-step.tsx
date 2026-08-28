import Link from "next/link"
import { notFound } from "next/navigation"
import { FiBook } from "react-icons/fi"
import { CardPathSelection } from "@/components/card-path-selection"
import { getSchool, LEVELS } from "@/components/groups/constants"
import { WizardShell } from "@/components/groups/wizard-shell"
import { stepHref } from "../../utils/step-href"

export function LevelStep({ school: schoolSlug }: { school: string }) {
  const school = getSchool(schoolSlug)
  if (!school) notFound()

  return (
    <WizardShell
      activeStep={1}
      title="A che punto del percorso sei?"
      caption={`Ottimo, ${school.name}!`}
      captionPosition="above"
      backHref={stepHref({})}
    >
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {LEVELS.map((level) => (
          <Link key={level.slug} href={stepHref({ school: schoolSlug, level: level.slug })} className="block">
            <CardPathSelection caption={level.name} className="w-full" icon={FiBook} />
          </Link>
        ))}
      </div>
    </WizardShell>
  )
}
