import type { BlobVariant } from "@/components/shapes"

export type SceneShape = {
  id: string
  variant: BlobVariant | "looper"
  /** Horizontal center, from -1 (left edge) to 1 (right edge) of the page */
  x: number
  /** Vertical center, in segments from the top of the page, or with `page` as a fraction of the page height */
  y: number
  /** Placed from a Figma frame: `y` is a fraction of the whole page, so each shape stays by its section */
  page?: boolean
  /** Width, in `--bg-unit`s (≈px on a 1728px wide screen) */
  size: number
  /** Static rotation, in degrees */
  rotate: number
  /** Scroll: parallax offset in px (negative is further away, slower than the page) and rotation in degrees */
  depth: number
  spin: number
  /** Passive motion: drift amplitude (px), sway (deg), breathing scale, their periods (s) and phase (0-1) */
  driftX: number
  driftY: number
  sway: number
  breathe: number
  periodX: number
  periodY: number
  periodSway: number
  phase: number
  /** Looper only: extra angle between lines (deg) driven by scroll, and its passive oscillation */
  spread: number
  fan: number
  periodFan: number
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
 */
/** The passive and scroll-driven motion of a shape, jittered from `rand` */
function motionFor(rand: () => number, variant: SceneShape["variant"], depth: [number, number]) {
  const between = (min: number, max: number) => min + rand() * (max - min)
  const looper = variant === "looper"
  return {
    depth: between(...depth),
    spin: looper ? between(6, 10) : between(-8, 8),
    driftX: between(12, 32),
    driftY: between(12, 32),
    sway: looper ? between(2, 4) : between(5, 12),
    breathe: looper ? 0 : between(0.02, 0.05),
    periodX: between(34, 58),
    periodY: between(38, 62),
    periodSway: between(58, 94),
    phase: between(0, 1),
    spread: looper ? between(1, 1.3) : 0,
    fan: looper ? between(0.25, 0.4) : 0,
    periodFan: between(22, 38),
  }
}

export function sceneSegment(pathname: string, index: number): SceneShape[] {
  const seed = hash(pathname)
  const rand = prng(seed ^ Math.imul(index + 1, 0x9e3779b1))
  const between = (min: number, max: number) => min + rand() * (max - min)
  const side = (seed + index) % 2 ? 1 : -1

  const shapes: SceneShape[] = []
  const add = (variant: SceneShape["variant"], x: number, y: number, size: number, depth: [number, number]) => {
    shapes.push({
      id: `${index}-${shapes.length}`,
      variant,
      x,
      y: index + y,
      size,
      rotate: between(0, 360),
      ...motionFor(rand, variant, depth),
    })
  }

  // main cluster: the blobs overlap, so the looper's white lines show on top of them
  const cx = side * between(0.35, 0.8)
  const cy = between(0.15, 0.45)
  add("big-blue", cx + side * between(-0.1, 0.15), cy - between(0, 0.2), between(650, 900), [-140, -60])
  add("big-teal", cx, cy, between(800, 1050), [-70, 30])
  add("small-blue", cx - side * between(0.1, 0.25), cy + between(0.05, 0.2), between(380, 520), [100, 200])
  add("looper", cx + side * between(-0.3, 0.1), cy + between(-0.05, 0.2), between(1400, 1800), [-240, -140])

  // counterweight on the other side
  const ox = -side * between(0.55, 0.95)
  const oy = between(0.6, 0.9)
  add(rand() < 0.5 ? "big-blue" : "big-teal", ox, oy, between(550, 850), [-120, -20])
  if (rand() < 0.5)
    add("small-blue", ox + side * between(0.1, 0.3), oy - between(0, 0.15), between(250, 400), [120, 220])

  return shapes
}

/** A shape as Figma places it: center and width of the layer, in px of the 1728px wide frame */
type FigmaPlacement = { variant: SceneShape["variant"]; x: number; y: number; w: number }

const FIGMA_WIDTH = 1728

/** Layer size of the blurred masters, whose images include 100px of blur bleed per side (see `@/components/shapes`) */
const MASTER_SIZE: Record<SceneShape["variant"], number | null> = {
  "big-blue": 1062.24,
  "big-teal": 974,
  "small-blue": 354.126,
  looper: null,
}
const BLEED = 100

/** The footer's shapes, the same on every Figma page: centers relative to the top of the footer frame */
const FIGMA_FOOTER: FigmaPlacement[] = [
  { variant: "small-blue", x: 230, y: 593, w: 354 },
  { variant: "big-teal", x: 526, y: 966, w: 1444 },
  { variant: "looper", x: 1548, y: 770, w: 2184 },
  { variant: "big-blue", x: 1776, y: 811, w: 1432 },
]

const footerAt = (top: number) => FIGMA_FOOTER.map((shape) => ({ ...shape, y: top + shape.y }))

/**
 * Pages whose background Figma composes by hand: the shapes sit behind the content (the hero, the cards, the
 * footer), so the glass surfaces always have colour behind them. Frames from the "💻website-desktop" page.
 */
const FIGMA_SCENES: Record<string, { height: number; shapes: FigmaPlacement[] }> = {
  // "homepage" without the Materials section, hidden from the home page for now: everything after it moves up 1117px
  "/": {
    height: 4468,
    shapes: [
      // hero: a cluster behind the title and the search bar, crossed by a looper
      { variant: "big-blue", x: 918, y: 165, w: 1248 },
      { variant: "looper", x: 882, y: 393, w: 1401 },
      { variant: "big-teal", x: 900, y: 561, w: 974 },
      { variant: "small-blue", x: 470, y: 708, w: 437 },
      // projects: behind the cards, on the right
      { variant: "small-blue", x: 1443, y: 1806, w: 477 },
      { variant: "big-teal", x: 1587, y: 2077, w: 662 },
      ...footerAt(3351),
    ],
  },
  // "progetti"
  "/projects": {
    height: 5587,
    shapes: [
      // hero and the community news
      { variant: "small-blue", x: 57, y: 179, w: 460 },
      { variant: "big-teal", x: 37, y: 487, w: 974 },
      { variant: "big-teal", x: 1691, y: 487, w: 974 },
      { variant: "looper", x: 395, y: 867, w: 1918 },
      // the collection
      { variant: "big-teal", x: 864, y: 1643, w: 974 },
      { variant: "big-blue", x: 859, y: 1920, w: 578 },
      { variant: "looper", x: 864, y: 1986, w: 1918 },
      // the proposal section
      { variant: "big-blue", x: 1044, y: 2562, w: 460 },
      { variant: "big-teal", x: 550, y: 2792, w: 974 },
      { variant: "looper", x: 533, y: 2955, w: 1610 },
      // deprecated projects
      { variant: "big-teal", x: 1428, y: 3788, w: 974 },
      { variant: "big-blue", x: 1401, y: 4451, w: 771 },
      ...footerAt(4470),
    ],
  },
}

/** The hand-composed scene of a page drawn in Figma, or `null` when its background is generated by segments */
export function figmaScene(pathname: string): SceneShape[] | null {
  const scene = FIGMA_SCENES[pathname]
  if (!scene) return null
  const rand = prng(hash(pathname))

  return scene.shapes.map((shape, i) => {
    const master = MASTER_SIZE[shape.variant]
    return {
      id: `figma-${i}`,
      variant: shape.variant,
      x: (shape.x / FIGMA_WIDTH) * 2 - 1,
      y: shape.y / scene.height,
      page: true,
      // the layout box includes the image's blur bleed, scaled like the shape
      size: master ? shape.w * (1 + (2 * BLEED) / master) : shape.w,
      // drawn upright, as in Figma
      rotate: 0,
      // a gentler parallax than the generated scenes, so each shape stays behind its section
      ...motionFor(rand, shape.variant, [-40, 40]),
    }
  })
}
