import type { IconType } from "react-icons"
import { BsBook } from "react-icons/bs"
import { Card, CardAction, CardContent } from "./ui/card"

export function CardPathSelection({ caption, icon: Icon = BsBook }: { caption: string; icon?: IconType }) {
  return (
    <Card className="h-fit w-136 px-10 py-7.5">
      <CardContent className="typo-body-large flex flex-row items-center justify-center gap-1.25 whitespace-nowrap font-normal leading-6 tracking-[0.03125rem]">
        <CardAction icon={Icon} iconSize="small" /> {caption}
      </CardContent>
    </Card>
    //TODO: add hover effect
  )
}
