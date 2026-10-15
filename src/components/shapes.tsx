import Image from "next/image"
import bigBlueSvg from "@/assets/shapes/big-blue.svg"
import bigTealSvg from "@/assets/shapes/big-teal.svg"
import heroGlowSvg from "@/assets/shapes/hero-glow.svg"
import looperSvg from "@/assets/shapes/looper.svg"
import matricoleGlow1Svg from "@/assets/shapes/matricole-glow-1.svg"
import projectsGlowSvg from "@/assets/shapes/projects-glow.svg"
import resourcesGlow2Svg from "@/assets/shapes/resources-glow-2.svg"
import resourcesTopGlowSvg from "@/assets/shapes/resources-top-glow.svg"
import smallBlueSvg from "@/assets/shapes/small-blue.svg"
import { cn } from "@/lib/utils"

export type ShapeVariant =
  | "big-blue"
  | "big-teal"
  | "small-blue"
  | "hero-glow"
  | "projects-glow" //TODO: remove these page specific shapes
  | "matricole-glow-1"
  | "resources-glow-2"
  | "resources-top-glow"
  | "looper"

export type ShapeProps = {
  variant: ShapeVariant
  className?: string
  style?: React.CSSProperties
}

export const Shape: React.FC<ShapeProps> = ({ variant, className, style }) => {
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
      case "resources-glow-2":
        return resourcesGlow2Svg
      case "resources-top-glow":
        return resourcesTopGlowSvg
      case "looper":
        return looperSvg
      default:
        return ""
    }
  }

  return (
    <Image
      src={getShapeSrc()}
      aria-hidden
      alt=""
      className={cn(className, "-z-10 absolute max-w-none select-none")}
      style={style}
    />
  )
}

type FigmaShapeVariant = Extract<ShapeVariant, "big-blue" | "big-teal" | "small-blue" | "looper">

/** Layer size of the blurred shapes' master components in Figma (the looper has no blur). */
const FIGMA_SHAPE_MASTER_SIZE: Record<FigmaShapeVariant, number | null> = {
  "big-blue": 1062.24,
  "big-teal": 974,
  "small-blue": 354.126,
  looper: null,
}

/** The masters' layer blur: 100px (a 50px standard deviation), which the SVGs include as 100px of bleed per side. */
const FIGMA_SHAPE_BLUR = 50
const FIGMA_SHAPE_BLEED = 100

export type FigmaShapePlacement = {
  variant: FigmaShapeVariant
  /** Center x of the Figma layer, in px from the left edge of the reference box. */
  x: number
  /** Center y of the Figma layer, in px from the top edge of the reference box. */
  y: number
  /** Figma layer width (without blur bleed). */
  w: number
  /** Figma layer height (without blur bleed). */
  h: number
  /** Figma rotation/flip, as the 2×2 part of the layer transform: CSS `matrix(a, b, c, d, 0, 0)`. */
  matrix?: readonly [number, number, number, number]
}

export type FigmaShapeProps = FigmaShapePlacement & {
  /** Figma width of the reference box (e.g. 1728 for a desktop frame, 402 for mobile, or a photo's width). */
  refWidth: number
  /**
   * Figma height of the reference box. When set, `y` is a percentage of the box height (use it when the box has a
   * fixed aspect ratio, e.g. a photo). Otherwise `y` is in px, so shapes keep their offset from the box top
   * regardless of how text reflows.
   */
  refHeight?: number
  className?: string
}

/**
 * Places a `<Shape>` from its Figma geometry. Horizontal position and size are percentages of the reference box
 * width, so the composition scales with it (on 2K/4K screens the background grows with the viewport instead of
 * leaving empty bands at the sides). Must be inside a `@container` as wide as the reference box.
 *
 * Resizing an instance in Figma doesn't scale its blur, while scaling the SVG does: shapes smaller than their
 * master get the missing blur from a CSS filter (Gaussian blurs add up in quadrature).
 */
export function FigmaShape({ variant, x, y, w, h, matrix, refWidth, refHeight, className }: FigmaShapeProps) {
  const master = FIGMA_SHAPE_MASTER_SIZE[variant]
  const ratio = master ? w / master : 1
  const bleed = master ? FIGMA_SHAPE_BLEED * ratio : 0
  const width = w + 2 * bleed
  const height = h + 2 * bleed
  const missingBlur = master ? FIGMA_SHAPE_BLUR * Math.sqrt(Math.max(0, 1 - ratio ** 2)) : 0

  return (
    <Shape
      variant={variant}
      className={className}
      style={{
        left: `${(x / refWidth) * 100}%`,
        top: refHeight ? `${(y / refHeight) * 100}%` : `${y}px`,
        width: `${(width / refWidth) * 100}%`,
        height: "auto",
        aspectRatio: `${width} / ${height}`,
        transform: `translate(-50%, -50%)${matrix ? ` matrix(${matrix.join(", ")}, 0, 0)` : ""}`,
        filter: missingBlur > 0.5 ? `blur(${((missingBlur / refWidth) * 100).toFixed(3)}cqw)` : undefined,
      }}
    />
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
 *
 * Don't add `overflow-hidden` here to stop shapes from lengthening the page:
 * that also cuts them off at the section's bottom edge (e.g. before the
 * footer). The page wrapper in app/layout.tsx is `overflow-clip`, so shapes
 * can cross into the footer but anything past the end of the page is clipped.
 */
export const ShapeLayer: React.FC<ShapeLayerProps> = ({ children, className }) => (
  <div
    aria-hidden
    className={cn("-z-10 pointer-events-none absolute inset-0 overflow-x-clip overflow-y-visible", className)}
  >
    {children}
  </div>
)
