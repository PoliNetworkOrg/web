import * as TabsPrimitive from "@radix-ui/react-tabs"
import type * as React from "react"
import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"
import { Glass } from "../glass"

export function TabsList({ className, children, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  // On phones the strip scrolls: bring the initially selected tab into view (e.g. the latest board on /storia),
  // moving only the strip and not the page
  useEffect(() => {
    const scroller = scrollerRef.current
    const active = scroller?.querySelector<HTMLElement>('[role="tab"][data-state="active"]')
    if (!scroller || !active) return
    // 40px: the strip's own padding, so the tab clears the faded edge
    const overflowRight = active.getBoundingClientRect().right - scroller.getBoundingClientRect().right
    if (overflowRight > 0) scroller.scrollLeft += overflowRight + 40
  }, [])

  return (
    <div className="w-full sm:flex sm:justify-center">
      <Glass
        className={cn(
          "scroll-fade-x w-full overflow-hidden rounded-3xl border-white/50 bg-background-blur px-0 py-2.5 text-card-foreground sm:w-fit",
          className
        )}
      >
        <div ref={scrollerRef} className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <TabsPrimitive.List
            data-slot="tabs-list"
            className="flex min-w-max items-center gap-2 px-2.5 max-md:px-10"
            {...props}
          >
            {children}
          </TabsPrimitive.List>
        </div>
      </Glass>
    </div>
  )
}
