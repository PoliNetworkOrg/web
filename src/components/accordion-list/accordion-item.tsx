import * as AccordionPrimitive from "@radix-ui/react-accordion"
import type * as React from "react"
import { AccordionHoverBackground } from "@/components/accordion-list/hover-background"
import { Glass } from "@/components/glass"
import { cn } from "@/lib/utils"

export function AccordionItem({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item data-slot="accordion-item" className="overflow-hidden" {...props}>
      <Glass className={cn("group/accordion relative overflow-hidden rounded-3xl p-0 text-card-foreground", className)}>
        <AccordionHoverBackground />
        {children}
      </Glass>
    </AccordionPrimitive.Item>
  )
}
