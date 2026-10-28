import * as TabsPrimitive from "@radix-ui/react-tabs"
import type * as React from "react"

import { cn } from "@/lib/utils"

export function TabsTrigger({ className, children, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "group typo-label-large relative flex items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap rounded-xl bg-transparent px-3 py-1.5",
        // Inactive tabs are buttons too: a light tint on hover, and the site's 2px focus ring for keyboard users
        "outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-secondary focus-visible:ring-inset hover:data-[state=inactive]:bg-white/60",
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
