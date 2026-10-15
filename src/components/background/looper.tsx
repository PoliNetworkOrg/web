import type { CSSProperties } from "react"
import line from "@/assets/shapes/looper-line.webp"
import { cn } from "@/lib/utils"

/**
 * Animatable version of `assets/shapes/looper.svg`.
 *
 * The original is 19 copies of the same curve, each rotated 6° more than the
 * previous one around its own pivot. Here every line is an element showing
 * the same rasterized curve (a single texture for the GPU, so rotating lines
 * never triggers a repaint), rotated around its pivot. `lineAngle` adds an
 * extra rotation proportional to the distance from the middle line, which
 * opens and closes the fan.
 */
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

/** Size of the original SVG and box of `looper-line.webp` (the curve plus its stroke) in it */
const VIEW = { width: 1610, height: 1562 }
const LINE = { x: 425, y: -3, width: 254, height: 1520 }

export const LOOPER_ASPECT = VIEW.height / VIEW.width

/** Rotation of the line `i`, `spread` is the extra angle between consecutive lines */
export const lineAngle = (i: number, spread: number) => (i - LAST) * 6 + (i - MIDDLE) * spread

const percent = (value: number) => `${value * 100}%`

export function Looper({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div aria-hidden className={cn("relative", className)} style={style}>
      {PIVOTS.map(([x, y], i) => (
        <span
          key={`${x}-${y}`}
          className="absolute"
          style={{
            left: percent(LINE.x / VIEW.width),
            top: percent(LINE.y / VIEW.height),
            width: percent(LINE.width / VIEW.width),
            height: percent(LINE.height / VIEW.height),
            backgroundImage: `url(${line.src})`,
            backgroundSize: "100% 100%",
            opacity: (i + 1) / PIVOTS.length,
            transformOrigin: `${percent((x - LINE.x) / LINE.width)} ${percent((y - LINE.y) / LINE.height)}`,
            transform: `rotate(${lineAngle(i, 0)}deg)`,
          }}
        />
      ))}
    </div>
  )
}
