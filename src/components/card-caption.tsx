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
  href,
  footer,
  className,
}: {
  title: string
  caption: ReactNode
  icon?: IconType
  iconPosition?: "top" | "right"
  href?: string
  /** Pinned to the bottom of the card, e.g. where a link leads to. */
  footer?: ReactNode
  className?: string
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
        <CardTitle className="typo-headline-medium">{title}</CardTitle>
        {icon && <CardAction icon={icon} iconSize={iconPosition === "right" ? "md" : "lg"}></CardAction>}
      </CardHeader>
      <CardContent className="typo-body-medium relative">
        {typeof caption === "string" ? <p>{caption}</p> : caption}
      </CardContent>
      {footer && <div className="relative mt-auto">{footer}</div>}
    </Card>
  )
}
