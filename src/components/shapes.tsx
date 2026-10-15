import Image from "next/image"
import type { CSSProperties } from "react"
import bigBlueSvg from "@/assets/shapes/big-blue.svg"
import bigTealSvg from "@/assets/shapes/big-teal.svg"
import looperSvg from "@/assets/shapes/looper.svg"
import smallBlueSvg from "@/assets/shapes/small-blue.svg"
import { cn } from "@/lib/utils"

const SOURCES = {
  "big-blue": bigBlueSvg,
  "big-teal": bigTealSvg,
  "small-blue": smallBlueSvg,
  looper: looperSvg,
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
    // the same four tiny SVGs are reused everywhere, lazy loading them only delays the first paint
    loading="eager"
    aria-hidden
    alt=""
    className={cn(className, "-z-10 absolute max-w-none select-none")}
    style={style}
  />
)
