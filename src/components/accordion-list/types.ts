export type AccordionListItem = {
    value: string
    trigger: React.ReactNode
    content: React.ReactNode
}

export type AccordionListProps = {
    items: AccordionListItem[]
    defaultValue?: string
    className?: string
}