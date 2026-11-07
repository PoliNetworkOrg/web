import type { ReactNode } from "react"
import type { GradientIconType } from "@/components/gradient-icon"

export type CardSize = "compact" | "xs" | "sm" | "md" | "lg" | "inline" | "inline-sm"
export type CardBreakpoint = "base" | "sm" | "md" | "lg"
export type CardAlign = "center" | "start" | "inline"

export type SizeClassMap = Record<CardSize, string>

export type ResponsiveCardSizeConfig = {
  base: CardSize
  sm?: CardSize
  md?: CardSize
  lg?: CardSize
}

export type ResponsiveCardSize = CardSize | ResponsiveCardSizeConfig

export type SharedCardProps = {
  title: string
  icon: GradientIconType | string
  size?: ResponsiveCardSize
  align?: CardAlign
  href?: string
  /** An action card uses a native button instead of a link. */
  onClick?: () => void
  /** Defaults to whether the card has a link or an action. */
  hoverEffect?: boolean
  className?: string
}

export type CardIconProps = SharedCardProps & {
  cta?: string
  description?: ReactNode
}
