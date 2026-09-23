import { FiBox } from "react-icons/fi"
import type { GradientIconType } from "@/components/gradient-icon"
import type { Level, School } from "@/components/groups/types"

export const SCHOOLS: School[] = [
  { slug: "ingegneria-industriale-informazione", name: "Scuola di Ingegneria Industriale e dell'Informazione" },
  { slug: "auic", name: "Scuola di Architettura, Urbanistica, Ingegneria delle Costruzioni" },
  { slug: "ingegneria-civile-ambientale-territoriale", name: "Scuola di Ingegneria Civile, Ambientale e Territoriale" },
  { slug: "design", name: "Scuola di Design" },
]

export const SCHOOL_ICONS: Record<string, GradientIconType | string> = {
  "ingegneria-industriale-informazione": "/icons/ingegneria.png",
  auic: "/icons/architettura.png",
  "ingegneria-civile-ambientale-territoriale": "/icons/civile.png",
  design: "/icons/design.png",
}

export const DEFAULT_SCHOOL_ICON: GradientIconType = FiBox

export const LEVELS: Level[] = [
  { slug: "triennale", name: "Triennale" },
  { slug: "magistrale", name: "Magistrale" },
]

const CICLO_UNICO_LEVEL: Level = { slug: "ciclo-unico", name: "Ciclo Unico" }

const SCHOOLS_WITH_CICLO_UNICO = new Set(["auic"])

export function getSchool(slug: string) {
  return SCHOOLS.find((school) => school.slug === slug)
}

export function getLevelsForSchool(schoolSlug: string): Level[] {
  return SCHOOLS_WITH_CICLO_UNICO.has(schoolSlug) ? [...LEVELS, CICLO_UNICO_LEVEL] : LEVELS
}

export function getLevel(schoolSlug: string, slug: string) {
  return getLevelsForSchool(schoolSlug).find((level) => level.slug === slug)
}
