import type { IconType } from "react-icons"

export type School = { slug: string; name: string }
/** `icon` tells the levels apart at a glance, in the wizard and in the missing-link report */
export type Level = { slug: string; name: string; icon: IconType }

export type CourseSearchParams = {
  campus?: string
  lang?: string
}
