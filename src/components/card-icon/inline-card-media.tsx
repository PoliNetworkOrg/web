import { cn } from "@/lib/utils"
import type { GradientIconType } from "../gradient-icon"
import { CardMediaImage } from "./card-media-image"
import type { ResponsiveCardSize } from "./types"
import { getIconSizeClasses, getInlineContainerClasses } from "./utils"

export function InlineCardMedia({ icon, size }: { icon: GradientIconType | string; size: ResponsiveCardSize }) {
  const wrapperClassName = cn(
    "flex shrink-0 items-center justify-center rounded-lg bg-blue-tertiary",
    getInlineContainerClasses(size)
  )

  if (typeof icon === "string") {
    return (
      <div className={wrapperClassName}>
        <CardMediaImage
          src={icon}
          width={24}
          height={24}
          className={cn(getIconSizeClasses("inline"), "object-contain")}
        />
      </div>
    )
  }

  const Icon = icon
  return (
    <div className={wrapperClassName}>
      <Icon className={cn(getIconSizeClasses("inline"), "text-text-primary")} />
    </div>
  )
}
