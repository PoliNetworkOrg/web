import { FiChevronRight } from "react-icons/fi"
import type { HeaderMenuItem } from "./types"

export const headerMenuItems: HeaderMenuItem[] = [
  {
    title: "Resources",
    menu: [
      { title: "Progetti", href: "/projects", icon: FiChevronRight },
      { title: "Appunti", href: "/materials", icon: FiChevronRight },
      { title: "Guide", href: "/guides", icon: FiChevronRight },
      { title: "FAQs", href: "/faqs", icon: FiChevronRight },
    ],
  },
  {
    title: "Community",
    menu: [
      { title: "Gruppi", href: "/groups", icon: FiChevronRight },
      { title: "Matricole", href: "/matricole", icon: FiChevronRight },
      { title: "Associazioni", href: "/associations", icon: FiChevronRight },
    ],
  },
  {
    title: "Chi siamo",
    menu: [
      { title: "Su di noi", href: "/chi-siamo", icon: FiChevronRight },
      { title: "La nostra storia", href: "/storia", icon: FiChevronRight },
    ],
  },
  {
    title: "Collabora",
    menu: [
      { title: "Struttura", href: "/about", icon: FiChevronRight },
      { title: "I team", href: "/team", icon: FiChevronRight },
      { title: "Unisciti", href: "/join", icon: FiChevronRight },
      { title: "Collabora", href: "/collabora", icon: FiChevronRight },
    ],
  },
]
