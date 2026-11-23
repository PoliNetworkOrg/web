import { FiArrowUpRight, FiChevronRight } from "react-icons/fi"
import type { HeaderMenuItem } from "./types"

/** The materials archive, on the old site. */
export const MATERIALS_URL = "https://polinetwork.org/it/materials/view/"
export const headerMenuItems: HeaderMenuItem[] = [
  {
    title: "Resources",
    menu: [
      { title: "Progetti", href: "/projects", icon: FiChevronRight },
      // Leaves the site: ↗ instead of ›, as in the rest of the site
      { title: "Appunti", href: MATERIALS_URL, icon: FiArrowUpRight },
      { title: "Guide", href: "/guides", icon: FiChevronRight },
      { title: "Documenti", href: "/documents", icon: FiChevronRight },
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
      { title: "Contatti", href: "/contact", icon: FiChevronRight },
    ],
  },
]

/** The page is the item itself or one of its subpages (e.g. a project under `/projects`). */
export function isActiveHref(pathname: string, href: string) {
  return href.startsWith("/") && (pathname === href || pathname.startsWith(`${href}/`))
}
