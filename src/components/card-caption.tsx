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
  /** Pinned to the bottom of the card, e.g. where a link leads to. */
  footer?: ReactNode
  className?: string
  titleClassName?: string
  captionClassName?: string
}) {
  return (
    // Only cards that lead somewhere react to hover
    <Card
      hoverBackground={Boolean(href)}
      className={cn(href && "has-[>a:focus-visible]:ring-2 has-[>a:focus-visible]:ring-blue-secondary", className)}
    >
      {href && <Link href={href} className="absolute inset-0 z-10 outline-none" aria-label={title} />}
      <CardHeader
        className={`typo-headline-medium relative flex ${iconPosition === "right" ? "justify-between" : "flex-col-reverse"}`}
      >
        <CardTitle className={cn("typo-headline-medium", titleClassName)}>{title}</CardTitle>
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
