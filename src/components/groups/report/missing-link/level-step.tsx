import { CardPathSelection } from "@/components/card-path-selection"
import { getLevelsForSchool } from "@/components/groups/constants"
import { Button } from "@/components/ui/button"
import { DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog"

export function LevelStep({
  schoolName,
  schoolSlug,
  onBack,
  onSelectLevel,
  onSpecifyMissing,
}: {
  schoolName?: string
  schoolSlug: string
  onBack: () => void
  onSelectLevel: (levelSlug: string) => void
  onSpecifyMissing: () => void
}) {
  return (
    <>
      <DialogHeader title="Segnala link mancante" onBack={onBack}>
        <DialogDescription>{schoolName}</DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-3">
        {getLevelsForSchool(schoolSlug).map((item) => (
          <button
            key={item.slug}
            type="button"
            className="rounded-rectangles text-left focus-visible:ring-2 focus-visible:ring-blue-primary"
            onClick={() => onSelectLevel(item.slug)}
          >
            <CardPathSelection caption={item.name} className="w-full px-5 py-4" />
          </button>
        ))}
      </div>
      <DialogFooter>
        <Button variant="primary" onClick={onSpecifyMissing}>
          Specifica il gruppo mancante
        </Button>
      </DialogFooter>
    </>
  )
}
