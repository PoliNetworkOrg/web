import Link from "next/link"
import { notFound } from "next/navigation"
import { FiBook } from "react-icons/fi"
import { CardPathSelection } from "@/components/card-path-selection"
import { getFaculty, LEVELS } from "@/components/groups/constants"
import { WizardShell } from "@/components/groups/wizard-shell"
import { stepHref } from "./step-href"

export function LevelStep({ school }: { school: string }) {
  const faculty = getFaculty(school)
  if (!faculty) notFound()

  return (
    <WizardShell
      activeStep={1}
      title="A che punto del percorso sei?"
      caption={`Ottimo, ${faculty.name}!`}
      captionPosition="above"
      backHref={stepHref({})}
    >
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {LEVELS.map((level) => (
          <Link key={level.slug} href={stepHref({ school, level: level.slug })} className="block">
            <CardPathSelection caption={level.name} className="w-full" icon={FiBook} />
          </Link>
        ))}
      </div>
    </WizardShell>
  )
}
