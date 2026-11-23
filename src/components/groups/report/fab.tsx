import { useLocation } from "@tanstack/react-router"
import { FiFlag } from "react-icons/fi"
import { ButtonIcon } from "@/components/button-icon"
import { FloatingGlass, GLASS_LAYER } from "@/components/glass"
import { ReportFinderDialog } from "@/components/groups/report/finder-dialog"
import { missingLinkTargetFromPath } from "@/utils/missing-link-target"

export function ReportFab() {
  const missingLinkTarget = missingLinkTargetFromPath(useLocation({ select: (location) => location.pathname }))

  return (
    // The glass is around the dialog's trigger, not the trigger itself: the trigger gets a ref from Radix, which would
    // replace the glass's own. It lifts on hover; the press is the button's
    <FloatingGlass
      layer={GLASS_LAYER.chrome}
      interactive
      claimTouch
      className="fixed right-5 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 rounded-full sm:right-8"
    >
      <ReportFinderDialog
        missingLinkTarget={missingLinkTarget}
        trigger={
          <ButtonIcon
            icon={FiFlag}
            variant="tertiary"
            size="icon-lg"
            aria-label="Segnala un gruppo o un link"
            className="touch-manipulation rounded-full bg-transparent hover:bg-white/40"
          />
        }
      />
    </FloatingGlass>
  )
}
