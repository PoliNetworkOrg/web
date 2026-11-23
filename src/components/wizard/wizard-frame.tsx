"use client"

import { useSelectedLayoutSegments } from "next/navigation"
import { type ReactNode, useLayoutEffect, useRef, useState } from "react"
import { Glass } from "@/components/glass"

/**
 * The wizard's card, rendered by the layout of the flow (school → level → course) so it stays mounted while the user
 * moves between steps: it doesn't flash with the page, and when a step is taller or shorter it grows or shrinks
 * smoothly instead of jumping. The results page that follows the last step (`depth` segments below the layout) has its
 * own layout, so the card is left out there.
 */
export function WizardFrame({ depth, children }: { depth: number; children: ReactNode }) {
  const framed = useSelectedLayoutSegments().length < depth
  const contentRef = useRef<HTMLDivElement>(null)
  // Unset until measured: the server and the first paint use the content's natural height
  const [height, setHeight] = useState<number>()

  // Re-run when the card comes back: its content is a new element then
  useLayoutEffect(() => {
    const content = contentRef.current
    if (!framed || !content) return
    const observer = new ResizeObserver(() => setHeight(content.offsetHeight))
    observer.observe(content)
    return () => observer.disconnect()
  }, [framed])

  if (!framed) return children

  return (
    <main className="flex min-h-svh w-full min-w-0 flex-col items-center px-6 py-50 md:py-52">
      {/* Anchored to the top, not centred: centred, it would also move while changing height */}
      <Glass className="mx-auto w-full max-w-7xl border-0 bg-transparent p-0 backdrop-blur-none md:rounded-rectangles md:border md:border-white/50 md:bg-background-blur md:backdrop-blur-md">
        {/* The animated box clips the new step while it grows to its height */}
        <div
          className="overflow-hidden transition-[height] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ height }}
        >
          <div
            ref={contentRef}
            className="relative flex min-h-146 flex-col gap-10 md:min-h-157 md:gap-15 md:px-10 md:py-12.5 lg:px-25"
          >
            {children}
          </div>
        </div>
      </Glass>
    </main>
  )
}
