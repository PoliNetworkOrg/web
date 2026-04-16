"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import type * as React from "react"
import { FiChevronDown } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { cn } from "@/lib/utils"

function Accordion({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" className={cn("flex flex-col gap-4", className)} {...props} />
}

function AccordionItem({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item data-slot="accordion-item" className="overflow-hidden" {...props}>
      <Glass className={cn("rounded-3xl border-white/50 bg-background-blur p-0 text-card-foreground", className)}>
        {children}
      </Glass>
    </AccordionPrimitive.Item>
  )
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex w-full items-center justify-between gap-4 text-left",
          "typo-display-medium outline-none",
          "transition-all duration-500 data-[state=closed]:p-6 data-[state=open]:p-16",
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

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
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

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
