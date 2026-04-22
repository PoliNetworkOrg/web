import * as TabsPrimitive from "@radix-ui/react-tabs"
import type * as React from "react"

import { cn } from "@/lib/utils"

export function TabsTrigger({ className, children, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "group typo-label-large relative flex items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap rounded-xl bg-transparent px-3 py-1.5",
        // "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50", // TODO Focus ring for accessibility - do we have a standard focus style?
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-xl bg-blue-tertiary opacity-0 transition-opacity duration-500 ease-in-out group-data-[state=active]:opacity-100"
      />
      <span className="relative z-10 flex items-center justify-center gap-1.5">{children}</span>
    </TabsPrimitive.Trigger>
  )
}
