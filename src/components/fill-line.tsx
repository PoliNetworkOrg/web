"use client"

import { useAnimationFrame, useInView, useReducedMotion } from "motion/react"
import { useRef } from "react"
import { cn } from "@/lib/utils"
import { fillAt } from "@/utils/fill-loop"

/** Which way the line fills: down, across, or down on phones and across from lg or sm (timelines that turn there) */
type Direction = "down" | "across" | "down-then-across" | "down-then-across-sm"

const SCALE: Record<Direction, string> = {
  down: "origin-top scale-x-100 scale-y-(--fill)",
  across: "origin-left scale-x-(--fill) scale-y-100",
  "down-then-across": "origin-top scale-x-100 scale-y-(--fill) lg:origin-left lg:scale-x-(--fill) lg:scale-y-100",
  "down-then-across-sm": "origin-top scale-x-100 scale-y-(--fill) sm:origin-left sm:scale-x-(--fill) sm:scale-y-100",
}

/**
 * A timeline's line: a light blue track that fills with blue, in a loop. In a timeline of `steps` lines, line `step`
 * fills when the one before it is full, so the timeline fills as one line from its start to its end, holds, empties
 * and starts again. The loop runs on the page's clock, so the lines of one timeline stay in step even when they come
 * into view at different times; it only runs while the line is on screen. With reduced motion the line is full.
 * `className` places and sizes the track.
 */
export function FillLine({
  direction,
  step = 0,
  steps = 1,
  className,
  fillClassName,
}: {
  direction: Direction
  step?: number
  steps?: number
  className?: string
  /** The fill's colour, when it isn't the plain blue (a gradient, for example) */
  fillClassName?: string
}) {
  const reduceMotion = useReducedMotion()
  // The track is watched, not the fill: the fill can have no width or height, which the browser can't tell in view
  const track = useRef<HTMLSpanElement>(null)
  const fill = useRef<HTMLSpanElement>(null)
  const inView = useInView(track)

  useAnimationFrame(() => {
    if (!inView || reduceMotion || !fill.current) return
    fill.current.style.setProperty("--fill", String(fillAt(performance.now() / 1000, step, steps)))
  })

  return (
    <span ref={track} aria-hidden className={cn("overflow-hidden rounded-full bg-blue-primary/25", className)}>
      <span
        ref={fill}
        className={cn("block size-full rounded-full bg-blue-primary", SCALE[direction], fillClassName)}
        style={{ "--fill": reduceMotion ? 1 : 0 } as React.CSSProperties}
      />
    </span>
  )
}
