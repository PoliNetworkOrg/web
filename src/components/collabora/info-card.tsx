import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { CardHoverBackground } from "@/components/card-icon/hover-background"
import { Glass } from "@/components/glass"
import { cn } from "@/lib/utils"

export type InfoCardData = {
  title: string
  description: ReactNode
  /** Mobile copy, when the 402px Figma frame uses a shorter text than the desktop one. Figma lets it run 8px into
   * the card padding. */
  mobileDescription?: ReactNode
  icon: StaticImageData
  /** Icon size, offset and mobile gap to the title per breakpoint, as drawn in Figma. */
  iconClassName: string
  /** Desktop description width: Figma wraps these copies at fixed widths (+1px, as Figma rounds text widths down). */
  descriptionClassName?: string
  /** Title size/wrapping overrides, for cards whose titles don't fit the default single line. */
  titleClassName?: string
  /** Makes the whole card a link: only then does it react to hover. */
  href?: string
}

/**
 * Glass card with a Material icon, a gradient title and a description. Desktop (≥ md): icon above the title, as in
 * the 1728px frame. Mobile: icon inline with the title, as in the 402px frame.
 */
export function InfoCard({
  card,
  className,
  descriptionColorClassName = "text-text-primary",
}: {
  card: InfoCardData
  className?: string
  descriptionColorClassName?: string
}) {
  const { title, description, mobileDescription, icon, iconClassName, descriptionClassName, titleClassName, href } =
    card

  return (
    // Glass draws a 1px border inside the Figma box: padding is 1px less than in Figma (25px / 40px)
    <Glass
      className={cn(
        "rounded-rectangles border-white/50 bg-background-blur p-6 md:p-9.75",
        href &&
          "group/card relative overflow-hidden has-[>a:focus-visible]:ring-2 has-[>a:focus-visible]:ring-blue-secondary",
        className
      )}
    >
      {href && <CardHoverBackground />}
      {href && <Link href={href} className="absolute inset-0 z-10 outline-none" aria-label={title} />}
      {/* Positioned so the text stays above the hover background */}
      <div className="relative flex items-center md:flex-col md:items-start">
        <div className="flex shrink-0 md:h-17.25 md:items-start">
          <Image src={icon} alt="" className={iconClassName} />
        </div>
        {/* On the narrowest phones an email title may not fit: let it wrap after the "@" */}
        <h3
          className={cn(
            "typo-title-large md:typo-headline-medium min-w-0 bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent md:whitespace-nowrap",
            titleClassName
          )}
        >
          {title.replace("@", "@\u200B")}
        </h3>
      </div>
      {mobileDescription !== undefined && (
        <p className="typo-body-small -mr-2 relative mt-3 text-text-primary md:hidden">{mobileDescription}</p>
      )}
      <p
        className={cn(
          "typo-body-small md:typo-body-large relative mt-3",
          descriptionColorClassName,
          descriptionClassName,
          mobileDescription !== undefined && "max-md:hidden"
        )}
      >
        {description}
      </p>
    </Glass>
  )
}
