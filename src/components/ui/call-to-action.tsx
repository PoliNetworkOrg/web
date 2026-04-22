import type { IconType } from "react-icons"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "./card"

export function CallToAction({ title, caption, icon }: { title: string; caption?: string; icon?: IconType }) {
  return (
    <Card className="h-fit w-80.75 px-8 py-[1.56rem]">
      <CardHeader className="flex items-center gap-4">
        <div className="rounded-[0.625rem] bg-blue-tertiary p-2.5">
          {icon && <CardAction icon={icon} gradient={false}></CardAction>}
        </div>
        <CardTitle className="typo-title-large grow">{title}</CardTitle>
      </CardHeader>
      {caption && (
        <CardContent className="typo-body-large">
          <p>{caption}</p>
        </CardContent>
      )}
    </Card>
  )
}
