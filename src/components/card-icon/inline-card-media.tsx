import Image from "next/image"
import { cn } from "@/lib/utils"
import type { GradientIconType } from "../gradient-icon"
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
        <Image
          src={icon}
          alt=""
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
