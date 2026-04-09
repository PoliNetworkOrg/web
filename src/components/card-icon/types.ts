import type { GradientIconType } from "@/components/gradient-icon"

export type CardSize = "sm" | "md" | "lg"

export type SharedCardProps = {
  title: string
  icon: GradientIconType
  size?: CardSize
  href?: string
  hoverEffect?: boolean
  className?: string
}

export type CardWithDescriptionProps = SharedCardProps & {
  description: string
}

export type CardIconProps = SharedCardProps | CardWithDescriptionProps
