import type { BlobVariant } from "@/components/shapes"

export type SceneShape = {
  id: string
  variant: BlobVariant | "looper"
  /** Horizontal center, from -1 (left edge) to 1 (right edge) of the page */
  x: number
  /** Vertical center, in segments from the top of the page */
  y: number
  /** Width, in `--bg-unit`s (≈px on a 1728px wide screen) */
  size: number
  /** Static rotation, in degrees */
  rotate: number
  /** Scroll parallax offset in px, negative is further away (slower than the page) */
  depth: number
  /** Passive motion: drift amplitude (px), sway (deg), breathing scale and timings (s) */
  driftX: number
  driftY: number
  sway: number
  breathe: number
  durX: number
  durY: number
  durSway: number
  /** Looper only: extra rotation per line (deg) and duration (s) of the fan animation */
  fan: number
  durFan: number
}

/** FNV-1a, to turn the pathname into a seed */
function hash(str: string) {
  let h = 0x811c9dc5
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 0x01000193)
  return h >>> 0
}

/** mulberry32, a tiny seeded PRNG */
function prng(seed: number) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Deterministically generates the shapes of one segment (a screen-ish tall
 * slice) of the page background. Every segment has the same composition as
 * the original Figma backgrounds: a teal star overlapping a couple of blue
 * blobs on one side, crossed by a looper, and a smaller counterweight on the
 * other side. Sides alternate between segments, everything else is jittered
 * from a seed derived from the pathname and the segment index, so each page
 * gets its own (but stable across reloads) variation.
 *
 * Animation parameters are seeded by the segment index only: when navigating
 * the same elements glide to the new layout, and changing the parameters of a
 * running animation would make it jump.
 */
export function sceneSegment(pathname: string, index: number): SceneShape[] {
  const seed = hash(pathname)
  const segment = Math.imul(index + 1, 0x9e3779b1)
  const rand = prng(seed ^ segment)
  const between = (min: number, max: number) => min + rand() * (max - min)
  const motion = prng(segment)
  const vary = (min: number, max: number) => min + motion() * (max - min)
  const side = (seed + index) % 2 ? 1 : -1

  const shapes: SceneShape[] = []
  const add = (variant: SceneShape["variant"], x: number, y: number, size: number, depth: [number, number]) => {
    const looper = variant === "looper"
    shapes.push({
      id: `${index}-${shapes.length}`,
      variant,
      x,
      y: index + y,
      size,
      rotate: between(0, 360),
      depth: vary(...depth),
      driftX: vary(12, 32),
      driftY: vary(12, 32),
      sway: looper ? vary(2, 4) : vary(5, 12),
      breathe: looper ? 0 : vary(0.02, 0.05),
      durX: vary(17, 29),
      durY: vary(19, 31),
      durSway: vary(29, 47),
      fan: looper ? vary(0.25, 0.45) : 0,
      durFan: vary(11, 19),
    })
  }

  // main cluster: the blobs overlap, so the looper's white lines show on top of them
  const cx = side * between(0.35, 0.8)
  const cy = between(0.15, 0.45)
  add("big-blue", cx + side * between(-0.1, 0.15), cy - between(0, 0.2), between(650, 900), [-90, -40])
  add("big-teal", cx, cy, between(800, 1050), [-40, 20])
  add("small-blue", cx - side * between(0.1, 0.25), cy + between(0.05, 0.2), between(380, 520), [60, 140])
  add("looper", cx + side * between(-0.3, 0.1), cy + between(-0.05, 0.2), between(1400, 1800), [-160, -90])

  // counterweight on the other side
  const ox = -side * between(0.55, 0.95)
  const oy = between(0.6, 0.9)
  add(rand() < 0.5 ? "big-blue" : "big-teal", ox, oy, between(550, 850), [-80, 0])
  if (rand() < 0.5)
    add("small-blue", ox + side * between(0.1, 0.3), oy - between(0, 0.15), between(250, 400), [80, 160])

  return shapes
}
