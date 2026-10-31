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
  "@container h-auto w-full min-w-0 px-4 py-3 font-normal leading-6 tracking-[0.03125rem] sm:px-6 sm:py-4",
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
}: {
  groupName: string
  waLink?: string
  waGroupId?: number
  iconWhatsApp?: IconType
  tgLink?: string
  tgGroupId?: number
  iconTelegram?: IconType
} & VariantProps<typeof cardCourseGroupVariants>) {
  // The platform buttons are the only links in the row, so they carry the hover state, not the card
  const actionClassName = cn(
    "rounded-full p-2 transition-[filter] group-hover/action:brightness-90 sm:p-3",
    secondary ? "bg-[#51A2FF]" : "bg-[#74D4FF]"
  )
  return (
    <Card className={cardCourseGroupVariants({ secondary })}>
      {/* Name and buttons share a row; in a card narrower than 20rem the name gets its own line instead of wrapping word by word */}
      <div className="flex min-w-0 @max-xs:flex-col @max-xs:items-start items-center gap-3 sm:gap-5">
        <CardTitle
          gradient={false}
          className="typo-body-large sm:typo-headline-small wrap-break-word min-w-0 grow text-balance"
        >
          {groupName}
        </CardTitle>
        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1.5">
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
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${groupName} su ${platformLabel}`}
        className="group/action rounded-full outline-none focus-visible:ring-2 focus-visible:ring-blue-secondary"
      >
        <CardAction gradient={false} className={actionClassName} icon={icon} iconSize="sm" />
      </a>
      {groupId !== undefined && (
        <ReportFinderDialog
          selectedReport={{ groupId, type: platform, reportType: "broken_link", reportedLink: link }}
          selectedGroupName={groupName}
          trigger={
            <button
              type="button"
              aria-label={`Segnala il link ${platformLabel} di ${groupName} come non funzionante`}
              className="rounded-full text-text-secondary outline-none transition-colors hover:text-text-primary focus-visible:ring-2 focus-visible:ring-blue-secondary"
            >
              <CardAction gradient={false} className="p-2 text-current sm:p-3" icon={FiFlag} iconSize="xs" />
            </button>
          }
        />
      )}
    </>
  )
}
