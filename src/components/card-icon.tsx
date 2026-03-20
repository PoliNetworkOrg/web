import { ArrowRight } from "lucide-react"
import Image from "next/image"
import type { ComponentType, ReactNode } from "react"
import type { IconType } from "react-icons"
import { cn } from "@/lib/utils"
import { Glass } from "./glass"

const bigTealShape = "/images/cards/big-teal-shape.png"
const looper = "/images/cards/looper.png"

type CardIconProps = {
  title: string
  description?: string
  icon?: IconType | ComponentType<{ className?: string }>
  imageSrc?: string
  imageAlt?: string
  media?: ReactNode
  size?: "default" | "compact"
  href?: string
  backgroundSrc?: string
  backgroundAlt?: string
  showArrow?: boolean
  hoverEffect?: boolean
  actionVariant?: "default" | "highlight"
  className?: string
  contentClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  mediaClassName?: string
}

export function CardIcon({
  title,
  description,
  icon: Icon,
  imageSrc,
  imageAlt,
  media,
  size,
  href,
  backgroundSrc,
  backgroundAlt,
  showArrow = false,
  hoverEffect = false,
  actionVariant = "default",
  className,
  contentClassName,
  titleClassName,
  descriptionClassName,
  mediaClassName,
}: CardIconProps) {
  const resolvedSize = size ?? (description ? "default" : "compact")
  const hasDescription = Boolean(description)
  const MediaIcon = Icon
  const Root = href ? "a" : "div"

  return (
    <Glass
      className={cn(
        "text-card-foreground overflow-hidden p-0",
        resolvedSize === "compact"
          ? "rounded-rectangles border-white/50 bg-background-blur backdrop-blur-md"
          : "rounded-4xl border-white/50 bg-background-blur backdrop-blur-md",
        className
      )}
    >
      <Root
        href={href}
        className={cn(
          "group/card relative flex h-full flex-col",
          resolvedSize === "compact" ? "min-h-72 justify-between gap-6 p-8 text-left" : "min-h-96 gap-8 px-6 py-6"
        )}
      >
        {backgroundSrc && (
          <Image
            src={backgroundSrc}
            alt={backgroundAlt ?? ""}
            fill
            sizes="100vw"
            aria-hidden={backgroundAlt ? undefined : true}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
        )}

        {resolvedSize === "compact" && hoverEffect && (
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
            <Image
              src={bigTealShape}
              alt=""
              aria-hidden="true"
              width={160}
              height={160}
              className="absolute -top-16 -right-20 h-40 w-40"
            />
            <Image
              src={bigTealShape}
              alt=""
              aria-hidden="true"
              width={279}
              height={279}
              className="absolute -bottom-20.75 -left-2.25 h-69.75 w-69.75"
            />

            <div className="absolute -top-36 -left-32 h-168 w-2xl">
              <div className="relative h-full w-full origin-center -rotate-70">
                <Image
                  src={looper}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="528px"
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        )}

        <div className="relative z-10 flex h-full flex-col">
          {resolvedSize === "compact" ? (
            <>
              <div className="flex items-start">
                <h3
                  className={cn(
                    "typo-headline-medium max-w-44 bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-left text-transparent",
                    titleClassName
                  )}
                >
                  {title}
                </h3>
              </div>

              <div className="mt-auto flex items-end justify-between gap-4">
                <div className={cn("flex flex-1 items-end text-blue-primary", mediaClassName)}>
                  {media}
                  {!media && imageSrc && (
                    <Image
                      src={imageSrc}
                      alt={imageAlt ?? title}
                      width={141}
                      height={125}
                      className="h-36 w-40 shrink-0 object-contain"
                    />
                  )}
                  {!media && !imageSrc && MediaIcon && <MediaIcon className="h-24 w-24" />}
                </div>

                {showArrow && (
                  <div
                    className={cn(
                      "mb-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                      hoverEffect
                        ? "bg-button-disabled group-hover/card:bg-blue-tertiary"
                        : actionVariant === "highlight"
                          ? "bg-blue-tertiary"
                          : "bg-button-disabled"
                    )}
                  >
                    <ArrowRight className="h-6 w-6 text-blue-secondary" strokeWidth={1.8} />
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div
                className={cn(
                  "flex shrink-0 items-start justify-start text-blue-primary",
                  "w-full",
                  mediaClassName
                )}
              >
                {media}
                {!media && imageSrc && (
                  <Image
                    src={imageSrc}
                    alt={imageAlt ?? title}
                    width={128}
                    height={128}
                    className="h-auto max-h-32 max-w-32 object-contain"
                  />
                )}
                {!media && !imageSrc && MediaIcon && <MediaIcon className="h-32 w-32" />}
              </div>

              <div className={cn("flex flex-1 flex-col items-start justify-start gap-4", contentClassName)}>
                <h3
                  className={cn(
                    "typo-headline-medium bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent",
                    titleClassName
                  )}
                >
                  {title}
                </h3>

                {hasDescription && (
                  <p
                    className={cn(
                      "max-w-sm text-left typo-body-medium text-text-primary",
                      descriptionClassName
                    )}
                  >
                    {description}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </Root>
    </Glass>
  )
}
