import type { IconType } from "react-icons"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "./ui/card"

export function CardCaption({
  title,
  caption,
  icon,
  iconPosition = "right",
}: {
  title: string
  caption: string
  icon?: IconType
  iconPosition?: "top" | "right"
}) {
  return (
    <Card hoverBackground>
      <CardHeader
        className={`typo-headline-medium flex ${iconPosition === "right" ? "justify-between" : "flex-col-reverse"}`}
      >
        <CardTitle>{title}</CardTitle>
        {icon && <CardAction icon={icon} iconSize={iconPosition === "right" ? "normal" : "large"}></CardAction>}
      </CardHeader>
      <CardContent className="typo-body-medium">
        <p>{caption}</p>
      </CardContent>
    </Card>
  )
}
