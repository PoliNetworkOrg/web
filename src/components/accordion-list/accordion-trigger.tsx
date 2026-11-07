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
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex w-full items-center justify-between gap-4 p-6 text-left",
          "typo-title-medium text-blue-secondary outline-none transition-colors",
          // The header is the only clickable part: it alone reacts to hover and keyboard focus
          "hover:bg-white/40 focus-visible:ring-2 focus-visible:ring-blue-secondary focus-visible:ring-inset",
          "[&[data-state=open]>svg]:rotate-90",
          className
        )}
        {...props}
      >
        {children}
        <FiChevronRight className="pointer-events-none size-6 shrink-0 text-blue-secondary transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}
