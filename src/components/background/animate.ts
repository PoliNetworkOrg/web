import { drawLooper, LOOPER_WIDTH } from "./looper"
import type { SceneShape } from "./scene"

/** Shapes further than this (px) from the viewport are not updated */
const MARGIN = 200
/**
 * How far (px) the loopers' canvas reaches past the top and bottom of the viewport. The browser scrolls the page (the
 * canvas with it) before a frame redraws the canvas where the viewport now is, so a fast scroll would otherwise show
 * its edge. It also covers the address bar of mobile browsers, which grows the viewport as it hides.
 */
const BLEED = 200
/** Time constant (s) of the scroll smoothing, gives scroll-driven motion some inertia */
const SCROLL_INERTIA = 0.15
/** Duration (ms) of the fade-in of the motion, so the first frame doesn't jump from the server-rendered layout */
const INTRO = 1500
/** Duration (ms) of the fade-in of the loopers on the first page load: the server can't draw them on the canvas */
const LOOPERS_FADE_IN = 600
/** For this long (ms) after a scene starts the scroll isn't smoothed: navigating or restoring the scroll position jumps */
const SETTLE = 300

/** The intro only plays once, on the first page load: later pages are rendered on the client, directly in place */
let introStart: number | undefined

const wave = (t: number, period: number, phase: number) => Math.sin(2 * Math.PI * (t / period + phase))
const smoothstep = (x: number) => {
  const c = Math.min(1, Math.max(0, x))
  return c * c * (3 - 2 * c)
}
const DEG = Math.PI / 180

/**
 * Animates the background from a single `requestAnimationFrame` loop, the
 * same way in every browser. Each shape gets a passive drift/sway/breathing
 * and, based on how far it has travelled through the viewport, a parallax
 * offset and a small rotation. Loopers also open their fan while scrolling
 * past them.
 *
 * Blobs are images moved with `transform`s, so nothing is repainted. Loopers
 * are stroked on `canvas`, which covers the viewport (plus `BLEED`) and is
 * moved along with it: drawn at their final size and angle on every frame,
 * they stay sharp at any pixel density, where a rotated bitmap was resampled.
 *
 * `scene` children must match the order of `getShapes()`, each being
 * `layout box > motion > content` (loopers only need the layout box). The
 * first frame is rendered synchronously, so new shapes never show up out of
 * place. With `still` (reduced motion) nothing moves on its own: shapes stay
 * where the layout puts them, and the canvas is only redrawn on scroll and resize.
 */
