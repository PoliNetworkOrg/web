import { Glass } from "@/components/glass"
import { cn } from "@/lib/utils"
import { BasicCardMedia } from "./basic-card-media"
import { DescriptionCardMedia } from "./description-card-media"
import { CardHoverBackground } from "./hover-background"
import { InlineCardMedia } from "./inline-card-media"
import type { CardIconProps } from "./types"
import { getAlignmentClasses, getCardPaddingClasses, getContentGapClasses, getTitleSizeClasses } from "./utils"

export function CardIcon(props: CardIconProps) {
  const { title, icon, size = "md", href, hoverEffect = false, align = "center", className } = props
  const description = "description" in props ? props.description : undefined
  const Root = href ? "a" : "div"
  const isDescriptionCard = Boolean(description)
  const isInlineAligned = align === "inline"
  const isCompactDescriptionCard = isDescriptionCard && size === "compact"
  const { contentClass, textClass, iconWrapClass } = getAlignmentClasses(align, isDescriptionCard)

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

        {isInlineAligned ? (
          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <InlineCardMedia icon={icon} size={size} />
              <h3
                className={cn(
                  getTitleSizeClasses(size),
                  "bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent"
                )}
              >
                {title}
              </h3>
            </div>
            {description && <p className="typo-body-large text-left text-text-primary">{description}</p>}
          </div>
        ) : (
          <div className={cn("relative z-10 flex h-full flex-1 flex-col", getContentGapClasses(size), contentClass)}>
            <div className={cn("flex", iconWrapClass)}>
              {isDescriptionCard ? (
                <DescriptionCardMedia icon={icon} size={size} />
              ) : (
                <BasicCardMedia icon={icon} size={size} />
              )}
            </div>

            <div className={cn("flex flex-col", textClass)}>
              <h3
                className={cn(
                  getTitleSizeClasses(size),
                  "bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent",
                  isDescriptionCard || align === "start" ? "text-left" : "text-center"
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
        )}
      </Root>
    </Glass>
  )
}
