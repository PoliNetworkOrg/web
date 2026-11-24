import * as AccordionPrimitive from "@radix-ui/react-accordion"
import type * as React from "react"
import { Glass } from "@/components/glass"
import { cn } from "@/lib/utils"

export function AccordionItem({
  className,
  rootClassName,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item> & {
  /** Classes for the item itself; `className` styles the card inside it */
  rootClassName?: string
}) {
  return (
    <AccordionPrimitive.Item data-slot="accordion-item" className={cn("overflow-hidden", rootClassName)} {...props}>
      <Glass
        className={cn(
          "group/accordion relative overflow-hidden rounded-3xl border-white/50 bg-background-blur p-0 text-card-foreground",
          className
        )}
      >
        {children}
      </Glass>
    </AccordionPrimitive.Item>
  )
}
