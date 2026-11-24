import type { ReactNode } from "react"
import { WizardFrame } from "@/components/wizard/wizard-frame"

/** Every step, the groups of the course (school / level / course) included, is shown in the same card */
export default function DidatticaLayout({ children }: { children: ReactNode }) {
  return <WizardFrame depth={4}>{children}</WizardFrame>
}
