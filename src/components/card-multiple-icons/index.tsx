import * as React from "react"
import { cn } from "@/lib/utils"
import type { CardMultipleIconsProps } from "./types"

export function CardMultipleIcons({ icons, className }: CardMultipleIconsProps) {
  const iconItems = React.Children.toArray(icons)

  return (
    // A plain light surface, not glass: it sits on the footer's glass panel
    <div
      className={cn(
        "inline-flex max-w-full items-center overflow-hidden rounded-full border border-white/70 bg-white/40 text-card-foreground",
        className
      )}
    >
      <div className="flex items-center justify-center p-1 sm:gap-3 sm:px-5">
        {iconItems.map((icon) => (
          <span
            key={typeof icon === "object" && icon !== null && "key" in icon ? icon.key : undefined}
            className="flex shrink-0 items-center justify-center text-2xl text-text-primary"
          >
            {icon}
          </span>
        ))}
      </div>
    </div>
  )
}
