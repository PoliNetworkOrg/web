"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Shape } from "@/components/shapes"
import { animateScene } from "./animate"
import { LOOPER_ASPECT, Looper } from "./looper"
import { type SceneShape, sceneSegment } from "./scene"

/** Rendered on the server, before the page height can be measured */
const INITIAL_SEGMENTS = 2

/**
 * Animated decorative background shared by every page. It covers the whole
 * page (footer included) and is split into `--bg-segment` tall segments, each
 * filled with shapes from `sceneSegment` and animated by `animateScene`.
 * When navigating, the shapes glide to their place in the new page (CSS
 * transitions in `styles/background.css`).
 */
export function Background() {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)
  const [segments, setSegments] = useState(INITIAL_SEGMENTS)
  const shapes = Array.from({ length: segments }, (_, i) => sceneSegment(pathname, i)).flat()
  const shapesRef = useRef(shapes)

  useEffect(() => {
    shapesRef.current = shapes
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(() => {
      const segment = Number.parseFloat(getComputedStyle(el).getPropertyValue("--bg-segment"))
      setSegments(Math.max(1, Math.ceil(el.offsetHeight / segment)))
    })
    observer.observe(el)
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return () => observer.disconnect()
    const stop = animateScene(el, () => shapesRef.current)
    return () => {
      observer.disconnect()
      stop()
    }
  }, [])

  return (
    <div ref={ref} aria-hidden className="shape-scene -z-10 pointer-events-none absolute inset-0 overflow-clip">
      {shapes.map((shape) => (
        <SceneItem key={shape.id} shape={shape} />
      ))}
    </div>
  )
}

function SceneItem({ shape }: { shape: SceneShape }) {
  const looper = shape.variant === "looper"
  const width = shape.size
  const height = looper ? shape.size * LOOPER_ASPECT : shape.size

  return (
    <div
      className="shape-box absolute"
      style={{
        left: `calc(${50 + shape.x * 50}% - ${width / 2} * var(--bg-unit))`,
        top: `calc(${shape.y} * var(--bg-segment) - ${height / 2} * var(--bg-unit))`,
        width: `calc(${width} * var(--bg-unit))`,
        height: `calc(${height} * var(--bg-unit))`,
      }}
    >
      <div className="size-full">
        {looper ? (
          <Looper className="shape-content size-full" style={{ rotate: `${shape.rotate}deg` }} />
        ) : (
          <Shape variant={shape.variant} className="shape-content size-full" style={{ rotate: `${shape.rotate}deg` }} />
        )}
      </div>
    </div>
  )
}
