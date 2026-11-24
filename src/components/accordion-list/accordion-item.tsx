import * as AccordionPrimitive from "@radix-ui/react-accordion"
import type * as React from "react"
import { CardHoverBackground } from "@/components/card-icon/hover-background"
import { Glass } from "@/components/glass"
import { cn } from "@/lib/utils"

export function AccordionItem({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item data-slot="accordion-item" className="overflow-hidden" {...props}>
      <Glass
        className={cn(
          "group/accordion relative overflow-hidden rounded-3xl border-white/50 bg-background-blur p-0 text-card-foreground",
          "has-[[data-slot=accordion-trigger]:focus-visible]:ring-2 has-[[data-slot=accordion-trigger]:focus-visible]:ring-blue-secondary has-[[data-slot=accordion-trigger]:focus-visible]:ring-inset",
          className
        )}
      >
        {/* The site's card hover, over the whole card: only the header is clickable, so only its hover shows it */}
        <CardHoverBackground className="group-has-[[data-slot=accordion-trigger]:hover]/accordion:opacity-100" />
        {children}
      </Glass>
    </AccordionPrimitive.Item>
  )
}
