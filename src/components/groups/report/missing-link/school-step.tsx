import { DEFAULT_SCHOOL_ICON, SCHOOL_ICONS, SCHOOLS } from "@/components/groups/constants"
import { SelectableCardIcon } from "@/components/groups/report/selectable-card-icon"
import { DialogDescription, DialogHeader } from "@/components/ui/dialog"

export function SchoolStep({ onBack, onSelect }: { onBack: () => void; onSelect: (schoolSlug: string) => void }) {
  return (
    <>
      <DialogHeader title="Segnala link mancante" onBack={onBack}>
        <DialogDescription>Da quale Scuola vuoi partire?</DialogDescription>
      </DialogHeader>
      <div className="grid gap-3 sm:grid-cols-2">
        {SCHOOLS.map((item) => (
          <SelectableCardIcon
            key={item.slug}
            title={item.name}
            icon={SCHOOL_ICONS[item.slug] ?? DEFAULT_SCHOOL_ICON}
            onClick={() => onSelect(item.slug)}
          />
        ))}
      </div>
    </>
  )
}
