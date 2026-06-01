import { Glass } from "@/components/glass"
import { cn } from "@/lib/utils"
import { BasicCardMedia } from "./basic-card-media"
import { DescriptionCardMedia } from "./description-card-media"
import { CardHoverBackground } from "./hover-background"
import type { CardIconProps } from "./types"
import { getCardPaddingClasses, getContentGapClasses, getTitleSizeClasses } from "./utils"

export function CardIcon(props: CardIconProps) {
  const { title, icon, size = "md", href, hoverEffect = false, align = "center", className } = props
  const description = "description" in props ? props.description : undefined
  const Root = href ? "a" : "div"
  const isDescriptionCard = Boolean(description)
  const isStartAligned = align === "start"
  const isCompactDescriptionCard = isDescriptionCard && size === "compact"
  const contentAlignmentClass = isDescriptionCard
    ? isStartAligned
      ? "items-start justify-start text-left"
      : "justify-between"
    : isStartAligned
      ? "items-start justify-center text-left"
      : "items-center justify-center text-center"
  const textAlignmentClass = isDescriptionCard
    ? isStartAligned
      ? "items-start gap-5 text-left"
      : "gap-2 text-left"
    : isStartAligned
      ? "items-start text-left"
      : "items-center text-center"

  return (
    <Glass
      className={cn(
        "w-full overflow-hidden rounded-rectangles border-white/50 bg-background-blur p-0 text-card-foreground",
        className
      )}
    >
      <Root
        href={href}
        className={cn(
          "group/card relative flex h-full flex-col text-left",
          getCardPaddingClasses(size, isDescriptionCard)
        )}
      >
        {hoverEffect && <CardHoverBackground />}

        <div
          className={cn("relative z-10 flex h-full flex-1 flex-col", getContentGapClasses(size), contentAlignmentClass)}
        >
          <div className={cn("flex", isStartAligned ? "justify-start" : "justify-center")}>
            {isDescriptionCard ? (
              <DescriptionCardMedia icon={icon} size={size} />
            ) : (
              <BasicCardMedia icon={icon} size={size} />
            )}
          </div>

          <div className={cn("flex flex-col", textAlignmentClass)}>
            <h3
              className={cn(
                getTitleSizeClasses(size),
                "bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent",
                isDescriptionCard || isStartAligned ? "text-left" : "text-center"
              )}
            >
              {title}
            </h3>
            {description && (
              <p
                className={cn(
                  "text-left text-text-primary",
                  isCompactDescriptionCard ? "typo-body-large max-w-60" : "typo-body-medium max-w-sm"
                )}
              >
                {description}
              </p>
            )}
          </div>
        </div>
      </Root>
    </Glass>
  )
}
