import { createFileRoute, Outlet } from "@tanstack/react-router"
import { WizardFrame } from "@/components/wizard/wizard-frame"

export const Route = createFileRoute("/guide/corso")({
  component: CorsoLayout,
})

/** Every step, the guides of the course (school / level / course) included, is shown in the same card */
function CorsoLayout() {
  return (
    <WizardFrame depth={4}>
      <Outlet />
    </WizardFrame>
  )
}
