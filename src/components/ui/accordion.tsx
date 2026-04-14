"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import type * as React from "react"
import { FiChevronRight } from "react-icons/fi"
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
          "flex w-full items-center justify-between gap-4 p-6 text-left",
          "typo-title-medium text-blue-secondary outline-none",
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

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("typo-body-large px-6 pt-0 pb-6", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
