import { FiAward, FiBook, FiBox, FiLayers } from "react-icons/fi"
import architettura from "@/assets/icons/schools/architettura.png?img"
import civile from "@/assets/icons/schools/civile.png?img"
import design from "@/assets/icons/schools/design.png?img"
import ingegneria from "@/assets/icons/schools/ingegneria.png?img"
import type { GradientIconType } from "@/components/gradient-icon"
import type { StaticImage } from "@/components/image"
import type { Level, School } from "@/components/wizard/types"

export const SCHOOLS: School[] = [
  { slug: "ingegneria-industriale-informazione", name: "Scuola di Ingegneria Industriale e dell'Informazione" },
  { slug: "auic", name: "Scuola di Architettura, Urbanistica, Ingegneria delle Costruzioni" },
  { slug: "ingegneria-civile-ambientale-territoriale", name: "Scuola di Ingegneria Civile, Ambientale e Territoriale" },
  { slug: "design", name: "Scuola di Design" },
]

export const SCHOOL_ICONS: Record<string, GradientIconType | StaticImage> = {
  "ingegneria-industriale-informazione": ingegneria,
  auic: architettura,
  "ingegneria-civile-ambientale-territoriale": civile,
  design,
}

export const DEFAULT_SCHOOL_ICON: GradientIconType = FiBox

export const LEVELS: Level[] = [
  // The first degree, the advanced one, and the two in a single programme
  { slug: "triennale", name: "Triennale", icon: FiBook },
  { slug: "magistrale", name: "Magistrale", icon: FiAward },
]

const CICLO_UNICO_LEVEL: Level = { slug: "ciclo-unico", name: "Ciclo Unico", icon: FiLayers }

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
