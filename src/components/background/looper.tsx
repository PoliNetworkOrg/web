import type { CSSProperties } from "react"

/**
 * Inline version of `assets/shapes/looper.svg`, so each line can be animated.
 *
 * The original is 19 copies of the same curve, each rotated 6° more than the
 * previous one around its own pivot (the copies also drift slightly). Only
 * the last curve is kept here, the others are rebuilt from their pivot. The
 * `looper-fan` animation adds a tiny extra rotation proportional to the
 * line's distance from the middle one, which opens and closes the fan.
 */
const CURVE =
  "M588.026 1.419c-53.471 18.339-158.931 98.214-153 271.006 7.414 215.991 169.177 351.154 209.617 554.919 29.848 150.393 25.612 527.066-156.37 685.326"

const PIVOTS = [
  [814, 799],
  [811, 785],
  [808, 771],
  [805, 757],
  [801, 744],
  [797, 731],
  [792, 718],
  [787, 706],
  [782, 694],
  [776, 682],
  [770, 671],
  [764, 660],
  [757, 650],
  [750, 639],
  [743, 630],
  [735, 620],
  [728, 610],
  [719, 601],
  [710, 592],
] as const

const LAST = PIVOTS.length - 1
const MIDDLE = LAST / 2

export const LOOPER_ASPECT = 1562 / 1610

export function Looper({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1610 1562" fill="none" className={className} style={style}>
      {PIVOTS.map(([x, y], i) => (
        <path
          key={`${x}-${y}`}
          d={CURVE}
          stroke="#f8fafc"
          strokeOpacity={0.4}
          strokeWidth={3}
          opacity={(i + 1) / PIVOTS.length}
          className="looper-fan"
          style={
            {
              transform: `rotate(${(i - LAST) * 6}deg)`,
              transformOrigin: `${x}px ${y}px`,
              "--fan-index": i - MIDDLE,
            } as CSSProperties
          }
        />
      ))}
    </svg>
  )
}
