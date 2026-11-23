import type { StaticImageData } from "next/image"
import bigBlue from "@/assets/shapes/big-blue.webp"
import bigTeal from "@/assets/shapes/big-teal.webp"
import bigBlue05 from "@/assets/shapes/blur/big-blue-05.webp"
import bigBlue07 from "@/assets/shapes/blur/big-blue-07.webp"
import bigBlue14 from "@/assets/shapes/blur/big-blue-14.webp"
import bigBlue025 from "@/assets/shapes/blur/big-blue-025.webp"
import bigBlue035 from "@/assets/shapes/blur/big-blue-035.webp"
import bigTeal05 from "@/assets/shapes/blur/big-teal-05.webp"
import bigTeal07 from "@/assets/shapes/blur/big-teal-07.webp"
import bigTeal14 from "@/assets/shapes/blur/big-teal-14.webp"
import bigTeal025 from "@/assets/shapes/blur/big-teal-025.webp"
import bigTeal035 from "@/assets/shapes/blur/big-teal-035.webp"
import smallBlue05 from "@/assets/shapes/blur/small-blue-05.webp"
import smallBlue07 from "@/assets/shapes/blur/small-blue-07.webp"
import smallBlue14 from "@/assets/shapes/blur/small-blue-14.webp"
import smallBlue025 from "@/assets/shapes/blur/small-blue-025.webp"
import smallBlue035 from "@/assets/shapes/blur/small-blue-035.webp"
import smallBlue from "@/assets/shapes/small-blue.webp"
import type { BlobVariant } from "@/components/shapes"

/** Layer size of the blobs' master components in Figma, whose 50px blur bleeds 100px out of each side */
const BLOB_MASTER_SIZE: Record<BlobVariant, number> = {
  "big-blue": 1062.24,
  "big-teal": 974,
  "small-blue": 354.126,
}
export const BLOB_BLEED = 100

/** Sizes, relative to the master, the blobs are rendered at (`1` is the default image) */
const SCALES = [0.25, 0.35, 0.5, 0.7, 1, 1.4] as const
type BlobScale = (typeof SCALES)[number]

/**
 * Resizing an instance in Figma doesn't resize its blur: a blob drawn at half its master's size is twice as blurry,
 * relative to its size, as the master. These images are the masters rendered with the blur (and bleed) they get at
 * each size, so scaling them gives the same result without a CSS filter, which would be re-run on every frame of
 * the animation. Made from the masters' SVGs, like the default images, with a stdDeviation of 50/scale.
 */
const IMAGES: Record<BlobVariant, Record<BlobScale, StaticImageData>> = {
  "big-blue": { 0.25: bigBlue025, 0.35: bigBlue035, 0.5: bigBlue05, 0.7: bigBlue07, 1: bigBlue, 1.4: bigBlue14 },
  "big-teal": { 0.25: bigTeal025, 0.35: bigTeal035, 0.5: bigTeal05, 0.7: bigTeal07, 1: bigTeal, 1.4: bigTeal14 },
  "small-blue": {
    0.25: smallBlue025,
    0.35: smallBlue035,
    0.5: smallBlue05,
    0.7: smallBlue07,
    1: smallBlue,
    1.4: smallBlue14,
  },
}

/** The image of a blob whose layer is `size` (in Figma px) wide: the one rendered at the closest scale */
export function blobImage(variant: BlobVariant, size: number): StaticImageData {
  const scale = size / BLOB_MASTER_SIZE[variant]
  const closest = SCALES.reduce((best, s) =>
    Math.abs(Math.log(s / scale)) < Math.abs(Math.log(best / scale)) ? s : best
  )
  return IMAGES[variant][closest]
}
