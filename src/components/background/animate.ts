import type { SceneShape } from "./scene"

/** Shapes further than this (px) from the viewport are not updated */
const MARGIN = 200
/** Time constant (s) of the scroll smoothing, gives scroll-driven motion some inertia */
const SCROLL_INERTIA = 0.15
/** Duration (ms) of the fade-in of the motion, so the first frame doesn't jump from the server-rendered layout */
const INTRO = 1500
/** For this long (ms) after a scene starts the scroll isn't smoothed: navigating or restoring the scroll position jumps */
const SETTLE = 300

/** The intro only plays once, on the first page load: later pages are rendered on the client, directly in place */
let introStart: number | undefined

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
 * `scene` children must match the order of `shapes`, each being
 * `layout box > motion > content`. Observe the untransformed boxes to track viewport proximity.
 */
export function animateScene(scene: HTMLElement, shapes: SceneShape[]) {
  let scroll = window.scrollY
  let last = performance.now()
  const start = last
  introStart ??= start
  const introFrom = introStart

  const visible = new Map<HTMLElement, SceneShape>()
  const boxes = Array.from(scene.children) as HTMLElement[]
  const byBox = new Map(boxes.map((box, index) => [box, shapes[index]]))
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const box = entry.target as HTMLElement
        const shape = byBox.get(box)
        if (entry.isIntersecting && shape && entry.boundingClientRect.height > 0) {
          visible.set(box, shape)
        } else {
          visible.delete(box)
        }
      }
    },
    { rootMargin: `${MARGIN}px` }
  )
  for (const box of boxes) observer.observe(box)

  const tick = (now: number) => {
    frame = requestAnimationFrame(tick)
    const dt = Math.min(0.1, (now - last) / 1000)
    last = now
    if (now - start < SETTLE) scroll = window.scrollY
    else scroll += (window.scrollY - scroll) * (1 - Math.exp(-dt / SCROLL_INERTIA))

    const t = now / 1000
    const intro = smoothstep((now - introFrom) / INTRO)
    const viewport = window.innerHeight
    const scrollOffset = window.scrollY - scroll
    // Read only nearby layout boxes, before updating any of their animated children.
    const positions = Array.from(visible, ([box, shape]) => ({ box, shape, rect: box.getBoundingClientRect() }))
    for (const { box, shape, rect } of positions) {
      const motion = box.firstElementChild as HTMLElement | null
      if (!motion) continue
      const top = rect.top + scrollOffset
      const height = rect.height
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
        const middle = (lines.length - 1) / 2
        for (let j = 0; j < lines.length; j++) {
          // The static fan already supplies its base rotation via CSS transform.
          ;(lines[j] as HTMLElement).style.rotate = `${(j - middle) * spread * intro}deg`
        }
      }
    }
  }

  let frame = 0
  tick(start)
  return () => {
    observer.disconnect()
    cancelAnimationFrame(frame)
    const boxes = scene.children as HTMLCollectionOf<HTMLElement>
    for (const box of boxes) {
      const motion = box.firstElementChild as HTMLElement | null
      if (!motion) continue
      motion.style.removeProperty("transform")
      const lines = motion.firstElementChild?.children as HTMLCollectionOf<HTMLElement> | undefined
      if (!lines) continue
      for (const line of lines) line.style.removeProperty("rotate")
    }
  }
}
