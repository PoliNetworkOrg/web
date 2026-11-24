"use client"

import { motion, useInView, useReducedMotion } from "motion/react"
import { useRef } from "react"
import { cn } from "@/lib/utils"

const EASE_OUT = [0.22, 1, 0.36, 1] as const

/** Which way the line fills: down, across, or down on phones and across from lg or sm (timelines that turn there) */
type Direction = "down" | "across" | "down-then-across" | "down-then-across-sm"

const FILL: Record<Direction, string> = {
  down: "origin-top scale-x-100 scale-y-(--fill)",
  across: "origin-left scale-x-(--fill) scale-y-100",
  "down-then-across": "origin-top scale-x-100 scale-y-(--fill) lg:origin-left lg:scale-x-(--fill) lg:scale-y-100",
  "down-then-across-sm": "origin-top scale-x-100 scale-y-(--fill) sm:origin-left sm:scale-x-(--fill) sm:scale-y-100",
}

/**
 * A timeline's line: a light blue track that fills with blue from its start to its end the first time it comes into
 * view. `delay` makes the lines of one timeline fill one after the other. With reduced motion it is shown filled.
 * `className` places and sizes the track.
 */
export function FillLine({
  direction,
  delay = 0,
  className,
  fillClassName,
}: {
  direction: Direction
  delay?: number
  className?: string
  /** The fill's colour, when it isn't the plain blue (a gradient, for example) */
  fillClassName?: string
}) {
  const reduceMotion = useReducedMotion()
  // The track is watched, not the fill: the fill starts with no width or height, which the browser can't tell in view
  const track = useRef<HTMLSpanElement>(null)
  const inView = useInView(track, { once: true, amount: 0.5 })
  return (
    <span ref={track} aria-hidden className={cn("overflow-hidden rounded-full bg-blue-primary/25", className)}>
      <motion.span
        className={cn("block size-full rounded-full bg-blue-primary", FILL[direction], fillClassName)}
        initial={{ "--fill": reduceMotion ? 1 : 0 } as Record<string, number>}
        animate={{ "--fill": inView || reduceMotion ? 1 : 0 } as Record<string, number>}
        // `MotionConfig reducedMotion` leaves CSS variables alone, hence the explicit check
        transition={reduceMotion ? { duration: 0 } : { duration: 0.8, delay, ease: EASE_OUT }}
      />
    </span>
  )
}
