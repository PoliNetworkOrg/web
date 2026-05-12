import * as TabsPrimitive from "@radix-ui/react-tabs"
import type * as React from "react"

import { cn } from "@/lib/utils"
import { Glass } from "../glass"

export function TabsList({ className, children, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List data-slot="tabs-list" {...props}>
      <Glass
        className={cn(
          "inline-flex items-center gap-2 rounded-3xl border-white/50 bg-background-blur p-2.5 text-card-foreground",
          className
        )}
      >
        {children}
      </Glass>
    </TabsPrimitive.List>
  )
}
