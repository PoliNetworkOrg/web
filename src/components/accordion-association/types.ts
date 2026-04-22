import type { StaticImageData } from "next/image"
import type { GradientIconType } from "../gradient-icon"

export type AccordionAssociationItem = {
  value: string
  name: string
  logo: StaticImageData
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
