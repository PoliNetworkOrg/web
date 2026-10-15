"use client"

import { usePathname } from "next/navigation"
import { type CSSProperties, useEffect, useRef, useState } from "react"
import { Shape } from "@/components/shapes"
import { LOOPER_ASPECT, Looper } from "./looper"
import { type SceneShape, sceneSegment } from "./scene"

/** Rendered on the server, before the page height can be measured */
const INITIAL_SEGMENTS = 2

/**
 * Animated decorative background shared by every page. It covers the whole
 * page (footer included) and is split into `--bg-segment` tall segments, each
 * filled with shapes from `sceneSegment`. Animations live in
 * `styles/background.css`: scroll parallax (each shape has its own depth),
 * passive drift/sway/breathing, the loopers' fan opening and closing, and
 * shapes gliding to their new place when navigating to another page.
 */
export function Background() {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)
  const [segments, setSegments] = useState(INITIAL_SEGMENTS)

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

  return (
    <div ref={ref} aria-hidden className="shape-scene -z-10 pointer-events-none absolute inset-0 overflow-clip">
      {Array.from({ length: segments }, (_, i) => sceneSegment(pathname, i))
        .flat()
        .map((shape) => (
          <SceneItem key={shape.id} shape={shape} />
        ))}
    </div>
  )
}

function SceneItem({ shape }: { shape: SceneShape }) {
  const looper = shape.variant === "looper"
  const width = shape.size
  const height = looper ? shape.size * LOOPER_ASPECT : shape.size
  // negative delays start every animation mid-cycle and out of phase with the others
  const delay = (duration: number, phase: number) => `${-duration * phase}s`

  return (
    <div
      className="shape-parallax absolute"
      style={
        {
          left: `calc(${50 + shape.x * 50}% - ${width / 2} * var(--bg-unit))`,
          top: `calc(${shape.y} * var(--bg-segment) - ${height / 2} * var(--bg-unit))`,
          width: `calc(${width} * var(--bg-unit))`,
          height: `calc(${height} * var(--bg-unit))`,
          "--parallax": `${shape.depth}px`,
        } as CSSProperties
      }
    >
      <div
        className="shape-drift-x size-full"
        style={
          {
            "--drift-x": `${shape.driftX}px`,
            "--drift-x-duration": `${shape.durX}s`,
            "--drift-x-delay": delay(shape.durX, shape.x + 1),
            "--sway": `${shape.sway}deg`,
            "--sway-duration": `${shape.durSway}s`,
            "--sway-delay": delay(shape.durSway, shape.rotate / 360),
          } as CSSProperties
        }
      >
        <div
          className="shape-drift-y size-full"
          style={
            {
              "--drift-y": `${shape.driftY}px`,
              "--drift-y-duration": `${shape.durY}s`,
              "--drift-y-delay": delay(shape.durY, shape.y % 1),
              "--breathe": shape.breathe,
            } as CSSProperties
          }
        >
          {looper ? (
            <Looper
              className="shape-content size-full"
              style={
                {
                  rotate: `${shape.rotate}deg`,
                  "--fan": `${shape.fan}deg`,
                  "--fan-duration": `${shape.durFan}s`,
                  "--fan-delay": delay(shape.durFan, shape.y % 1),
                } as CSSProperties
              }
            />
          ) : (
            <Shape
              variant={shape.variant}
              className="shape-content size-full"
              style={{ rotate: `${shape.rotate}deg` }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
