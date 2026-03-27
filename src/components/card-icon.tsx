import { cn } from "@/lib/utils"
import { Glass } from "./glass"
import { GradientIcon, type GradientIconType } from "./gradient-icon"
import { Shape } from "./shapes"

type CardIconType = GradientIconType
type CardSize = "sm" | "md" | "lg"

type SharedCardProps = {
  title: string
  icon: CardIconType
  size?: CardSize
  href?: string
  hoverEffect?: boolean
  className?: string
}

type CardWithDescriptionProps = SharedCardProps & {
  description: string
}

type CardIconProps = SharedCardProps | CardWithDescriptionProps

function getIconSizeClasses(size: CardSize) {
  if (size === "sm") return "h-14 w-14"
  if (size === "lg") return "h-44 w-44"
  return "h-32 w-32"
}

function getCardPaddingClasses(size: CardSize, hasDescription: boolean) {
  if (!hasDescription && size === "sm") return "px-8 py-4"
  return "p-8"
}

function getContentGapClasses(size: CardSize) {
  if (size === "sm") return "gap-2"
  return "gap-6"
}

function CardHoverBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
      <Shape variant="big-teal" className="-top-16 -right-20 absolute h-40 w-40" />
      <Shape variant="big-teal" className="-bottom-21 -left-2 absolute h-70 w-70" />
      <div className="-top-36 -left-32 absolute h-168 w-2xl">
        <div className="-rotate-70 relative h-full w-full origin-center">
          <Shape variant="looper" className="absolute inset-0 h-full w-full object-contain" />
        </div>
      </div>
    </div>
  )
}

function BasicCardMedia({ title, icon: Icon, size }: { title: string; icon: CardIconType; size: CardSize }) {
  return <GradientIcon title={title} icon={Icon} className={getIconSizeClasses(size)} />
}

function DescriptionCardMedia({ title, icon: Icon, size }: { title: string; icon: CardIconType; size: CardSize }) {
  return (
    <div className={cn("relative", getIconSizeClasses(size))}>
      <GradientIcon title={title} icon={Icon} className="h-full w-full" />
    </div>
  )
}

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
              <DescriptionCardMedia title={title} icon={icon} size={size} />
            ) : (
              <BasicCardMedia title={title} icon={icon} size={size} />
            )}
          </div>

          <div className={cn("flex flex-col", isDescriptionCard ? "gap-2 text-left" : "items-center text-center")}>
            <h3
              className={cn(
                "typo-headline-medium bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent",
                isDescriptionCard ? "text-left" : "text-center"
              )}
            >
              {title}
            </h3>
            {description ? (
              <p className="typo-body-medium max-w-sm text-left text-text-primary">{description}</p>
            ) : null}
          </div>
        </div>
      </Root>
    </Glass>
  )
}
