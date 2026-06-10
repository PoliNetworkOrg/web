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
        "inline-flex w-67 overflow-hidden rounded-rectangles border-white/50 bg-background-blur p-0 text-card-foreground md:w-full md:max-w-full",
        className
      )}
    >
      <div className="flex w-full items-center justify-center gap-10 px-6 py-5 md:px-10">
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
