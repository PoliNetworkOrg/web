import { Glass } from "@/components/glass"
import { cn } from "@/lib/utils"
import type { CardGroupProps } from "./types"

export function CardGroup({ title, description, children, className }: CardGroupProps) {
  return (
    <Glass className={cn("w-full rounded-rectangles border-white/50 bg-background-blur p-12", className)}>
      <h3 className="typo-headline-small sm:typo-headline-medium bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent">
        {title}
      </h3>
      {description && <p className="typo-body-large mt-6 w-full max-w-lg text-text-primary">{description}</p>}
      <div className="mt-12">{children}</div>
    </Glass>
  )
}
