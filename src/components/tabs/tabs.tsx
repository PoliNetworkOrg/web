import * as TabsPrimitive from "@radix-ui/react-tabs"
import { MotionConfig } from "motion/react"
import type * as React from "react"
import { createContext, useContext, useId, useState } from "react"

import { cn } from "@/lib/utils"

type TabsState = {
  value: string | undefined
  /** Unique per tab strip, so the active pill only slides between this strip's tabs */
  layoutId: string
  /** False until the user picks a tab: the first panel shows without animating on page load */
  switched: boolean
}

const TabsContext = createContext<TabsState | null>(null)

export const useTabsState = () => useContext(TabsContext)

export function Tabs({
  className,
  value: valueProp,
  defaultValue,
  onValueChange,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  const [internal, setInternal] = useState(defaultValue)
  const [switched, setSwitched] = useState(false)
  const value = valueProp ?? internal
  const layoutId = useId()

  return (
    <TabsContext.Provider value={{ value, layoutId, switched }}>
      <MotionConfig reducedMotion="user">
        <TabsPrimitive.Root
          data-slot="tabs"
          className={cn("group/tabs flex flex-col gap-2", className)}
          value={value}
          onValueChange={(next) => {
            setInternal(next)
            setSwitched(true)
            onValueChange?.(next)
          }}
          {...props}
        />
      </MotionConfig>
    </TabsContext.Provider>
  )
}
