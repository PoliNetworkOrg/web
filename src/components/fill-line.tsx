import { animate, motion, useAnimationFrame, useInView, useReducedMotion, useScroll } from "motion/react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { fillOnceAt } from "@/utils/fill-loop"

/** Which way the line fills: down, across, or down on phones and across from lg or sm (timelines that turn there) */
type Direction = "down" | "across" | "down-then-across" | "down-then-across-sm"

const SCALE: Record<Direction, string> = {
  down: "origin-top scale-x-100 scale-y-(--fill)",
  across: "origin-left scale-x-(--fill) scale-y-100",
  "down-then-across": "origin-top scale-x-100 scale-y-(--fill) lg:origin-left lg:scale-x-(--fill) lg:scale-y-100",
  "down-then-across-sm": "origin-top scale-x-100 scale-y-(--fill) sm:origin-left sm:scale-x-(--fill) sm:scale-y-100",
}

const starts = new WeakMap<HTMLElement, number>()

/**
 * A light blue track that fills once. Line `step` fills when the one before it is full and then stays full.
 * Each list's clock starts when it first enters the viewport, so its first frame is empty.
 * It only runs while the line is on screen. With reduced motion the line is full.
 * `className` places and sizes the track.
 */
export function FillLine({
  direction,
  step = 0,
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
  const started = useRef<number | null>(null)

  useAnimationFrame(() => {
    if (!inView || reduceMotion || !fill.current) return
    const now = performance.now() / 1000
    if (started.current === null) {
      const list = track.current?.closest("ol")
      started.current = (list && starts.get(list)) ?? now
      if (list) starts.set(list, started.current)
    }
    fill.current.style.setProperty("--fill", String(fillOnceAt(now - started.current, step)))
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

/** Reading progress: each segment follows the scroll, reversing when the reader goes back up. */
export function ScrollFillLine({ className }: { className?: string }) {
  const track = useRef<HTMLSpanElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start 0.7", "end 0.7"],
    trackContentSize: true,
  })

  return (
    <span ref={track} aria-hidden className={cn("overflow-hidden rounded-full bg-blue-primary/25", className)}>
      <motion.span
        className="block size-full origin-top rounded-full bg-blue-primary"
        style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
      />
    </span>
  )
}

/** When the last line of each list will be full: the next one waits for it, so the lines fill one after the other */
const queues = new WeakMap<Element, Promise<void>>()

/**
 * Reading progress that plays by itself: a segment fills once it is past 70% of the screen, like `ScrollFillLine`,
 * but on its own clock instead of following the scroll, and it stays full when the reader goes back up. Segments of
 * the same list that reach that point together fill one after the other. In a closed accordion the segment is clipped,
 * so it fills when the accordion is opened and the segment is on screen. With reduced motion the line is full.
 */
export function RevealFillLine({ className }: { className?: string }) {
  const track = useRef<HTMLSpanElement>(null)
  const fill = useRef<HTMLSpanElement>(null)
  const reduceMotion = useReducedMotion()
  // Half the segment visible above the 70% line: a segment clipped by a closed accordion is never half visible
  const reached = useInView(track, { once: true, amount: 0.5, margin: "0px 0px -30% 0px" })

  useEffect(() => {
    const el = fill.current
    if (!reached || reduceMotion || !el) return
    const list = track.current?.closest("ol") ?? el
    const run: { cancelled: boolean; stop?: () => void } = { cancelled: false }
    const done = (queues.get(list) ?? Promise.resolve()).then(() => {
      if (run.cancelled) return
      const controls = animate(el, { scaleY: [0, 1] }, { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] })
      run.stop = () => controls.stop()
      return controls.finished.then(() => undefined)
    })
    queues.set(list, done)
    return () => {
      run.cancelled = true
      run.stop?.()
    }
  }, [reached, reduceMotion])

  return (
    <span ref={track} aria-hidden className={cn("overflow-hidden rounded-full bg-blue-primary/25", className)}>
      <span
        ref={fill}
        className="block size-full origin-top rounded-full bg-blue-primary"
        style={{ transform: reduceMotion ? "none" : "scaleY(0)" }}
      />
    </span>
  )
}
