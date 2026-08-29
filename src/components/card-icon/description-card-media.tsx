import Image from "next/image"
import { cn } from "@/lib/utils"
import { GradientIcon, type GradientIconType } from "../gradient-icon"
import type { ResponsiveCardSize } from "./types"
import { getIconSizeClasses } from "./utils"

export function DescriptionCardMedia({ icon, size }: { icon: GradientIconType | string; size: ResponsiveCardSize }) {
  return (
    <div className={cn("relative", getIconSizeClasses(size))}>
      {typeof icon === "string" ? (
        <Image src={icon} alt="" fill sizes="180px" className="object-contain" />
      ) : (
        <GradientIcon icon={icon} className="h-full w-full" />
      )}
    </div>
  )
}
