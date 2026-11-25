import * as AccordionPrimitive from "@radix-ui/react-accordion"
import type * as React from "react"
import { cn } from "@/lib/utils"

export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="relative z-10 overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("typo-body-large max-w-[70ch] text-pretty px-6 pb-6", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}
