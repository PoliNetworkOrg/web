export type Campus = "Milano Leonardo" | "Milano Bovisa" | "Cremona" | "Lecco" | "Mantova" | "Piacenza" | "Xi'an"
export type Language = "ITA" | "ENG"

export type Faculty = { slug: string; name: string }
export type Level = { slug: string; name: string }
export type Course = { slug: string; name: string; location: Campus; language: Language }

export type WizardParams = {
  school?: string
  level?: string
  course?: string
  campus?: string
  lang?: string
}
