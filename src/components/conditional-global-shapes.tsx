"use client"

import { usePathname } from "next/navigation"
import { Shape } from "@/components/shapes"

const HIDDEN_EXACT = ["/"]

/**
 * Generic top-of-page decorative shapes, reused on every page that doesn't
 * define its own (e.g. the homepage, which has a Figma-accurate composition).
 */
export function ConditionalGlobalShapes() {
  const pathname = usePathname()
  if (HIDDEN_EXACT.includes(pathname)) return null

  return (
    <div aria-hidden className="-z-10 pointer-events-none fixed inset-0 overflow-hidden">
      <div className="*:-translate-x-1/2 contents">
        <Shape variant="big-teal" className="top-2 left-1/2" />
        <Shape variant="small-blue" className="top-2 left-1/4 translate-y-1/2" />
        <Shape variant="big-blue" className="-translate-y-1/2 top-0 left-1/2" />
        <Shape variant="looper" className="-translate-y-1/2 top-1/2 left-1/2" />
      </div>
    </div>
  )
}
