"use client"

import * as TabsPrimitive from "@radix-ui/react-tabs"
import type * as React from "react"

import { cn } from "@/lib/utils"
import { Glass } from "../glass"

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn("group/tabs flex flex-col gap-2", className)} {...props} />
}

function TabsList({ className, children, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
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

function TabsTrigger({ className, children, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
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

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn("flex-1 outline-none", className)} {...props} />
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
