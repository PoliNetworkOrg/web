import * as AccordionPrimitive from "@radix-ui/react-accordion"
import type * as React from "react"
import { Glass } from "@/components/glass"
import { cn } from "@/lib/utils"

export function AccordionItem({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item data-slot="accordion-item" className="overflow-hidden" {...props}>
      <Glass className={cn("rounded-3xl border-white/50 bg-background-blur p-0 text-card-foreground", className)}>
        {children}
      </Glass>
    </AccordionPrimitive.Item>
  )
}
