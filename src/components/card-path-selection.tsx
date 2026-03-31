import type { IconType } from "react-icons"
import { BsBook } from "react-icons/bs"
import { Card, CardAction, CardContent } from "./ui/card"

export function CardPathSelection({ caption, icon: Icon = BsBook }: { caption: string; icon?: IconType }) {
  return (
    <Card className="bg-background-blur w-136 py-7.5 px-10 h-fit">
      <CardContent className="flex flex-row justify-center items-center gap-1.25 text-[1rem] leading-6 tracking-[0.03rem] font-normal whitespace-nowrap">
        <CardAction icon={Icon} iconSize="small" /> {caption}
      </CardContent>
    </Card>
    //TODO: add hover effect and check if bg-color and icon color are aligned with figma
  )
}
