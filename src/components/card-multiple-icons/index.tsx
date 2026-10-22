import * as React from "react"
import { Glass } from "@/components/glass"
import { cn } from "@/lib/utils"
import type { CardMultipleIconsProps } from "./types"

export function CardMultipleIcons({ icons, className }: CardMultipleIconsProps) {
  const iconItems = React.Children.toArray(icons)

  return (
    <Glass
      className={cn(
        "inline-flex h-12 max-w-full items-center overflow-hidden rounded-full border-white/50 bg-background-blur p-0 text-card-foreground",
        className
      )}
    >
      {/* Figma "glass-icone": 48px tall, icons 34px from the edges and evenly spread */}
      <div className="flex flex-wrap items-center gap-5.5 px-8.5">
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
