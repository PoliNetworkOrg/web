"use client"

import * as TabsPrimitive from "@radix-ui/react-tabs"
import { motion } from "motion/react"
import type * as React from "react"

import { cn } from "@/lib/utils"
import { useTabsState } from "./tabs"

export function TabsContent({ className, children, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  const switched = useTabsState()?.switched ?? false

  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-blue-secondary", className)}
      {...props}
    >
      {/* Radix mounts the panel when its tab is picked: it rises in, while the first panel shows as is */}
      <motion.div
        initial={switched ? { opacity: 0, y: 12 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </TabsPrimitive.Content>
  )
}
