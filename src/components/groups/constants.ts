import type { Course, Level, School } from "@/components/groups/types"

export const SCHOOLS: School[] = [
  { slug: "architettura", name: "Scuola di Architettura" },
  { slug: "design", name: "Scuola di Design" },
  { slug: "ingegneria", name: "Scuole di Ingegneria" },
]

export const LEVELS: Level[] = [
  { slug: "triennale", name: "Triennale" },
  { slug: "magistrale", name: "Magistrale" },
]

export const COURSES: Record<string, Course[]> = {
  "design/triennale": [
    { slug: "design-prodotto", name: "Design del Prodotto", location: "Milano Bovisa", language: "ITA" },
    { slug: "design-comunicazione", name: "Design della Comunicazione", location: "Milano Bovisa", language: "ITA" },
    { slug: "design-moda", name: "Design della Moda", location: "Milano Bovisa", language: "ITA" },
  ],
}

export function getSchool(slug: string) {
  return SCHOOLS.find((school) => school.slug === slug)
}

export function getLevel(slug: string) {
  return LEVELS.find((level) => level.slug === slug)
}

export function getCourses(school: string, level: string) {
  return COURSES[`${school}/${level}`] ?? []
}

export function getCourse(school: string, level: string, slug: string) {
  return getCourses(school, level).find((course) => course.slug === slug)
}

export function getCourseFilters(school: string, level: string) {
  const courses = getCourses(school, level)
  return {
    campuses: [...new Set(courses.map((course) => course.location))],
    languages: [...new Set(courses.map((course) => course.language))],
  }
}
