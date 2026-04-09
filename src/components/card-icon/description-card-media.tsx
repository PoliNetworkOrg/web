import { cn } from "@/lib/utils"
import { GradientIcon, type GradientIconType } from "../gradient-icon"
import type { CardSize } from "./types"
import { getIconSizeClasses } from "./utils"

export function DescriptionCardMedia({ icon: Icon, size }: { icon: GradientIconType; size: CardSize }) {
  return (
    <div className={cn("relative", getIconSizeClasses(size))}>
      <GradientIcon icon={Icon} className="h-full w-full" />
    </div>
  )
}
