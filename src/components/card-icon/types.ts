import type { GradientIconType } from "@/components/gradient-icon"

export type CardSize = "compact" | "xs" | "sm" | "md" | "lg"
export type CardBreakpoint = "base" | "sm" | "md" | "lg"
export type CardAlign = "center" | "start"

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
  icon: GradientIconType
  size?: ResponsiveCardSize
  align?: CardAlign
  href?: string
  hoverEffect?: boolean
  className?: string
}

export type CardIconProps = SharedCardProps & {
  description?: string
}
