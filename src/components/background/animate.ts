import { lineAngle } from "./looper"
import type { SceneShape } from "./scene"

/** Shapes further than this (px) from the viewport are not updated */
const MARGIN = 200
/** Time constant (s) of the scroll smoothing, gives scroll-driven motion some inertia */
const SCROLL_INERTIA = 0.15
/** Duration (ms) of the fade-in of the motion, so the first frame doesn't jump from the server-rendered layout */
const INTRO = 1500

const wave = (t: number, period: number, phase: number) => Math.sin(2 * Math.PI * (t / period + phase))
const smoothstep = (x: number) => {
  const c = Math.min(1, Math.max(0, x))
  return c * c * (3 - 2 * c)
}

/**
 * Animates the background from a single `requestAnimationFrame` loop, the
 * same way in every browser. Each shape gets a passive drift/sway/breathing
 * and, based on how far it has travelled through the viewport, a parallax
 * offset and a small rotation. Loopers also open their fan while scrolling
 * past them. Only `transform`s are touched, so nothing is repainted.
 *
 * `scene` children must match the order of `getShapes()`, each being
 * `layout box > motion > content`.
 */
export function animateScene(scene: HTMLElement, getShapes: () => SceneShape[]) {
  let scroll = window.scrollY
  let last = performance.now()
  const start = last

  const tick = (now: number) => {
    frame = requestAnimationFrame(tick)
    const dt = Math.min(0.1, (now - last) / 1000)
    last = now
    scroll += (window.scrollY - scroll) * (1 - Math.exp(-dt / SCROLL_INERTIA))

    const t = now / 1000
    const intro = smoothstep((now - start) / INTRO)
    const viewport = window.innerHeight
    const sceneTop = scene.getBoundingClientRect().top + window.scrollY - scroll
    const boxes = scene.children as HTMLCollectionOf<HTMLElement>
    // read every position before writing any transform, interleaving them would force a style flush per shape
    const tops = Array.from(boxes, (box) => sceneTop + box.offsetTop)
    const heights = Array.from(boxes, (box) => box.offsetHeight)

    for (const [i, shape] of getShapes().entries()) {
      const motion = boxes[i]?.firstElementChild as HTMLElement | null | undefined
      const top = tops[i]
      const height = heights[i]
      if (!motion || top === undefined || height === undefined) break

      const visible = top < viewport + MARGIN && top + height > -MARGIN
      // promote only what's on screen: these are huge, and Firefox ignores will-change over a memory budget
      motion.style.willChange = visible ? "transform" : ""
      if (!visible) continue
      // 0 when the shape enters from the bottom of the viewport, 1 when it leaves from the top
      const progress = Math.min(1, Math.max(0, (viewport - top) / (viewport + height)))

      const x = shape.driftX * wave(t, shape.periodX, shape.phase)
      const y = shape.driftY * wave(t, shape.periodY, shape.phase + 0.25) + shape.depth * (1 - 2 * progress)
      const rotate = shape.sway * wave(t, shape.periodSway, shape.phase + 0.5) + shape.spin * (progress - 0.5)
      const scale = shape.breathe * wave(t, shape.periodY, shape.phase + 0.25)
      motion.style.transform = `translate3d(${x * intro}px, ${y * intro}px, 0) rotate(${rotate * intro}deg) scale(${1 + scale * intro})`

      if (shape.variant === "looper") {
        // tight when entering the viewport, wide when leaving it
        const spread = shape.spread * (2 * smoothstep(progress) - 1) + shape.fan * wave(t, shape.periodFan, shape.phase)
        const lines = motion.firstElementChild?.children ?? []
        for (let j = 0; j < lines.length; j++) {
          ;(lines[j] as HTMLElement).style.transform = `rotate(${lineAngle(j, spread * intro)}deg)`
        }
      }
    }
  }

  let frame = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(frame)
}
