import type { IconType } from "react-icons"
import { FiBox, FiFeather, FiPenTool } from "react-icons/fi"
import { CardIcon } from "@/components/card-icon"
import { FACULTIES } from "@/components/groups/constants"
import { WizardShell } from "@/components/groups/wizard-shell"
import { stepHref } from "./step-href"

const FACULTY_ICONS: Record<string, IconType> = {
  architettura: FiPenTool,
  design: FiFeather,
  ingegneria: FiBox,
}

export function FacultyStep() {
  return (
    <WizardShell activeStep={0} title="Seleziona la tua facoltà" caption="Troviamo il tuo gruppo partendo dalla base!">
      <div className="grid gap-4 md:grid-cols-3 md:gap-12.5">
        {FACULTIES.map((faculty) => (
          <CardIcon
            key={faculty.slug}
            title={faculty.name}
            icon={FACULTY_ICONS[faculty.slug] ?? FiPenTool}
            href={stepHref({ school: faculty.slug })}
            hoverEffect
          />
        ))}
      </div>
    </WizardShell>
  )
}
