import type { IconType } from "react-icons"
import { Link } from "@/components/link"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "./card"

export function CallToAction({
  title,
  caption,
  icon,
  href,
}: {
  title: string
  caption?: string
  icon: IconType
  href: string
}) {
  return (
    <Link
      href={href}
      className="press-feedback block w-fit rounded-rectangles focus-visible:ring-2 focus-visible:ring-blue-secondary"
    >
      <Card className="h-fit w-80.75 px-8 py-5.25">
        <CardHeader className={`flex items-center ${caption ? "gap-2" : "gap-10"}`}>
          <div className="rounded-[0.625rem] bg-blue-tertiary p-2.5 motion-safe:transition-transform motion-safe:group-hover/card:scale-105">
            <CardAction icon={icon} gradient={false} iconSize="sm" />
          </div>
          <CardTitle className="typo-title-large">{title}</CardTitle>
        </CardHeader>
        {caption && (
          <CardContent className="typo-body-large">
            <p>{caption}</p>
          </CardContent>
        )}
      </Card>
    </Link>
  )
}
