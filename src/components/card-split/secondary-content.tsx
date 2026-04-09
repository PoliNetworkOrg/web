import { cn } from "@/lib/utils"

type CardSplitSecondaryContentProps = {
  textSecondary?: string
  textSecondarySmall?: string
  hasPrimaryContent: boolean
}

export function CardSplitSecondaryContent({
  textSecondary,
  textSecondarySmall,
  hasPrimaryContent,
}: CardSplitSecondaryContentProps) {
  return (
    <div className={cn("flex flex-col gap-1", hasPrimaryContent ? "sm:min-w-fit" : "")}>
      {textSecondary && <p className="typo-headline-small text-text-primary">{textSecondary}</p>}
      {textSecondarySmall && <p className="typo-body-medium text-text-primary">{textSecondarySmall}</p>}
    </div>
  )
}
