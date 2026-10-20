import type { IconType } from "react-icons"
import {
  FiBarChart2,
  FiBell,
  FiBook,
  FiDollarSign,
  FiFolder,
  FiHome,
  FiMap,
  FiMonitor,
  FiRadio,
  FiRefreshCw,
  FiRepeat,
  FiShoppingCart,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi"
import type { CardIconProps } from "@/components/card-icon/types"
import type { FreshmanCard } from "@/queries/types"

const icons: Record<FreshmanCard["icon"], IconType> = {
  chart: FiBarChart2,
  monitor: FiMonitor,
  book: FiBook,
  map: FiMap,
  news: FiRadio,
  money: FiDollarSign,
  folder: FiFolder,
  repeat: FiRepeat,
  refresh: FiRefreshCw,
  bell: FiBell,
  user: FiUserCheck,
  users: FiUsers,
  cart: FiShoppingCart,
  home: FiHome,
}

export function freshmanCardProps(card: FreshmanCard): CardIconProps {
  return {
    title: card.title,
    description: card.description,
    icon: icons[card.icon],
    href: card.href || undefined,
  }
}
