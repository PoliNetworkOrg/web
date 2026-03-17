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
    <Card>
      <CardHeader className={`flex ${iconPosition === "right" ? "justify-between" : "flex-col-reverse"}`}>
        <CardTitle>{title}</CardTitle>
        {icon && <CardAction icon={icon} iconSize={iconPosition === "right" ? "normal" : "large"}></CardAction>}
      </CardHeader>
      <CardContent>
        <p>{caption}</p>
      </CardContent>
    </Card>
  )
}
