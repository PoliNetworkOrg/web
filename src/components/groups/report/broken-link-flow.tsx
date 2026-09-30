import { GroupSearch, type SearchGroup } from "@/components/home/group-search"
import { DialogDescription, DialogHeader } from "@/components/ui/dialog"
import type { BrokenGroupLinkReportInput } from "@/queries/types"

export function ReportBrokenLinkFlow({
  onBack,
  onSelect,
}: {
  onBack: () => void
  onSelect: (report: BrokenGroupLinkReportInput, groupName: string) => void
}) {
  function selectGroup(group: SearchGroup) {
    onSelect(
      {
        groupId: group.telegramId,
        type: group.type,
        reportType: "broken_link",
        reportedLink: group.link,
      },
      group.title
    )
  }

  return (
    <>
      <DialogHeader title="Segnala link non funzionante" onBack={onBack}>
        <DialogDescription>Cerca il gruppo a cui si riferisce la segnalazione.</DialogDescription>
      </DialogHeader>
      <GroupSearch onSelect={selectGroup} />
    </>
  )
}
