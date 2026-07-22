import type { Course, Faculty, Level } from "@/components/groups/types"

export const FACULTIES: Faculty[] = [
  { slug: "architettura", name: "Scuola di Architettura" },
  { slug: "design", name: "Scuola di Design" },
  { slug: "ingegneria", name: "Scuole di Ingegneria" },
]

export const LEVELS: Level[] = [
  { slug: "triennale", name: "Triennale (o Ciclo Unico)" },
  { slug: "magistrale", name: "Magistrale" },
]

export const COURSES: Record<string, Course[]> = {
  "design/triennale": [
    { slug: "design-prodotto", name: "Design del Prodotto", location: "Milano Bovisa", language: "ITA" },
    { slug: "design-comunicazione", name: "Design della Comunicazione", location: "Milano Bovisa", language: "ITA" },
    { slug: "design-moda", name: "Design della Moda", location: "Milano Bovisa", language: "ITA" },
  ],
}

export function getFaculty(slug: string) {
  return FACULTIES.find((faculty) => faculty.slug === slug)
}

export function getLevel(slug: string) {
  return LEVELS.find((level) => level.slug === slug)
}

export function getCourses(faculty: string, level: string) {
  return COURSES[`${faculty}/${level}`] ?? []
}

export function getCourse(faculty: string, level: string, slug: string) {
  return getCourses(faculty, level).find((course) => course.slug === slug)
}

export function getCourseFilters(faculty: string, level: string) {
  const courses = getCourses(faculty, level)
  return {
    campuses: [...new Set(courses.map((course) => course.location))],
    languages: [...new Set(courses.map((course) => course.language))],
  }
}
