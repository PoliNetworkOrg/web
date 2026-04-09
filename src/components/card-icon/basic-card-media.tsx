import { GradientIcon, type GradientIconType } from "../gradient-icon"
import type { CardSize } from "./types"
import { getIconSizeClasses } from "./utils"

export function BasicCardMedia({ icon: Icon, size }: { icon: GradientIconType; size: CardSize }) {
  return <GradientIcon icon={Icon} className={getIconSizeClasses(size)} />
}
