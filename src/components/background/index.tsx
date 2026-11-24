"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Shape } from "@/components/shapes"
import { cn } from "@/lib/utils"
import { hasFooter } from "@/utils/footer-routes"
import { useRoutePathname } from "@/utils/use-route-pathname"
import { animateScene } from "./animate"
import { LOOPER_ASPECT, Looper } from "./looper"
import { figmaScene, type SceneShape, sceneSegment } from "./scene"

/** Rendered on the server, before the page height can be measured */
const INITIAL_SEGMENTS = 2

/**
 * Sections whose pages are steps of one flow: moving between them keeps the same background instead of drawing a
 * new one for every page (the groups wizard, its results, the extra groups; the course guides).
 */
const SHARED_SCENES = ["/gruppi", "/guide/corso"]

const sceneKey = (pathname: string) =>
  SHARED_SCENES.find((root) => pathname === root || pathname.startsWith(`${root}/`)) ?? pathname

/**
 * False until the first scene has mounted: the first page's background is shown as the server rendered it, the scene
 * of every page reached by navigating afterwards fades in instead of popping in place of the previous one.
 */
const session: { navigated: boolean } = { navigated: false }

/**
 * Animated decorative background shared by every page. It covers the whole
 * page (footer included). Pages drawn in Figma get their shapes from
 * `figmaScene`; the others are split into `--bg-segment` tall segments, each
 * filled with shapes from `sceneSegment`. Both are animated by `animateScene`.
 * Every page (or flow, see `SHARED_SCENES`) gets a fresh scene, rendered
 * directly in its final place.
 */
export function Background() {
  const pathname = useRoutePathname()
  const key = sceneKey(pathname)
  return <Scene key={key} pathname={key} footer={hasFooter(pathname)} shared={SHARED_SCENES.includes(key)} />
}

/**
 * `shared`: the scene of a flow (see `SHARED_SCENES`). Its Figma shapes are spread over the content as tall as it was
 * when the flow opened, not as it is now, so moving to a taller or shorter step doesn't move them.
 */
function Scene({ pathname, footer, shared }: { pathname: string; footer: boolean; shared: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [segments, setSegments] = useState(INITIAL_SEGMENTS)
  // Pages composed in Figma keep their layout; the others get a generated segment per screen of page
  const shapes = figmaScene(pathname) ?? Array.from({ length: segments }, (_, i) => sceneSegment(pathname, i)).flat()
  const shapesRef = useRef(shapes)
  const [fadeIn] = useState(() => session.navigated)

  useEffect(() => {
    session.navigated = true
  }, [])

  useEffect(() => {
    shapesRef.current = shapes
  })

  // a layout effect, so the shapes are placed by the measured footer before the new page is painted
  useLayoutEffect(() => {
    const el = ref.current
    const page = el?.parentElement
    if (!el || !page) return
    // the width the content height was frozen at: a resized window lays the page out again, so it is measured again
    let frozenWidth: number | undefined
    const measure = () => {
      // the region from the top of the footer to the end of the page, which Figma's footer shapes are spread over
      const footerEl = page.querySelector<HTMLElement>(":scope > footer")
      if (footerEl) el.style.setProperty("--bg-footer", `${el.offsetHeight - footerEl.offsetTop}px`)
      else el.style.removeProperty("--bg-footer")
      if ((shared || pathname === "/storia") && frozenWidth !== el.offsetWidth) {
        frozenWidth = el.offsetWidth
        el.style.setProperty("--bg-content", `${footerEl ? footerEl.offsetTop : el.offsetHeight}px`)
        if (pathname === "/storia") el.style.setProperty("--bg-page", `${el.offsetHeight}px`)
      }
      const segment = Number.parseFloat(getComputedStyle(el).getPropertyValue("--bg-segment"))
      setSegments(Math.max(1, Math.ceil(el.offsetHeight / segment)))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    const footerEl = page.querySelector(":scope > footer")
    if (footerEl) observer.observe(footerEl)
    return () => observer.disconnect()
  }, [shared, pathname])

  // a layout effect, so the first frame is applied before the new page is painted
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const preference = matchMedia("(prefers-reduced-motion: reduce)")
    let stop: (() => void) | undefined

    const syncMotion = () => {
      stop?.()
      stop = preference.matches ? undefined : animateScene(el, () => shapesRef.current)
    }

    syncMotion()
    preference.addEventListener("change", syncMotion)
    return () => {
      preference.removeEventListener("change", syncMotion)
      stop?.()
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      data-scene={pathname}
      data-footer={footer ? undefined : "none"}
      className={cn(
        "shape-scene -z-10 pointer-events-none absolute inset-0 overflow-clip",
        fadeIn && "animate-fade-in [animation-duration:0.6s]"
      )}
    >
      {shapes.map((shape) => (
        <SceneItem key={shape.id} shape={shape} />
      ))}
    </div>
  )
}

function SceneItem({ shape }: { shape: SceneShape }) {
  return (
    <div
      className={cn(
        "absolute",
        shape.layout === "mobile" && "md:hidden",
        shape.layout === "desktop" && "max-md:hidden"
      )}
      style={shape.box}
    >
      <div className="size-full">
        {shape.variant === "looper" ? (
          // drawn in its own aspect ratio, then stretched like the Figma instance and rotated
          <Looper
            className="absolute top-1/2 left-0 w-full"
            style={{
              aspectRatio: 1 / LOOPER_ASPECT,
              translate: "0 -50%",
              rotate: `${shape.rotate}deg`,
              scale: shape.stretch ? `1 ${shape.stretch}` : undefined,
            }}
          />
        ) : (
          <Shape
            variant={shape.variant}
            src={shape.image}
            className="size-full"
            style={{ rotate: `${shape.rotate}deg` }}
          />
        )}
      </div>
    </div>
  )
}