export function animateScene(
  scene: HTMLElement,
  canvas: HTMLCanvasElement,
  getShapes: () => SceneShape[],
  { still = false } = {}
) {
  const ctx = canvas.getContext("2d")
  let scroll = window.scrollY
  let last = performance.now()
  const start = last
  const firstLoad = introStart === undefined
  introStart ??= start
  const introFrom = introStart
  /** Whether the canvas has loopers on it, to clear it only then */
  let drawn = false

  const tick = (now: number) => {
    if (!still) frame = requestAnimationFrame(tick)
    const dt = Math.min(0.1, (now - last) / 1000)
    last = now
    if (still || now - start < SETTLE) scroll = window.scrollY
    else scroll += (window.scrollY - scroll) * (1 - Math.exp(-dt / SCROLL_INERTIA))

    const t = now / 1000
    const intro = still ? 0 : smoothstep((now - introFrom) / INTRO)
    const viewport = window.innerHeight
    const pageTop = scene.getBoundingClientRect().top + window.scrollY
    const sceneTop = pageTop - scroll
    const boxes = scene.children as HTMLCollectionOf<HTMLElement>
    // read every position before writing any transform, interleaving them would force a style flush per shape
    const lefts = Array.from(boxes, (box) => box.offsetLeft)
    const offsets = Array.from(boxes, (box) => box.offsetTop)
    const widths = Array.from(boxes, (box) => box.offsetWidth)
    const heights = Array.from(boxes, (box) => box.offsetHeight)

    // The canvas: the viewport and BLEED around it, in px of the screen so nothing resamples it, placed in the scene
    // where the viewport is now (snapped to a pixel of the screen, for the same reason)
    const dpr = window.devicePixelRatio || 1
    const pixelWidth = Math.round(scene.clientWidth * dpr)
    const pixelHeight = Math.round((document.documentElement.clientHeight + 2 * BLEED) * dpr)
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth
      canvas.height = pixelHeight
      canvas.style.width = `${pixelWidth / dpr}px`
      canvas.style.height = `${pixelHeight / dpr}px`
      drawn = false
    }
    const anchor = Math.round((window.scrollY - pageTop - BLEED) * dpr) / dpr
    canvas.style.transform = `translate3d(0, ${anchor}px, 0)`
    if (ctx && drawn) {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawn = false
    }

    for (const [i, shape] of getShapes().entries()) {
      const offset = offsets[i]
      const height = heights[i]
      const left = lefts[i]
      const width = widths[i]
      if (offset === undefined || height === undefined || left === undefined || width === undefined) break
      // where it is in the viewport, with the smoothed scroll
      const top = sceneTop + offset
      // hidden at this size (pages composed in Figma have a layout for phones and one for bigger screens)
      if (width === 0) continue

      const looper = shape.variant === "looper"
      // a looper's lines reach past its box as it turns and its fan opens
      const reach = MARGIN + (looper ? Math.max(width, height) / 4 : 0)
      const visible = top < viewport + reach && top + height > -reach
      const motion = looper ? null : (boxes[i]?.firstElementChild as HTMLElement | null | undefined)
      // promote only what's on screen: these are huge, and Firefox ignores will-change over a memory budget
      if (motion) motion.style.willChange = visible && !still ? "transform" : ""
      if (!visible) continue
      // 0 when the shape enters from the bottom of the viewport, 1 when it leaves from the top
      const progress = Math.min(1, Math.max(0, (viewport - top) / (viewport + height)))

      const x = shape.driftX * wave(t, shape.periodX, shape.phase)
      const y = shape.driftY * wave(t, shape.periodY, shape.phase + 0.25) + shape.depth * (1 - 2 * progress)
      const rotate = shape.sway * wave(t, shape.periodSway, shape.phase + 0.5) + shape.spin * (progress - 0.5)
      const scale = 1 + shape.breathe * wave(t, shape.periodY, shape.phase + 0.25) * intro

      if (motion) {
        if (!still)
          motion.style.transform = `translate3d(${x * intro}px, ${y * intro}px, 0) rotate(${rotate * intro}deg) scale(${scale})`
        continue
      }
      if (!ctx) continue

      // tight when entering the viewport, wide when leaving it
      const spread = shape.spread * (2 * smoothstep(progress) - 1) + shape.fan * wave(t, shape.periodFan, shape.phase)
      // what the layout box, its motion and its static rotation do, about its center, from the top left of the canvas
      // (which is at `anchor` in the scene). The curve is as wide as the box and centred in it, stretched along its own
      // height first where Figma resized it out of its aspect ratio
      const angle = (rotate * intro + shape.rotate) * DEG
      const k = (dpr * scale * width) / LOOPER_WIDTH
      const cos = Math.cos(angle) * k
      const sin = Math.sin(angle) * k
      const stretch = shape.stretch ?? 1
      ctx.setTransform(
        cos,
        sin,
        -sin * stretch,
        cos * stretch,
        dpr * (left + width / 2 + x * intro),
        dpr * (offset + height / 2 + y * intro - anchor)
      )
      drawLooper(ctx, spread * intro)
      drawn = true
    }
  }

  let frame = 0
  const schedule = () => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(tick)
  }
  tick(start)
  if (firstLoad) {
    // the loopers aren't in the server-rendered page: fade them in instead of having them pop up
    canvas.animate([{ opacity: 0 }, { opacity: 1 }], { duration: LOOPERS_FADE_IN, easing: "ease-out" })
  }
  // with reduced motion there is no loop: the canvas follows the viewport on scroll and resize only
  const resize = new ResizeObserver(schedule)
  if (still) {
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    resize.observe(scene)
  }
  return () => {
    cancelAnimationFrame(frame)
    window.removeEventListener("scroll", schedule)
    window.removeEventListener("resize", schedule)
    resize.disconnect()
    for (const box of scene.children as HTMLCollectionOf<HTMLElement>) {
      const motion = box.firstElementChild as HTMLElement | null
      if (!motion) continue
      motion.style.removeProperty("transform")
      motion.style.removeProperty("will-change")
    }
  }
}
