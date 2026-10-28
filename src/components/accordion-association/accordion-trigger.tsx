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
          // Same padding open or closed: the name doesn't jump when the item expands
          "flex w-full cursor-pointer items-center justify-between gap-3 p-4 text-left outline-none sm:gap-4 sm:p-5 md:px-8 md:py-6",
          "typo-headline-extrasmall sm:typo-title-large md:typo-headline-medium",
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
