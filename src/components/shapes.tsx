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
