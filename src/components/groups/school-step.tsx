import { CardIcon } from "@/components/card-icon"
import { SCHOOLS } from "@/components/groups/constants"
import { WizardShell } from "@/components/groups/wizard-shell"
import { stepHref } from "../../utils/step-href"

const SCHOOL_ICONS: Record<string, string> = {
  "ingegneria-industriale-informazione": "/icons/ingegneria.png",
  auic: "/icons/architettura.png",
  "ingegneria-civile-ambientale-territoriale": "/icons/civile.png",
  design: "/icons/design.png",
}

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
            icon={SCHOOL_ICONS[school.slug] ?? "/icons/ingegneria.png"}
            href={stepHref({ school: school.slug })}
            hoverEffect
          />
        ))}
      </div>
    </WizardShell>
  )
}
