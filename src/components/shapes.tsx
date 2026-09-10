import Image from "next/image"
import bigBlueSvg from "@/assets/shapes/big-blue.svg"
import bigTealSvg from "@/assets/shapes/big-teal.svg"
import heroGlowSvg from "@/assets/shapes/hero-glow.svg"
import looperSvg from "@/assets/shapes/looper.svg"
import matricoleGlow1Svg from "@/assets/shapes/matricole-glow-1.svg"
import matricoleGlow2Svg from "@/assets/shapes/matricole-glow-2.svg"
import matricoleTopGlowSvg from "@/assets/shapes/matricole-top-glow.svg"
import projectsGlowSvg from "@/assets/shapes/projects-glow.svg"
import smallBlueSvg from "@/assets/shapes/small-blue.svg"
import { cn } from "@/lib/utils"

export type ShapeVariant =
  | "big-blue"
  | "big-teal"
  | "small-blue"
  | "hero-glow"
  | "projects-glow"
  | "matricole-glow-1"
  | "matricole-glow-2"
  | "matricole-top-glow"
  | "looper"

export type ShapeProps = {
  variant: ShapeVariant
  className?: string
}

export const Shape: React.FC<ShapeProps> = ({ variant, className }) => {
  const getShapeSrc = () => {
    switch (variant) {
      case "big-blue":
        return bigBlueSvg
      case "big-teal":
        return bigTealSvg
      case "small-blue":
        return smallBlueSvg
      case "hero-glow":
        return heroGlowSvg
      case "projects-glow":
        return projectsGlowSvg
      case "matricole-glow-1":
        return matricoleGlow1Svg
      case "matricole-glow-2":
        return matricoleGlow2Svg
      case "matricole-top-glow":
        return matricoleTopGlowSvg
      case "looper":
        return looperSvg
      default:
        return ""
    }
  }

  return (
    <Image src={getShapeSrc()} aria-hidden alt="" className={cn(className, "-z-10 absolute max-w-none select-none")} />
  )
}

export type ShapeLayerProps = {
  children: React.ReactNode
  className?: string
}

/**
 * Wraps a group of `<Shape>`s positioned behind a section. `overflow-x-clip`
 * (not `overflow-hidden`/`overflow-x-hidden`) is required: pairing it with
 * `overflow-y-visible` clips horizontal bleed only — CSS forces the "visible"
 * axis to compute as `auto` (which still clips, just via an invisible
 * scrollbar) whenever the other axis is `hidden`/`auto`/`scroll`, but not
 * when it's `clip`, since `clip` doesn't create a scroll container. This lets
 * shapes bleed vertically into the next section (as several are designed to)
 * without shapes positioned off-canvas horizontally causing a page-wide
 * horizontal scrollbar.
 */
export const ShapeLayer: React.FC<ShapeLayerProps> = ({ children, className }) => (
  <div
    aria-hidden
    className={cn("-z-10 pointer-events-none absolute inset-0 overflow-x-clip overflow-y-visible", className)}
  >
    {children}
  </div>
)
