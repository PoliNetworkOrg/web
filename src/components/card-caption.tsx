import type { ReactNode } from "react"
import type { IconType } from "react-icons"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "./ui/card"

export function CardCaption({
  title,
  caption,
  icon,
  iconPosition = "right",
  className,
}: {
  title: string
  caption: ReactNode
  icon?: IconType
  iconPosition?: "top" | "right"
  className?: string
}) {
  return (
    <Card hoverBackground className={className}>
      <CardHeader
        className={`typo-headline-medium flex ${iconPosition === "right" ? "justify-between" : "flex-col-reverse"}`}
      >
        <CardTitle className="typo-headline-medium">{title}</CardTitle>
        {icon && <CardAction icon={icon} iconSize={iconPosition === "right" ? "md" : "lg"}></CardAction>}
      </CardHeader>
      <CardContent className="typo-body-medium">{typeof caption === "string" ? <p>{caption}</p> : caption}</CardContent>
    </Card>
  )
}
