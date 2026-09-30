import type { ReactNode } from "react"
import type { GradientIconType } from "../gradient-icon"

export type CardGroupProps = {
  icon?: GradientIconType
  title: string
  description?: string
  children: ReactNode
  horizontal?: boolean
  className?: string
}
