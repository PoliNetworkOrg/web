import type { PillVariant } from "@/components/ui/pill"

export type PillTag = {
  text: string
  variant: PillVariant
}

export type CardResourceProps = {
  tag: PillTag | PillTag[]
  title: string
  description: string
  author: string
  date: string
  bookmarked?: boolean
  href?: string
  className?: string
}
