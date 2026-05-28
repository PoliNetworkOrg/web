import { Glass } from "@/components/glass"
import { cn } from "@/lib/utils"
import { CardGroupHeader } from "./header"
import type { CardGroupProps } from "./types"

export function CardGroup({ icon, title, description, children, horizontal = false, className }: CardGroupProps) {
  return (
    <Glass className={cn("w-full rounded-rectangles border-white/50 bg-background-blur p-12", className)}>
      {horizontal ? (
        <div className="flex flex-col gap-12 md:flex-row md:items-center">
          <CardGroupHeader icon={icon} title={title} description={description} horizontal />
          <div className="flex-1">{children}</div>
        </div>
      ) : (
        <>
          <CardGroupHeader icon={icon} title={title} description={description} />
          <div className="mt-12">{children}</div>
        </>
      )}
    </Glass>
  )
}
