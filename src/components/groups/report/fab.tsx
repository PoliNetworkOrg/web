"use client"

import { FiFlag } from "react-icons/fi"
import { ButtonIcon } from "@/components/button-icon"
import { ReportFinderDialog } from "@/components/groups/report/finder-dialog"

export function ReportFab() {
  return (
    <ReportFinderDialog
      trigger={
        <ButtonIcon
          icon={FiFlag}
          variant="tertiary"
          size="icon-lg"
          aria-label="Segnala un gruppo o un link"
          className="fixed right-5 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 touch-manipulation rounded-full shadow-lg sm:right-8"
        />
      }
    />
  )
}
