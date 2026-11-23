"use client"

import { MotionConfig } from "motion/react"
import { useState } from "react"
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
  // Controlled, so each answer knows whether it is open and animates its own height
  const [value, setValue] = useState(defaultValue ?? "")

  return (
    // Respects the OS "reduce motion" setting: the answers then fade without moving
    <MotionConfig reducedMotion="user">
      <Accordion type="single" collapsible value={value} onValueChange={setValue} className={className}>
        {items.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger className={triggerClassName}>{item.trigger}</AccordionTrigger>
            <AccordionContent open={value === item.value} className={contentClassName}>
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </MotionConfig>
  )
}
