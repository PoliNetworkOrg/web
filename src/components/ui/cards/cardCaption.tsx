import type { LucideIcon } from "lucide-react"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "./card"

export function CardCaption({ title, description, icon }: { title: string; description: string; icon: LucideIcon }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardAction icon={icon}></CardAction>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  )
}
