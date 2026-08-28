import type { IconType } from "react-icons"
import { FiBox, FiFeather, FiPenTool } from "react-icons/fi"
import { CardIcon } from "@/components/card-icon"
import { SCHOOLS } from "@/components/groups/constants"
import { WizardShell } from "@/components/groups/wizard-shell"
import { stepHref } from "./step-href"

const SCHOOL_ICONS: Record<string, IconType> = {
  architettura: FiPenTool,
  design: FiFeather,
  ingegneria: FiBox,
}

export function SchoolStep() {
  return (
    <WizardShell
      activeStep={0}
      title="Seleziona la tua Scuola"
      caption="Troviamo il tuo gruppo partendo dalla base!"
      backHref="/groups"
    >
      <div className="grid gap-4 md:grid-cols-3 md:gap-12.5">
        {SCHOOLS.map((school) => (
          <CardIcon
            key={school.slug}
            title={school.name}
            icon={SCHOOL_ICONS[school.slug] ?? FiPenTool}
            href={stepHref({ school: school.slug })}
            hoverEffect
          />
        ))}
      </div>
    </WizardShell>
  )
}
