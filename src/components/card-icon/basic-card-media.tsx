import type { ImageSource } from "@/components/image"
import { cn } from "@/lib/utils"
import { GradientIcon, type GradientIconType } from "../gradient-icon"
import { CardMediaImage } from "./card-media-image"
import type { ResponsiveCardSize } from "./types"
import { getIconSizeClasses } from "./utils"

export function BasicCardMedia({ icon, size }: { icon: GradientIconType | ImageSource; size: ResponsiveCardSize }) {
  if (typeof icon !== "function") {
    return (
      <div className={cn("relative", getIconSizeClasses(size))}>
        <CardMediaImage src={icon} fill sizes="180px" className="object-contain" />
      </div>
    )
  }

  return <GradientIcon icon={icon} className={getIconSizeClasses(size)} />
}
