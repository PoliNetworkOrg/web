"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Shape } from "@/components/shapes"
import { useRoutePathname } from "@/utils/use-route-pathname"
import { animateScene } from "./animate"
import { LOOPER_ASPECT, Looper } from "./looper"
import { figmaScene, type SceneShape, sceneSegment } from "./scene"

/** Rendered on the server, before the page height can be measured */
const INITIAL_SEGMENTS = 2

/**
 * Animated decorative background shared by every page. It covers the whole
 * page (footer included). Pages composed in Figma get their shapes from
 * `figmaScene`; the others are split into `--bg-segment` tall segments, each
 * filled with shapes from `sceneSegment`. Both are animated by `animateScene`.
 * Every page gets a fresh scene, rendered directly in its final place.
 */
export function Background() {
  const pathname = useRoutePathname()
  return <Scene key={pathname} pathname={pathname} />
}

function Scene({ pathname }: { pathname: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [segments, setSegments] = useState(INITIAL_SEGMENTS)
  // Pages composed in Figma keep their layout; the others get a generated segment per screen of page
  const shapes = figmaScene(pathname) ?? Array.from({ length: segments }, (_, i) => sceneSegment(pathname, i)).flat()
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
    return () => observer.disconnect()
  }, [])

  // a layout effect, so the first frame is applied before the new page is painted
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return
    return animateScene(el, () => shapesRef.current)
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
      className="absolute"
      style={{
        left: `calc(${50 + shape.x * 50}% - ${width / 2} * var(--bg-unit))`,
        top: shape.page
          ? `calc(${shape.y * 100}% - ${height / 2} * var(--bg-unit))`
          : `calc(${shape.y} * var(--bg-segment) - ${height / 2} * var(--bg-unit))`,
        width: `calc(${width} * var(--bg-unit))`,
        height: `calc(${height} * var(--bg-unit))`,
      }}
    >
      <div className="size-full">
        {looper ? (
          <Looper className="size-full" style={{ rotate: `${shape.rotate}deg` }} />
        ) : (
          <Shape variant={shape.variant} className="size-full" style={{ rotate: `${shape.rotate}deg` }} />
        )}
      </div>
    </div>
  )
}
