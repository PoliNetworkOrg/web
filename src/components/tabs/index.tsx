"use client"

import { cn } from "@/lib/utils"
import { TabsList } from "./tabs-list"
import { TabsTrigger } from "./tabs-trigger"
import type { TabsNavigationProps } from "./types"

export default function TabsNavigation({ items, className }: TabsNavigationProps) {
  return (
    <TabsList className={cn(className)}>
      {items.map((item) => {
        const Icon = item.icon

        return (
          <TabsTrigger value={item.value} key={item.value}>
            {Icon && <Icon className="size-4 shrink-0" />}
            {item.label}
          </TabsTrigger>
        )
      })}
    </TabsList>
  )
}
