import { Glass } from "@/components/glass"
import { cn } from "@/lib/utils"

type CardSplitProps = {
  textLeft?: string
  textRight?: string
  textSmall?: string
  className?: string
}

export function CardSplit({ textLeft, textRight, textSmall, className }: CardSplitProps) {
  const hasRightContent = Boolean(textRight || textSmall)

  return (
    <Glass
      className={cn(
        "inline-flex max-w-full rounded-rectangles border-white/50 bg-background-blur px-10 py-5 backdrop-blur-xl",
        className
      )}
    >
      <div className="flex flex-col gap-10 sm:grid sm:grid-cols-[auto_auto] sm:items-center">
        {textLeft && (
          <p className="typo-display-medium bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text font-normal text-transparent">
            {textLeft}
          </p>
        )}

        {hasRightContent && (
          <div className={cn("flex flex-col gap-1", textLeft ? "sm:min-w-fit" : "")}>
            {textRight && <p className="typo-headline-small text-text-primary">{textRight}</p>}
            {textSmall && <p className="typo-body-medium text-text-primary">{textSmall}</p>}
          </div>
        )}
      </div>
    </Glass>
  )
}
