import * as AccordionPrimitive from "@radix-ui/react-accordion"
import type * as React from "react"
import { FiChevronRight } from "react-icons/fi"
import { cn } from "@/lib/utils"

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="relative z-10 flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "relative z-10 flex w-full items-center justify-between gap-4 rounded-3xl p-6 text-left",
          "typo-title-medium text-blue-secondary outline-none transition-colors duration-200",
          "focus-visible:glass-glow focus-visible:ring-2 focus-visible:ring-blue-secondary focus-visible:ring-inset",
          // The chevron nudges toward where the answer opens
          "motion-safe:[&[data-state=closed]:hover>svg]:translate-x-1",
          "[&[data-state=open]>svg]:rotate-90",
          className
        )}
        {...props}
      >
        {children}
        <FiChevronRight className="pointer-events-none size-6 shrink-0 text-blue-secondary transition-transform duration-[280ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] motion-reduce:transition-none" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}
