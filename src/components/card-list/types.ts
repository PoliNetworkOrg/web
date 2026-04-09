export type CardListSection = {
  title?: string
  paragraphs: readonly string[]
}

export type CardListAccordionItem = {
  label: string
  paragraphs: readonly string[]
}

export type CardListProps = {
  sections: readonly CardListSection[]
  items?: readonly CardListAccordionItem[]
  className?: string
}
