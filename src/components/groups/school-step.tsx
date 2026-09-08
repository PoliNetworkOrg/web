import { CardIcon } from "@/components/card-icon"
import { DEFAULT_SCHOOL_ICON, SCHOOL_ICONS, SCHOOLS } from "@/components/groups/constants"
import { WizardShell } from "@/components/groups/wizard-shell"
import { stepHref } from "../../utils/step-href"

export function SchoolStep() {
  return (
    <WizardShell
      activeStep={0}
      title="Seleziona la tua Scuola"
      caption="Troviamo il tuo gruppo partendo dalla base!"
      backHref="/groups"
    >
      <div className="grid gap-4 md:grid-cols-2 md:gap-12.5">
        {SCHOOLS.map((school) => (
          <CardIcon
            key={school.slug}
            title={school.name}
            icon={SCHOOL_ICONS[school.slug] ?? DEFAULT_SCHOOL_ICON}
            href={stepHref({ school: school.slug })}
            hoverEffect
          />
        ))}
      </div>
    </WizardShell>
  )
}
