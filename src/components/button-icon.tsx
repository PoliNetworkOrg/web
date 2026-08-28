import type { ComponentProps } from "react"
import type { IconType } from "react-icons"
import { Button } from "./ui/button"

type ButtonIconProps = ComponentProps<typeof Button> & {
  icon: IconType
  text?: string
  iconPosition?: "left" | "right"
  iconClassName?: string
}

export function ButtonIcon({
  icon: Icon,
  text,
  iconPosition = "left",
  iconClassName,
  size,
  ...props
}: ButtonIconProps) {
  return (
    <Button size={size ?? (text ? "lg" : "icon-lg")} {...props}>
      {iconPosition === "left" && <Icon className={iconClassName} />}
      {text}
      {iconPosition === "right" && <Icon className={iconClassName} />}
    </Button>
  )
}
