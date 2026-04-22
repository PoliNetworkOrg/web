import type { IconType } from "react-icons"

export type TabsNavigationItem = {
  value: string
  label: string
  icon?: IconType
}

export type TabsNavigationProps = {
  items: TabsNavigationItem[]
  className?: string
}
