import type { ReactNode } from "react"
import { WizardFrame } from "@/components/wizard/wizard-frame"

/** school / level / course is the guides of the course, outside the card */
export default function CorsoLayout({ children }: { children: ReactNode }) {
  return <WizardFrame depth={3}>{children}</WizardFrame>
}
