import { cn } from "@/lib/utils"
import type { GradientIconType } from "../gradient-icon"
import type { ResponsiveCardSize } from "./types"
import { getIconSizeClasses, getInlineContainerClasses } from "./utils"

export function InlineCardMedia({ icon: Icon, size }: { icon: GradientIconType; size: ResponsiveCardSize }) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg bg-blue-tertiary",
        getInlineContainerClasses(size)
      )}
    >
      <Icon className={cn(getIconSizeClasses("inline"), "text-text-primary")} />
    </div>
  )
}
