import { FiArrowUpRight, FiChevronRight } from "react-icons/fi"
import type { HeaderMenuItem } from "./types"

/** The materials archive, on the old site. */
export const MATERIALS_URL = "https://polinetwork.org/it/materials/view/"
export const headerMenuItems: HeaderMenuItem[] = [
  {
    title: "Risorse",
    menu: [
      { title: "Progetti", href: "/progetti", icon: FiChevronRight },
      // Leaves the site: ↗ instead of ›, as in the rest of the site
      { title: "Appunti", href: MATERIALS_URL, icon: FiArrowUpRight },
      { title: "Guide", href: "/guide", icon: FiChevronRight },
      { title: "Documenti", href: "/documenti", icon: FiChevronRight },
      { title: "FAQ", href: "/faq", icon: FiChevronRight },
    ],
  },
  {
    title: "Comunità",
    menu: [
      { title: "Gruppi", href: "/gruppi", icon: FiChevronRight },
      { title: "Matricole", href: "/matricole", icon: FiChevronRight },
      { title: "Associazioni", href: "/associazioni", icon: FiChevronRight },
    ],
  },
  {
    title: "Chi siamo",
    menu: [
      { title: "Su di noi", href: "/chi-siamo", icon: FiChevronRight },
      { title: "La nostra storia", href: "/storia", icon: FiChevronRight },
      { title: "Ringraziamenti", href: "/ringraziamenti", icon: FiChevronRight },
    ],
  },
  {
    title: "Collabora",
    menu: [
      { title: "Struttura", href: "/struttura", icon: FiChevronRight },
      { title: "I team", href: "/team", icon: FiChevronRight },
      { title: "Unisciti a noi", href: "/unisciti", icon: FiChevronRight },
      { title: "Collabora", href: "/collabora", icon: FiChevronRight },
      { title: "Contatti", href: "/contatti", icon: FiChevronRight },
    ],
  },
]

/** The page is the item itself or one of its subpages (e.g. a project under `/progetti`). */
export function isActiveHref(pathname: string, href: string) {
  return href.startsWith("/") && (pathname === href || pathname.startsWith(`${href}/`))
}

/** Light azure behind a hovered or focused item: visible on the white glass of the header. */
export const HOVER_FILL_CLASS = "bg-sky-500/12 shadow-[inset_0_0_0_1px_rgb(14_165_233/0.16)]"

/**
 * Solid azure behind the current page (or its section). Sky 600–700 keeps white text above 4.5:1;
 * the inset highlight and the tinted drop shadow give it a little depth on the glass.
 */
export const ACTIVE_FILL_CLASS =
  "bg-linear-to-b from-sky-600 to-sky-700 shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_6px_16px_-6px_rgb(3_105_161/0.55)]"
