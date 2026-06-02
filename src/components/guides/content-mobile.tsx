import { cn } from "@/lib/utils"
import { CardResource } from "../card-resource"
import type { GuideContentMobileProps } from "./types"

export function GuideContentMobile({ title, guides, className }: GuideContentMobileProps) {
  return (
    <div className={cn("flex w-full flex-col gap-5 text-start", className)}>
      <p className="typo-title-large">{title}</p>
      {guides.map((guide) => (
        <CardResource key={guide.title} {...guide} />
      ))}
    </div>
  )
}
