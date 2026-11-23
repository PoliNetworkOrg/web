import type { ReactNode } from "react"
import { WizardFrame } from "@/components/wizard/wizard-frame"

/** school / level / course is the results page, outside the card */
export default function DidatticaLayout({ children }: { children: ReactNode }) {
  return <WizardFrame depth={3}>{children}</WizardFrame>
}
