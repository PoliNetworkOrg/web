"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Shape } from "@/components/shapes"
import { cn } from "@/lib/utils"
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
 * Every page (or flow, see `SHARED_SCENES`) gets a fresh scene, rendered
 * directly in its final place.
 */
/**
 * Sections whose pages are steps of one flow: moving between them keeps the same background instead of drawing a
 * new one for every page (the groups wizard, its results, the extra groups; the course guides).
 */
const SHARED_SCENES = ["/groups", "/guides/corso"]

const sceneKey = (pathname: string) =>
  SHARED_SCENES.find((root) => pathname === root || pathname.startsWith(`${root}/`)) ?? pathname

export function Background() {
  const key = sceneKey(useRoutePathname())
  return <Scene key={key} pathname={key} />
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
    // A new page's scene fades in instead of popping in place of the previous one
    <div
      ref={ref}
      aria-hidden
      className="shape-scene -z-10 pointer-events-none absolute inset-0 animate-fade-in overflow-clip [animation-duration:0.6s]"
    >
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
  const unit = shape.unit ?? "var(--bg-unit)"

  return (
    <div
      className={cn(
        "absolute",
        shape.layout === "mobile" && "md:hidden",
        shape.layout === "desktop" && "max-md:hidden"
      )}
      style={{
        left: `calc(${50 + shape.x * 50}% - ${width / 2} * ${unit})`,
        top: shape.page
          ? `calc(${shape.y * 100}% - ${height / 2} * ${unit})`
          : `calc(${shape.y} * var(--bg-segment) - ${height / 2} * ${unit})`,
        width: `calc(${width} * ${unit})`,
        height: `calc(${height} * ${unit})`,
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
