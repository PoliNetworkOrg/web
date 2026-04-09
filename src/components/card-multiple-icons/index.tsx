import * as React from "react"
import { Glass } from "@/components/glass"
import { cn } from "@/lib/utils"
import type { CardMultipleIconsProps } from "./types"

export function CardMultipleIcons({ icons, className }: CardMultipleIconsProps) {
  const iconItems = React.Children.toArray(icons)

  return (
    <Glass
      className={cn(
        "inline-flex max-w-full overflow-hidden rounded-rectangles border-white/50 bg-background-blur p-0 text-card-foreground",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-6 px-6 py-3">
        {iconItems.map((icon) => (
          <span
            key={typeof icon === "object" && icon !== null && "key" in icon ? icon.key : undefined}
            className="flex shrink-0 items-center justify-center text-2xl text-text-primary"
          >
            {icon}
          </span>
        ))}
      </div>
    </Glass>
  )
}
