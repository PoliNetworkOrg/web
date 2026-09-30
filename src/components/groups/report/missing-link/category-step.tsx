import { FiBook, FiStar } from "react-icons/fi"
import { SelectableCardIcon } from "@/components/groups/report/selectable-card-icon"
import { DialogDescription, DialogHeader } from "@/components/ui/dialog"
import type { ReportMissingLinkCategory } from "./types"

export function CategoryStep({
  onBack,
  onSelect,
}: {
  onBack: () => void
  onSelect: (category: ReportMissingLinkCategory) => void
}) {
  return (
    <>
      <DialogHeader title="Segnala link mancante" onBack={onBack}>
        <DialogDescription>Che tipo di gruppo manca?</DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-3">
        <SelectableCardIcon title="Didattica" icon={FiBook} onClick={() => onSelect("didattica")} />
        <SelectableCardIcon title="Extra" icon={FiStar} onClick={() => onSelect("extra")} />
      </div>
    </>
  )
}
