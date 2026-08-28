import { cva, type VariantProps } from "class-variance-authority"
import type { IconType } from "react-icons"
import { FaWhatsapp } from "react-icons/fa"
import { LiaTelegramPlane } from "react-icons/lia"
import { cn } from "@/lib/utils"
import { Card, CardAction, CardTitle } from "./ui/card"

export const cardCourseGroupVariants = cva(
  "flex h-fit w-full min-w-0 flex-1 flex-row items-center gap-3 px-5 py-4 font-normal leading-6 tracking-[0.03125rem] sm:gap-5 sm:px-7.5 sm:py-6.25",
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
  stacked = false,
}: {
  groupName: string
  hasWhatsapp?: boolean
  iconWhatsApp?: IconType
  hasTelegram?: boolean
  iconTelegram?: IconType
  stacked?: boolean
} & VariantProps<typeof cardCourseGroupVariants>) {
  const actionClassName = cn("rounded-full p-2 sm:p-3.75", secondary ? "bg-[#51A2FF]" : "bg-[#74D4FF]")
  return (
    <Card
      className={cn(
        cardCourseGroupVariants({ secondary }),
        stacked && "h-auto flex-col items-start md:h-fit md:flex-row md:items-center"
      )}
    >
      <CardTitle gradient={false} className="typo-body-medium md:typo-headline-small min-w-0 grow">
        {groupName}
      </CardTitle>
      <div className={cn("flex items-center gap-3", stacked ? "md:contents" : "contents")}>
        {hasWhatsapp && <CardAction gradient={false} className={actionClassName} icon={IconWhatsApp} iconSize="sm" />}
        {hasTelegram && <CardAction gradient={false} className={actionClassName} icon={IconTelegram} iconSize="sm" />}
      </div>
    </Card>
  )
}
