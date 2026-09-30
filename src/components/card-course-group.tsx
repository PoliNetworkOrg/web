"use client"

import { cva, type VariantProps } from "class-variance-authority"
import type { IconType } from "react-icons"
import { FaWhatsapp } from "react-icons/fa"
import { FiFlag } from "react-icons/fi"
import { LiaTelegramPlane } from "react-icons/lia"
import { ReportFinderDialog } from "@/components/groups/report/finder-dialog"
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
  waLink,
  waGroupId,
  iconWhatsApp: IconWhatsApp = FaWhatsapp,
  tgLink,
  tgGroupId,
  iconTelegram: IconTelegram = LiaTelegramPlane,
  secondary = false,
  stacked = false,
}: {
  groupName: string
  waLink?: string
  waGroupId?: number
  iconWhatsApp?: IconType
  tgLink?: string
  tgGroupId?: number
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
      <div className={cn("flex items-center gap-1.5", stacked ? "md:contents" : "contents")}>
        <PlatformAction
          platform="wa"
          platformLabel="WhatsApp"
          link={waLink}
          groupId={waGroupId}
          icon={IconWhatsApp}
          groupName={groupName}
          actionClassName={actionClassName}
        />
        <PlatformAction
          platform="tg"
          platformLabel="Telegram"
          link={tgLink}
          groupId={tgGroupId}
          icon={IconTelegram}
          groupName={groupName}
          actionClassName={actionClassName}
        />
      </div>
    </Card>
  )
}

function PlatformAction({
  platform,
  platformLabel,
  link,
  groupId,
  icon,
  groupName,
  actionClassName,
}: {
  platform: "wa" | "tg"
  platformLabel: string
  link?: string
  groupId?: number
  icon: IconType
  groupName: string
  actionClassName: string
}) {
  if (!link) return null

  return (
    <>
      <a href={link} target="_blank" rel="noopener noreferrer" aria-label={`${groupName} su ${platformLabel}`}>
        <CardAction gradient={false} className={actionClassName} icon={icon} iconSize="sm" />
      </a>
      {groupId !== undefined && (
        <ReportFinderDialog
          selectedReport={{ groupId, type: platform, reportType: "broken_link", reportedLink: link }}
          selectedGroupName={groupName}
          trigger={
            <button type="button" aria-label={`Segnala il link ${platformLabel} di ${groupName} come non funzionante`}>
              <CardAction gradient={false} className="p-2 text-text-secondary sm:p-3.75" icon={FiFlag} iconSize="xs" />
            </button>
          }
        />
      )}
    </>
  )
}
