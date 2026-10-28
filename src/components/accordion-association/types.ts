import type { StaticImageData } from "next/image"
import type { GradientIconType } from "../gradient-icon"

export type AccordionAssociationItem = {
  value: string
  name: string
  /** `null` when the association has no logo: its initials are shown instead */
  logo: StaticImageData | string | null
  content: React.ReactNode
  links: {
    key: string
    href: string
    icon: GradientIconType
  }[]
}

export type AccordionAssociationProps = {
  accordionItems: AccordionAssociationItem[]
  defaultValue?: string
}
