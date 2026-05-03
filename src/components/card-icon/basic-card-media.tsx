import { GradientIcon, type GradientIconType } from "../gradient-icon"
import type { ResponsiveCardSize } from "./types"
import { getIconSizeClasses } from "./utils"

export function BasicCardMedia({ icon: Icon, size }: { icon: GradientIconType; size: ResponsiveCardSize }) {
  return <GradientIcon icon={Icon} className={getIconSizeClasses(size)} />
}
