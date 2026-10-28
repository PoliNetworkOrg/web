import * as AccordionPrimitive from "@radix-ui/react-accordion"
import type * as React from "react"
import { Glass } from "@/components/glass"
import { cn } from "@/lib/utils"
import { AccordionBackground } from "./accordion-background"

export function AccordionItem({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item data-slot="accordion-item" className="group/accordion relative" {...props}>
      <Glass
        className={cn(
          "relative overflow-hidden rounded-3xl border-white/50 bg-background-blur p-0 text-card-foreground transition-colors",
          // The header is the clickable part: it brightens on hover and rings the item on keyboard focus
          "has-[[data-slot=accordion-trigger]:hover]:border-white has-[[data-slot=accordion-trigger]:hover]:bg-white/50 has-[[data-slot=accordion-trigger]:focus-visible]:ring-2 has-[[data-slot=accordion-trigger]:focus-visible]:ring-blue-secondary",
          className
        )}
      >
        <AccordionBackground />
        <div className="relative z-10">{children}</div>
      </Glass>
    </AccordionPrimitive.Item>
  )
}
