/** Seconds a line takes to fill, how long the full timeline holds, and how long it takes to empty before starting over */
const FILL = 1
const HOLD = 1.5
const EMPTY = 0.5

/** A decorative sequence fills once and holds, without resetting when it returns into view. */
export function fillOnceAt(seconds: number, step: number) {
  return Math.min(1, Math.max(0, (seconds - step * FILL) / FILL))
}

/**
 * How full (0 to 1) line `step` of a timeline of `steps` lines is, `seconds` into the page's clock. The lines fill one
 * after the other, the timeline holds full, then every line empties together and the loop starts again.
 */
export function fillAt(seconds: number, step: number, steps: number) {
  const loop = steps * FILL + HOLD + EMPTY
  const t = seconds % loop
  if (t > loop - EMPTY) return 1 - (t - (loop - EMPTY)) / EMPTY
  return fillOnceAt(t, step)
}
