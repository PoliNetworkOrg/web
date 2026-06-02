import { FiArrowUpRight, FiChevronRight } from "react-icons/fi"
import type { HeaderMenuItem } from "./types"

export const headerMenuItems: HeaderMenuItem[] = [
  {
    title: "Resources",
    menu: [
      { title: "Materials", href: "/materials", icon: FiChevronRight },
      { title: "Guides", href: "/guides", icon: FiChevronRight },
      { title: "Computer Recs", href: "/computer-recs", icon: FiChevronRight },
      { title: "FAQs", href: "/faqs", icon: FiChevronRight },
      { title: "Rankings", href: "https://rankings.polinetwork.org/", icon: FiArrowUpRight },
      { title: "Tol Project", href: "https://tol.polinetwork.org/", icon: FiArrowUpRight },
    ],
  },
  {
    title: "Community",
    menu: [
      { title: "Groups", href: "/groups", icon: FiChevronRight },
      { title: "Projects", href: "/projects", icon: FiChevronRight },
      { title: "Freshman", href: "/matricole", icon: FiChevronRight },
      { title: "Associations", href: "/associations", icon: FiChevronRight },
    ],
  },
  {
    title: "About",
    menu: [
      { title: "About us", href: "/about", icon: FiChevronRight },
      { title: "Join us", href: "/join", icon: FiChevronRight },
      { title: "Contact us", href: "/contact", icon: FiChevronRight },
    ],
  },
]
