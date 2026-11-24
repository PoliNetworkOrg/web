/**
 * Drawable version of `assets/shapes/looper.svg`.
 *
 * The original is 19 copies of the same curve, each rotated 6° more than the
 * previous one around its own pivot. The loopers of the background are
 * stroked on a canvas from that one curve (see `animate.ts`): a path drawn at
 * its final size and angle stays as sharp as the SVG on any screen, where a
 * rotated bitmap of it was resampled and went soft. `lineAngle` adds an extra
 * rotation proportional to the distance from the middle line, which opens and
 * closes the fan.
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

/** Size of the original SVG */
const VIEW = { width: 1610, height: 1562 }

/** The last (unrotated, fully opaque) line of the SVG: the others are it, rotated around their pivot */
const CURVE =
  "M588.026 1.419c-53.471 18.339-158.931 98.214-153 271.006 7.414 215.991 169.177 351.154 209.617 554.919 29.848 150.393 25.612 527.066-156.37 685.326"

/** Stroke of every line, as in the SVG: `stroke-width`, colour and `stroke-opacity` */
const STROKE = { width: 3, color: "#f8fafc", opacity: 0.4 }

export const LOOPER_ASPECT = VIEW.height / VIEW.width

/** Rotation of the line `i`, `spread` is the extra angle between consecutive lines */
export const lineAngle = (i: number, spread: number) => (i - LAST) * 6 + (i - MIDDLE) * spread

/** The curve, parsed once: `Path2D` only exists in the browser */
let curve: Path2D | undefined

/**
 * Strokes a looper on `ctx`, whose transform maps the SVG's coordinates to the canvas (its center at the origin, one
 * unit of the SVG as wide as it should be), with `spread` degrees more between consecutive lines than in the SVG.
 */
export function drawLooper(ctx: CanvasRenderingContext2D, spread: number) {
  curve ??= new Path2D(CURVE)
  ctx.lineWidth = STROKE.width
  ctx.strokeStyle = STROKE.color
  ctx.translate(-VIEW.width / 2, -VIEW.height / 2)
  for (const [i, [x, y]] of PIVOTS.entries()) {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate((lineAngle(i, spread) * Math.PI) / 180)
    ctx.translate(-x, -y)
    // each line is more opaque than the one before, as in the SVG
    ctx.globalAlpha = (STROKE.opacity * (i + 1)) / PIVOTS.length
    ctx.stroke(curve)
    ctx.restore()
  }
}

/** Width of the SVG, in its units: a looper `size` px wide draws one unit as `size / LOOPER_WIDTH` px */
export const LOOPER_WIDTH = VIEW.width
