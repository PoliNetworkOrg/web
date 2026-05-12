import { FiArrowUpRight, FiChevronRight } from "react-icons/fi"
import type { HeaderMenuItem } from "./types"

export const headerMenuItems: HeaderMenuItem[] = [
  {
    title: "Resources",
    menu: [
      { title: "Materials", href: "#", icon: FiChevronRight },
      { title: "Guides", href: "#", icon: FiChevronRight },
      { title: "Computer Recs", href: "#", icon: FiChevronRight },
      { title: "FAQs", href: "#", icon: FiChevronRight },
      { title: "Rankings", href: "#", icon: FiArrowUpRight },
      { title: "Tol Project", href: "#", icon: FiArrowUpRight },
    ],
  },
  {
    title: "Community",
    menu: [
      { title: "Groups", href: "#", icon: FiChevronRight },
      { title: "Projects", href: "#", icon: FiChevronRight },
      { title: "Freshman", href: "#", icon: FiChevronRight },
      { title: "Associations", href: "#", icon: FiChevronRight },
    ],
  },
  {
    title: "About",
    menu: [
      { title: "About us", href: "#", icon: FiChevronRight },
      { title: "Join us", href: "#", icon: FiChevronRight },
      { title: "Contact us", href: "#", icon: FiChevronRight },
    ],
  },
]
