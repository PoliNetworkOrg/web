import { createFileRoute, Outlet } from "@tanstack/react-router"
import { WizardFrame } from "@/components/wizard/wizard-frame"

export const Route = createFileRoute("/gruppi/didattica")({
  component: DidatticaLayout,
})

/** Every step, the groups of the course (school / level / course) included, is shown in the same card */
function DidatticaLayout() {
  return (
    <WizardFrame depth={4}>
      <Outlet />
    </WizardFrame>
  )
}
