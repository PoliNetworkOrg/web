import { Glass } from "@/components/glass"
import { cn } from "@/lib/utils"
import { CardSplitPrimaryContent } from "./primary-content"
import { CardSplitSecondaryContent } from "./secondary-content"
import type { CardSplitProps } from "./types"

export function CardSplit({ textPrimary, textSecondary, textSecondarySmall, className }: CardSplitProps) {
  const hasPrimaryContent = Boolean(textPrimary)
  const hasSecondaryContent = Boolean(textSecondary || textSecondarySmall)

  return (
    <Glass
      className={cn(
        "inline-flex max-w-full overflow-hidden rounded-rectangles border-white/50 bg-background-blur p-0 text-card-foreground",
        className
      )}
    >
      <div className="flex flex-col gap-10 px-10 py-5 sm:grid sm:grid-cols-[auto_auto] sm:items-center">
        {textPrimary ? <CardSplitPrimaryContent text={textPrimary} /> : null}

        {hasSecondaryContent && (
          <CardSplitSecondaryContent
            textSecondary={textSecondary}
            textSecondarySmall={textSecondarySmall}
            hasPrimaryContent={hasPrimaryContent}
          />
        )}
      </div>
    </Glass>
  )
}
