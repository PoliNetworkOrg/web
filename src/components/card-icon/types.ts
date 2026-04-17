import type { GradientIconType } from "@/components/gradient-icon"

export type CardSize = "xs" | "sm" | "md" | "lg"

export type ResponsiveCardSize =
  | CardSize
  | {
      base: CardSize
      sm?: CardSize
      md?: CardSize
      lg?: CardSize
    }

export type SharedCardProps = {
  title: string
  icon: GradientIconType
  size?: ResponsiveCardSize
  href?: string
  hoverEffect?: boolean
  className?: string
}

export type CardWithDescriptionProps = SharedCardProps & {
  description: string
}

export type CardIconProps = SharedCardProps | CardWithDescriptionProps
