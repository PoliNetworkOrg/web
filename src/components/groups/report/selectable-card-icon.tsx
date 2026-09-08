import { CardIcon } from "@/components/card-icon"
import type { GradientIconType } from "@/components/gradient-icon"

export function SelectableCardIcon({
  title,
  icon,
  onClick,
}: {
  title: string
  icon: GradientIconType | string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className="rounded-rectangles text-left focus-visible:ring-2 focus-visible:ring-blue-primary"
      onClick={onClick}
    >
      <CardIcon title={title} icon={icon} size="xs" hoverEffect className="h-full min-h-30" />
    </button>
  )
}
