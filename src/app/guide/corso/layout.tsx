import type { ReactNode } from "react"
import { WizardFrame } from "@/components/wizard/wizard-frame"

/** Every step, the guides of the course (school / level / course) included, is shown in the same card */
export default function CorsoLayout({ children }: { children: ReactNode }) {
  return <WizardFrame depth={4}>{children}</WizardFrame>
}
