import * as AccordionPrimitive from "@radix-ui/react-accordion"
import type * as React from "react"
import { cn } from "@/lib/utils"

export function Accordion({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" className={cn("flex flex-col gap-4", className)} {...props} />
}
