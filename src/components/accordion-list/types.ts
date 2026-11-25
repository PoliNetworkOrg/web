export type AccordionListItem = {
  value: string
  /** Makes the item an anchor (`#id`), scrolled to with room for the header above it */
  id?: string
  trigger: React.ReactNode
  content: React.ReactNode
}

export type AccordionListProps = {
  items: AccordionListItem[]
  defaultValue?: string
  className?: string
  /** Extra classes for every header and every answer, e.g. to line the answer up with a logo in the header */
  triggerClassName?: string
  contentClassName?: string
}
