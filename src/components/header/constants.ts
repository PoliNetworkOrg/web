import { FiArrowUpRight } from "react-icons/fi"
import type { HeaderMenuItem } from "./types"

/** The materials archive, on the old site. */
export const MATERIALS_URL = "https://polinetwork.org/it/materials/view/"
export const headerMenuItems: HeaderMenuItem[] = [
  {
    title: "Risorse",
    menu: [
      { title: "Progetti", href: "/progetti" },
      { title: "Appunti", href: MATERIALS_URL, icon: FiArrowUpRight },
      { title: "Guide", href: "/guide" },
      { title: "Documenti", href: "/documenti" },
      { title: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Comunità",
    menu: [
      { title: "Gruppi", href: "/gruppi" },
      { title: "Matricole", href: "/matricole" },
      { title: "Associazioni", href: "/associazioni" },
    ],
  },
  {
    title: "Chi siamo",
    menu: [
      { title: "Su di noi", href: "/chi-siamo" },
      { title: "La nostra storia", href: "/storia" },
      { title: "Ringraziamenti", href: "/ringraziamenti" },
    ],
  },
  {
    title: "Collabora",
    menu: [
      { title: "Struttura", href: "/struttura" },
      { title: "I team", href: "/team" },
      { title: "Unisciti a noi", href: "/unisciti" },
      { title: "Collabora", href: "/collabora" },
      { title: "Contatti", href: "/contatti" },
    ],
  },
]

/** The page is the item itself or one of its subpages (e.g. a project under `/progetti`). */
export function isActiveHref(pathname: string, href: string) {
  return href.startsWith("/") && (pathname === href || pathname.startsWith(`${href}/`))
}

export function getCurrentLocation(pathname: string, href: string) {
  if (!isActiveHref(pathname, href)) return undefined
  return pathname === href ? "page" : "location"
}
