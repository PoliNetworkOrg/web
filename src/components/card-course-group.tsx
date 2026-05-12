import { cva, type VariantProps } from "class-variance-authority"
import type { IconType } from "react-icons"
import { FaWhatsapp } from "react-icons/fa"
import { LiaTelegramPlane } from "react-icons/lia"
import { cn } from "@/lib/utils"
import { Card, CardAction, CardTitle } from "./ui/card"

export const cardCourseGroupVariants = cva(
  "flex h-fit w-full flex-row items-center gap-5 px-7.5 py-6.25 font-normal leading-6 tracking-[0.03125rem]",
  {
    variants: {
      secondary: {
        true: "bg-[rgba(148,192,237,0.40)]",
        false: "",
      },
    },
    defaultVariants: {
      secondary: false,
    },
  }
)

export function CardCourseGroup({
  groupName,
  hasWhatsapp = true,
  iconWhatsApp: IconWhatsApp = FaWhatsapp,
  hasTelegram = true,
  iconTelegram: IconTelegram = LiaTelegramPlane,
  secondary = false,
}: {
  groupName: string
  hasWhatsapp?: boolean
  iconWhatsApp?: IconType
  hasTelegram?: boolean
  iconTelegram?: IconType
} & VariantProps<typeof cardCourseGroupVariants>) {
  const actionClassName = cn("rounded-full p-3.75", secondary ? "bg-[#51A2FF]" : "bg-[#74D4FF]")
  return (
    <Card className={cn(cardCourseGroupVariants({ secondary }))}>
      <CardTitle gradient={false} className="typo-headline-small grow">
        {groupName}
      </CardTitle>
      {hasWhatsapp && <CardAction gradient={false} className={actionClassName} icon={IconWhatsApp} iconSize="normal" />}
      {hasTelegram && <CardAction gradient={false} className={actionClassName} icon={IconTelegram} iconSize="normal" />}
    </Card>
  )
}
