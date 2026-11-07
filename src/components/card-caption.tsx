import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import type { IconType } from "react-icons"
import { cn } from "@/lib/utils"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "./ui/card"

export function CardCaption({
  title,
  caption,
  icon,
  iconPosition = "right",
  image,
  href,
  onClick,
  footer,
  className,
  titleClassName,
  captionClassName,
}: {
  title: string
  caption: ReactNode
  icon?: IconType
  iconPosition?: "top" | "right"
  /** An image shown in place of the icon, e.g. a project's logo. */
  image?: string
  href?: string
  onClick?: () => void
  /** Pinned to the bottom of the card, e.g. where a link leads to. */
  footer?: ReactNode
  className?: string
  titleClassName?: string
  captionClassName?: string
}) {
  return (
    <Card
      hoverBackground={Boolean(href || onClick)}
      className={cn(
        (href || onClick) && "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-secondary",
        className
      )}
    >
      {href ? (
        <Link href={href} className="absolute inset-0 z-10 outline-none" aria-label={title} />
      ) : onClick ? (
        <button type="button" onClick={onClick} className="absolute inset-0 z-10 outline-none" aria-label={title} />
      ) : null}
      <CardHeader
        className={`typo-headline-medium relative flex ${iconPosition === "right" ? "justify-between" : "flex-col-reverse"}`}
      >
        <CardTitle gradient={false} className={cn("typo-headline-medium", titleClassName)}>
          {/* Gradient per line (box-decoration-clone): a two-line title doesn't fade into a paler second line */}
          <span className="bg-linear-to-b from-blue-secondary to-blue-primary box-decoration-clone bg-clip-text text-transparent">
            {title}
          </span>
        </CardTitle>
        {image ? (
          <Image src={image} alt="" width={40} height={40} className="size-10 shrink-0 object-contain" />
        ) : (
          icon && <CardAction icon={icon} iconSize={iconPosition === "right" ? "md" : "lg"}></CardAction>
        )}
      </CardHeader>
      <CardContent className={cn("typo-body-medium relative", captionClassName)}>
        {typeof caption === "string" ? <p>{caption}</p> : caption}
      </CardContent>
      {footer && <div className="relative mt-auto">{footer}</div>}
    </Card>
  )
}
