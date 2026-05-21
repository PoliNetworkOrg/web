import type { ReactNode } from "react"
import type { IconType } from "react-icons"
import { Button, type ButtonSizes } from "./ui/button"

export function ButtonIcon({
  variant = "primary",
  icon: Icon,
  children,
  iconPosition = "left",
  size,
}: {
  variant?: "primary" | "tertiary" | "tertiaryBlur"
  icon: IconType
  children: ReactNode
  iconPosition?: "left" | "right"
  size: ButtonSizes
  className?: string
}) {
  return (
    <Button variant={variant} size={size}>
      {iconPosition === "left" && <Icon />}
      {children}
      {iconPosition === "right" && <Icon />}
    </Button>
  )
}
