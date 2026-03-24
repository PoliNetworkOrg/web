import { ArrowRight } from "lucide-react"
import Image, { type StaticImageData } from "next/image"
import type { ComponentType } from "react"
import type { IconType } from "react-icons"
import { cn } from "@/lib/utils"
import { Glass } from "./glass"
import { Shape } from "./shapes"

type SchoolCardVariant = "school-side" | "school-stacked"

type SchoolCardProps = {
  variant: SchoolCardVariant
  title: string
  imageSrc?: StaticImageData
  icon?: IconType | ComponentType<{ className?: string }>
  href?: string
  showArrow?: boolean
  hoverEffect?: boolean
  className?: string
}

type MaterialCardProps = {
  variant: "material"
  title: string
  description: string
  icon: IconType | ComponentType<{ className?: string }>
  className?: string
}

type CardIconProps = SchoolCardProps | MaterialCardProps

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

function CardArrow({ stacked, hoverEffect }: { stacked: boolean; hoverEffect: boolean }) {
  return (
    <div
      className={cn(
        "flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-all duration-300",
        stacked ? "absolute right-0 bottom-1" : "mb-1",
        hoverEffect ? "bg-button-disabled group-hover/card:bg-blue-tertiary" : "bg-button-disabled"
      )}
    >
      <ArrowRight className="h-6 w-6 text-blue-secondary" strokeWidth={1.8} />
    </div>
  )
}

function SchoolMedia({
  title,
  imageSrc,
  icon: Icon,
  stacked,
}: {
  title: string
  imageSrc?: StaticImageData
  icon?: IconType | ComponentType<{ className?: string }>
  stacked: boolean
}) {
  if (imageSrc) {
    return (
      <Image
        src={imageSrc}
        alt={title}
        width={141}
        height={125}
        className={cn("shrink-0 object-contain", stacked ? "h-44 w-44" : "h-36 w-40")}
      />
    )
  }

  if (!Icon) return null

  return <Icon className={cn(stacked ? "h-28 w-28" : "h-24 w-24")} />
}

function MaterialMedia({
  title,
  icon: Icon,
}: {
  title: string
  icon: IconType | ComponentType<{ className?: string }>
}) {
  return <Icon className="h-32 w-32" aria-label={title} />
}

export function CardIcon(props: CardIconProps) {
  if (props.variant === "material") {
    const { title, description, icon: Icon, className } = props

    return (
      <Glass className={cn("rounded-4xl border-white/50 bg-background-blur px-6 py-8 text-card-foreground", className)}>
        <div className="flex min-h-96 flex-col gap-8">
          <div className="mb-4 flex w-full shrink-0 items-start justify-start text-blue-primary">
            <MaterialMedia title={title} icon={Icon} />
          </div>

          <div className="flex flex-1 flex-col items-start justify-start gap-4">
            <h3 className="typo-headline-medium bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-left text-transparent">
              {title}
            </h3>
            <p className="typo-body-medium max-w-sm text-left text-text-primary">{description}</p>
          </div>
        </div>
      </Glass>
    )
  }

  const { variant, title, imageSrc, icon, href, showArrow = false, hoverEffect = false, className } = props
  const stacked = variant === "school-stacked"
  const Root = href ? "a" : "div"

  return (
    <Glass className={cn("rounded-rectangles border-white/50 bg-background-blur p-0 text-card-foreground", className)}>
      <Root
        href={href}
        className="group/card relative flex h-full min-h-72 flex-col justify-between gap-6 p-8 text-left"
      >
        {hoverEffect && <CardHoverBackground />}

        <div className="relative z-10 flex h-full flex-col">
          {stacked ? (
            <div className="relative flex flex-1 flex-col items-center justify-center gap-6 text-center">
              <div className="flex justify-center text-blue-primary">
                <SchoolMedia title={title} imageSrc={imageSrc} icon={icon} stacked />
              </div>
              <h3 className="typo-headline-medium max-w-44 bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-center text-transparent">
                {title}
              </h3>
              {showArrow && <CardArrow stacked hoverEffect={hoverEffect} />}
            </div>
          ) : (
            <>
              <div className="flex items-start">
                <h3 className="typo-headline-medium max-w-44 bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-left text-transparent">
                  {title}
                </h3>
              </div>

              <div className="mt-auto flex items-end justify-between gap-4">
                <div className="flex flex-1 items-end text-blue-primary">
                  <SchoolMedia title={title} imageSrc={imageSrc} icon={icon} stacked={false} />
                </div>
                {showArrow && <CardArrow stacked={false} hoverEffect={hoverEffect} />}
              </div>
            </>
          )}
        </div>
      </Root>
    </Glass>
  )
}
