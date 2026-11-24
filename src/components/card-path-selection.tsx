import type { IconType } from "react-icons"
import { BsBook } from "react-icons/bs"
import { cn } from "@/lib/utils"
import { Card, CardAction, CardContent } from "./ui/card"

export function CardPathSelection({
  caption,
  icon: Icon = BsBook,
  className,
}: {
  caption: string
  icon?: IconType
  className?: string
}) {
  return (
    // Always rendered inside a link or button. It brightens on hover like the course rows and the accordions: the
    // shapes of the large cards' hover filled these short, wide ones awkwardly
    <Card className={cn("hover:glass-glow h-fit w-136 px-10 py-7.5 transition-colors duration-200", className)}>
      <CardContent className="typo-body-large flex flex-row items-center justify-center gap-1.25 whitespace-nowrap font-normal leading-6 tracking-[0.03125rem]">
        <CardAction icon={Icon} iconSize="xs" /> {caption}
      </CardContent>
    </Card>
  )
}
