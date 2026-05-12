import * as TabsPrimitive from "@radix-ui/react-tabs"
import type * as React from "react"

import { cn } from "@/lib/utils"
import { Glass } from "../glass"

export function TabsList({ className, children, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <div className="w-full sm:flex sm:justify-center">
      <Glass
        className={cn(
          "w-full overflow-hidden rounded-3xl border-white/50 bg-background-blur p-2.5 text-card-foreground sm:w-fit",
          className
        )}
      >
        <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <TabsPrimitive.List
            data-slot="tabs-list"
            className="flex min-w-max items-center gap-2"
            {...props}
          >
            {children}
          </TabsPrimitive.List>
        </div>
      </Glass>
    </div>
  )
}
