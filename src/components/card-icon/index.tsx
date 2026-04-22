import { Glass } from "@/components/glass"
import { cn } from "@/lib/utils"
import { BasicCardMedia } from "./basic-card-media"
import { DescriptionCardMedia } from "./description-card-media"
import { CardHoverBackground } from "./hover-background"
import type { CardIconProps } from "./types"
import { getCardPaddingClasses, getContentGapClasses, getTitleSizeClasses } from "./utils"

export function CardIcon(props: CardIconProps) {
  const { title, icon, size = "md", href, hoverEffect = false, className } = props
  const description = "description" in props ? props.description : undefined
  const Root = href ? "a" : "div"
  const isDescriptionCard = Boolean(description)

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
          className={cn(
            "relative z-10 flex h-full flex-1 flex-col",
            getContentGapClasses(size),
            isDescriptionCard ? "justify-between" : "items-center justify-center text-center"
          )}
        >
          <div className="flex justify-center">
            {isDescriptionCard ? (
              <DescriptionCardMedia icon={icon} size={size} />
            ) : (
              <BasicCardMedia icon={icon} size={size} />
            )}
          </div>

          <div className={cn("flex flex-col", isDescriptionCard ? "gap-2 text-left" : "items-center text-center")}>
            <h3
              className={cn(
                getTitleSizeClasses(size),
                "bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent",
                isDescriptionCard ? "text-left" : "text-center"
              )}
            >
              {title}
            </h3>
            {description && <p className="typo-body-medium max-w-sm text-left text-text-primary">{description}</p>}
          </div>
        </div>
      </Root>
    </Glass>
  )
}
