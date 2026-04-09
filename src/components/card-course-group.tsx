import type { IconType } from "react-icons"
import { FaWhatsapp } from "react-icons/fa"
import { LiaTelegramPlane } from "react-icons/lia"
import { Card, CardAction, CardTitle } from "./ui/card"

export function CardCourseGroup({
  groupName,
  iconWhatsApp: IconWhatsApp = FaWhatsapp,
  iconTelegram: IconTelegram = LiaTelegramPlane,
}: {
  groupName: string
  iconWhatsApp?: IconType
  iconTelegram?: IconType
}) {
  return (
    <Card className="flex h-fit w-full flex-row items-center gap-5 bg-background-blur px-7.5 py-6.25 font-normal leading-6 tracking-[0.03125rem]">
      <CardTitle gradient={false} className="typo-headline-small grow truncate">
        {groupName}
      </CardTitle>
      <CardAction gradient={false} className="rounded-full bg-[#74D4FF] p-3.75" icon={IconWhatsApp} iconSize="normal" />
      <CardAction gradient={false} className="rounded-full bg-[#74D4FF] p-3.75" icon={IconTelegram} iconSize="normal" />
    </Card>
  )
}
