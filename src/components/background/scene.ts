import type { StaticImage } from "@/components/image"
import type { ShapeVariant } from "@/components/shapes"
import { matchesRoutePrefix } from "@/utils/route-match"
import { BLOB_BLEED, blobImage } from "./blobs"
import {
  DESKTOP_FOOTER,
  DESKTOP_FRAMES,
  type FigmaFrame,
  type FigmaShape,
  MOBILE_FOOTER,
  MOBILE_FRAMES,
} from "./figma-frames"
import { LOOPER_ASPECT } from "./looper"

export type SceneShape = {
  id: string
  variant: ShapeVariant
  /** The layout box, as CSS lengths relative to the scene (see `.shape-scene` for the custom properties) */
  box: { left: string; top: string; width: string; height: string }
  /** Shown only on phones (below md) or only from md: pages composed in Figma have a frame for each */
  layout?: "mobile" | "desktop"
  /** The image to draw a blob with, when it isn't the default one (see `blobImage`) */
  image?: StaticImage
  /** Static rotation, in degrees */
  rotate: number
  /** Looper only: vertical stretch of the curve, for instances Figma resized out of their aspect ratio */
  stretch?: number
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

/**
 * Deterministically generates the shapes of one segment (a screen-ish tall
 * slice) of the page background, for pages that weren't drawn in Figma. Every
 * segment has the same composition as the Figma backgrounds: a teal star
 * overlapping a couple of blue blobs on one side, crossed by a looper, and a
 * smaller counterweight on the other side. Sides alternate between segments,
 * everything else is jittered from a seed derived from the pathname and the
 * segment index, so each page gets its own (but stable across reloads) variation.
 */
export function sceneSegment(pathname: string, index: number): SceneShape[] {
  const seed = hash(pathname)
  const rand = prng(seed ^ Math.imul(index + 1, 0x9e3779b1))
  const between = (min: number, max: number) => min + rand() * (max - min)
  const side = (seed + index) % 2 ? 1 : -1

  const shapes: SceneShape[] = []
  /** `x` from -1 (left edge) to 1 (right edge) of the page, `y` in segments, `size` in `--bg-unit`s */
  const add = (variant: SceneShape["variant"], x: number, y: number, size: number, depth: [number, number]) => {
    const height = variant === "looper" ? size * LOOPER_ASPECT : size
    shapes.push({
      id: `${index}-${shapes.length}`,
      variant,
      box: {
        left: `calc(${50 + x * 50}% - ${size / 2} * var(--bg-unit))`,
        top: `calc(${index + y} * var(--bg-segment) - ${height / 2} * var(--bg-unit))`,
        width: `calc(${size} * var(--bg-unit))`,
        height: `calc(${height} * var(--bg-unit))`,
      },
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

/** A frame followed by a footer drawn on its own, for the frames Figma draws without one */
function withFooter(frame: FigmaFrame, footer: FigmaFrame): FigmaFrame {
  const below = (y: number) => frame.height + y
  return {
    ...frame,
    height: frame.height + footer.height,
    footer: frame.height,
    shapes: [
      ...frame.shapes,
      ...footer.shapes.map(([variant, x, y, w, h, rotate]): FigmaShape => [variant, x, below(y), w, h, rotate]),
    ],
  }
}

/** A frame without its footer, for the pages that hide it */
function withoutFooter(frame: FigmaFrame): FigmaFrame {
  return { ...frame, height: frame.footer, shapes: frame.shapes.filter(([, , y]) => y < frame.footer) }
}

type FigmaScene = { desktop: FigmaFrame; mobile: FigmaFrame }

/**
 * Pages whose background Figma composes by hand: the shapes sit behind the content (the hero, the cards, the
 * footer), so the glass surfaces always have colour behind them. Pages without a frame of their own borrow the one of
 * the page they were drawn after.
 */
const FIGMA_SCENES: Record<string, FigmaScene> = {
  "/": { desktop: DESKTOP_FRAMES["/"], mobile: MOBILE_FRAMES["/"] },
  "/progetti": { desktop: DESKTOP_FRAMES["/progetti"], mobile: MOBILE_FRAMES["/progetti"] },
  "/chi-siamo": { desktop: DESKTOP_FRAMES["/chi-siamo"], mobile: MOBILE_FRAMES["/chi-siamo"] },
  // drawn on desktop only, after "Su di noi"
  "/storia": { desktop: withFooter(DESKTOP_FRAMES["/storia"], DESKTOP_FOOTER), mobile: MOBILE_FRAMES["/chi-siamo"] },
  "/ringraziamenti": { desktop: DESKTOP_FRAMES["/ringraziamenti"], mobile: MOBILE_FRAMES["/ringraziamenti"] },
  "/struttura": { desktop: DESKTOP_FRAMES["/struttura"], mobile: MOBILE_FRAMES["/struttura"] },
  "/team": { desktop: DESKTOP_FRAMES["/team"], mobile: withFooter(MOBILE_FRAMES["/team"], MOBILE_FOOTER) },
  "/unisciti": { desktop: DESKTOP_FRAMES["/unisciti"], mobile: MOBILE_FRAMES["/unisciti"] },
  "/collabora": { desktop: DESKTOP_FRAMES["/collabora"], mobile: MOBILE_FRAMES["/collabora"] },
  "/contatti": { desktop: DESKTOP_FRAMES["/contatti"], mobile: MOBILE_FRAMES["/contatti"] },
  "/gruppi": { desktop: DESKTOP_FRAMES["/gruppi"], mobile: MOBILE_FRAMES["/gruppi"] },
  "/matricole": { desktop: DESKTOP_FRAMES["/matricole"], mobile: MOBILE_FRAMES["/matricole"] },
  // a full-screen guide, with the background of the guides
  "/matricole/guida": { desktop: DESKTOP_FRAMES["/guide"], mobile: withoutFooter(MOBILE_FRAMES["/guide"]) },
  "/associazioni": { desktop: DESKTOP_FRAMES["/associazioni"], mobile: MOBILE_FRAMES["/associazioni"] },
  "/guide": { desktop: withFooter(DESKTOP_FRAMES["/guide"], DESKTOP_FOOTER), mobile: MOBILE_FRAMES["/guide"] },
  "/faq": { desktop: DESKTOP_FRAMES["/faq"], mobile: MOBILE_FRAMES["/faq"] },
  "/documenti": {
    desktop: withFooter(DESKTOP_FRAMES["/documenti"], DESKTOP_FOOTER),
    mobile: MOBILE_FRAMES["/documenti"],
  },
  // drawn on desktop only: on phones it keeps the background of the catalog
  "/documenti/view": {
    desktop: DESKTOP_FRAMES["/documenti/view"],
    mobile: withoutFooter(MOBILE_FRAMES["/documenti"]),
  },
  // the route `useRoutePathname` gives the 404 page
  "/_not-found": { desktop: DESKTOP_FRAMES["not-found"], mobile: MOBILE_FRAMES["not-found"] },
}

/** Sections whose pages all have the background of their root */
const FIGMA_SECTIONS = ["/gruppi", "/guide", "/documenti/view"]

const round = (n: number) => Number(n.toFixed(5))

/**
 * Where a y of the frame is on the page. The frame is split like the page: shapes above Figma's footer are spread
 * over the content (a fraction of it, so each stays by its section even if the real one is taller or shorter than
 * in Figma), the others over the footer. `--bg-footer` is the height of the footer, measured by the scene.
 */
function pageY(y: number, { height, footer }: FigmaFrame) {
  // `--bg-content` is set by the scenes shared by a flow, so its shapes stay put while the steps change height
  if (y <= footer || footer >= height) return `(var(--bg-content, 100% - var(--bg-footer))) * ${round(y / footer)}`
  return `var(--bg-page, 100%) - var(--bg-footer) * ${round(1 - (y - footer) / (height - footer))}`
}

/** The shapes of a Figma frame, placed on the page and sized like the frame (as wide as the screen) */
function frameShapes(frame: FigmaFrame, layout: "desktop" | "mobile", rand: () => number): SceneShape[] {
  const px = (value: number) => `${round(value / frame.width)} * 100cqw`
  return frame.shapes.map(([variant, x, y, w, h, rotate], i) => {
    const looper = variant === "looper"
    // the layer blur keeps its 100px of bleed however the blob is resized
    const width = looper ? w : w + 2 * BLOB_BLEED
    const height = looper ? h : h + 2 * BLOB_BLEED

    return {
      id: `figma-${layout}-${i}`,
      variant,
      layout,
      box: {
        left: `calc(${px(x - width / 2)})`,
        top: `calc(${pageY(y, frame)} - ${px(height / 2)})`,
        width: `calc(${px(width)})`,
        height: `calc(${px(height)})`,
      },
      image: looper ? undefined : blobImage(variant, Math.sqrt(w * h)),
      rotate,
      stretch: looper ? round(h / (w * LOOPER_ASPECT)) : undefined,
      // a gentler parallax than the generated scenes, so each shape stays behind its section
      ...motionFor(rand, variant, [-40, 40]),
    }
  })
}

/** The hand-composed scene of a page drawn in Figma, or `null` when its background is generated by segments */
export function figmaScene(route: string): SceneShape[] | null {
  // the 404's segments make it `//_not-found`
  const pathname = route.replace(/\/{2,}/g, "/")
  const key = FIGMA_SCENES[pathname]
    ? pathname
    : FIGMA_SECTIONS.find((section) => matchesRoutePrefix(pathname, section))
  const scene = key && FIGMA_SCENES[key]
  if (!scene) return null
  const rand = prng(hash(key))
  return [...frameShapes(scene.desktop, "desktop", rand), ...frameShapes(scene.mobile, "mobile", rand)]
}
