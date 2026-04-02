import type { IconType } from "react-icons"
import { BsBook } from "react-icons/bs"
import { Card, CardAction, CardContent } from "./ui/card"

export function CardPathSelection({ caption, icon: Icon = BsBook }: { caption: string; icon?: IconType }) {
  return (
    <Card className="h-fit w-136 bg-background-blur px-10 py-7.5">
      <CardContent className="flex flex-row items-center justify-center gap-1.25 whitespace-nowrap font-normal text-[1rem] leading-6 tracking-[0.03rem]">
        <CardAction icon={Icon} iconSize="small" /> {caption}
      </CardContent>
    </Card>
    //TODO: add hover effect and check if bg-color and icon color are aligned with figma
  )
}
