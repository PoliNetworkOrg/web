import * as AccordionPrimitive from "@radix-ui/react-accordion"
import type * as React from "react"
import { FiChevronDown } from "react-icons/fi"
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
          "flex w-full items-center justify-between gap-4 text-left",
          "typo-display-medium outline-none",
          "transition-all duration-500 data-[state=closed]:p-6 data-[state=open]:px-16",
          "data-[state=open]:pt-16 data-[state=open]:pb-8",
          "[&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <FiChevronDown className="pointer-events-none size-6 shrink-0 text-blue-secondary transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}
