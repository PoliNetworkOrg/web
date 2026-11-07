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
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      {/* From md the text lines up with the name: trigger padding (32) + logo (64) + gap (24) */}
      <div className={cn("typo-body-large px-4 pb-6 sm:px-5 md:pr-16 md:pb-8 md:pl-30", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}
