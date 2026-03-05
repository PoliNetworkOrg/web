import type { LucideIcon } from "lucide-react"
import { Button } from "./button"

export function ButtonWithIcon({
  variant = "primary",
  icon: Icon,
  text,
  iconPosition = "left",
}: {
  variant?: "primary" | "tertiary" | "tertiaryBlur"
  icon: LucideIcon
  text: string
  iconPosition?: "left" | "right"
}) {
  return (
    <Button variant={variant} size="lg">
      {iconPosition === "left" && <Icon />}
      {text}
      {iconPosition === "right" && <Icon />}
    </Button>
  )
}
