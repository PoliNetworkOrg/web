import Image from "next/image"
import type { CSSProperties } from "react"
import bigBlue from "@/assets/shapes/big-blue.webp"
import bigTeal from "@/assets/shapes/big-teal.webp"
import looper from "@/assets/shapes/looper.svg"
import smallBlue from "@/assets/shapes/small-blue.webp"
import { cn } from "@/lib/utils"

/**
 * The blobs are rasterized from the Figma SVGs (a path with a 50px gaussian
 * blur): Firefox re-runs the blur every time an SVG image is drawn at a new
 * scale, which made animating them unbearably slow. Being so blurry, a small
 * bitmap upscaled looks the same.
 */
const SOURCES = {
  "big-blue": bigBlue,
  "big-teal": bigTeal,
  "small-blue": smallBlue,
  looper,
}

export type ShapeVariant = keyof typeof SOURCES
export type BlobVariant = Exclude<ShapeVariant, "looper">

export type ShapeProps = {
  variant: ShapeVariant
  className?: string
  style?: CSSProperties
}

/**
 * Static decorative shape. The page background is animated and generated in
 * `@/components/background`, this is for decorations inside components.
 */
export const Shape: React.FC<ShapeProps> = ({ variant, className, style }) => (
  <Image
    src={SOURCES[variant]}
    // the same few tiny images are reused everywhere: lazy loading them only delays the first paint
    loading="eager"
    unoptimized
    aria-hidden
    alt=""
    className={cn(className, "-z-10 absolute max-w-none select-none")}
    style={style}
  />
)

/** Layer size of the blurred shapes' master components in Figma (the looper has no blur). */
const FIGMA_SHAPE_MASTER_SIZE: Record<ShapeVariant, number | null> = {
  "big-blue": 1062.24,
  "big-teal": 974,
  "small-blue": 354.126,
  looper: null,
}

/** The masters' layer blur: 100px (a 50px standard deviation), which the images include as 100px of bleed per side. */
const FIGMA_SHAPE_BLUR = 50
const FIGMA_SHAPE_BLEED = 100

export type FigmaShapePlacement = {
  variant: ShapeVariant
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

type FigmaShapeProps = FigmaShapePlacement & {
  /** Figma size of the reference box (e.g. a photo): position and size are percentages of it. */
  refWidth: number
  refHeight: number
  className?: string
}

/**
 * Places a `<Shape>` from its Figma geometry, scaling with the reference box. Must be inside a `@container` as wide
 * as the box.
 *
 * Resizing an instance in Figma doesn't scale its blur, while scaling the image does: shapes smaller than their
 * master get the missing blur from a CSS filter (Gaussian blurs add up in quadrature).
 */
function FigmaShape({ variant, x, y, w, h, matrix, refWidth, refHeight, className }: FigmaShapeProps) {
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
        top: `${(y / refHeight) * 100}%`,
        width: `${(width / refWidth) * 100}%`,
        height: "auto",
        aspectRatio: `${width} / ${height}`,
        transform: `translate(-50%, -50%)${matrix ? ` matrix(${matrix.join(", ")}, 0, 0)` : ""}`,
        filter: missingBlur > 0.5 ? `blur(${((missingBlur / refWidth) * 100).toFixed(3)}cqw)` : undefined,
      }}
    />
  )
}

export type PhotoShapesLayout = { width: number; height: number; shapes: FigmaShapePlacement[] }

/** Static shapes Figma draws over a photo, laid out on the photo's mobile and desktop frames. */
export function PhotoShapes({ mobile, desktop }: { mobile: PhotoShapesLayout; desktop: PhotoShapesLayout }) {
  return (
    <div aria-hidden className="@container pointer-events-none absolute inset-0 z-10">
      {(["mobile", "desktop"] as const).map((layout) => {
        const { width, height, shapes } = layout === "mobile" ? mobile : desktop
        return shapes.map((shape) => (
          <FigmaShape
            key={`${layout}-${shape.variant}-${shape.x}-${shape.y}`}
            {...shape}
            refWidth={width}
            refHeight={height}
            className={layout === "mobile" ? "md:hidden" : "max-md:hidden"}
          />
        ))
      })}
    </div>
  )
}
