"use client"

import * as TabsPrimitive from "@radix-ui/react-tabs"
import { motion } from "motion/react"
import type * as React from "react"

import { cn } from "@/lib/utils"
import { useTabsState } from "./tabs"

export function TabsTrigger({ className, children, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const tabs = useTabsState()
  const active = tabs?.value === props.value

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "press-feedback typo-label-large relative isolate flex items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-transparent px-3 py-1.5",
        "focus-visible:data-[state=inactive]:glass-glow hover:data-[state=inactive]:glass-glow outline-none focus-visible:ring-2 focus-visible:ring-blue-secondary focus-visible:ring-inset",
        // Without the shared state (outside `Tabs`) the active tab keeps a static fill
        !tabs && "data-[state=active]:bg-blue-tertiary",
        className
      )}
      {...props}
    >
      {/* The active fill slides from the previous tab to the new one */}
      {active && tabs && (
        <motion.span
          layoutId={tabs.layoutId}
          aria-hidden
          className="-z-10 absolute inset-0 rounded-xl bg-blue-tertiary"
          transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
        />
      )}
      {children}
    </TabsPrimitive.Trigger>
  )
}
