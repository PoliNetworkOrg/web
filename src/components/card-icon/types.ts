import type { GradientIconType } from "@/components/gradient-icon"

export type CardSize = "xs" | "sm" | "md" | "lg"
export type CardBreakpoint = "base" | "sm" | "md" | "lg"

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
  href?: string
  hoverEffect?: boolean
  className?: string
}

export type CardIconProps = SharedCardProps & {
  description?: string
}
