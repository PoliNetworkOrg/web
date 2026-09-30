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
      className="group overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div
        className={cn(
          "typo-body-large pt-0 transition-all duration-500",
          "group-data-[state=closed]:px-6 group-data-[state=open]:px-16",
          "group-data-[state=closed]:pb-0 group-data-[state=open]:pb-16",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}
