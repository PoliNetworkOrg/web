import { Accordion } from "./accordion"
import { AccordionContent } from "./accordion-content"
import { AccordionItem } from "./accordion-item"
import { AccordionTrigger } from "./accordion-trigger"
import type { AccordionListProps } from "./types"

export default function AccordionList({
  items,
  defaultValue,
  className,
  triggerClassName,
  contentClassName,
}: AccordionListProps) {
  return (
    <Accordion type="single" collapsible defaultValue={defaultValue} className={className}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger className={triggerClassName}>{item.trigger}</AccordionTrigger>
          <AccordionContent className={contentClassName}>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
