import * as TabsPrimitive from "@radix-ui/react-tabs"
import type * as React from "react"

import { cn } from "@/lib/utils"

export function TabsTrigger({ className, children, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "typo-label-large flex items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-transparent px-3 py-1.5",
        "outline-none transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-blue-secondary focus-visible:ring-inset data-[state=active]:bg-blue-tertiary hover:data-[state=inactive]:bg-white/60",
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.Trigger>
  )
}
