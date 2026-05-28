import { cn } from "@/lib/utils"
import { GradientIcon } from "../gradient-icon"
import type { CardGroupProps } from "./types"

export function CardGroupHeader({
  icon,
  title,
  description,
  horizontal,
}: Pick<CardGroupProps, "icon" | "title" | "description" | "horizontal">) {
  return (
    <div className="flex flex-col gap-6">
      {icon && <GradientIcon icon={icon} className="h-14 w-14" />}
      <h3 className="typo-headline-small sm:typo-headline-medium bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent">
        {title}
      </h3>
      {description && (
        <p className={cn("typo-body-large w-full text-text-primary", horizontal ? "max-w-47" : "max-w-lg")}>
          {description}
        </p>
      )}
    </div>
  )
}
