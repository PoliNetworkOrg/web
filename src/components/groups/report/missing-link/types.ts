export type ReportMissingLinkStep = "category" | "school" | "level" | "course" | "details"

export type ReportMissingLinkCategory = "didattica" | "extra"

export type ReportMissingLinkSelection = {
  school: string | null
  level: string | null
  course: string | null
}
