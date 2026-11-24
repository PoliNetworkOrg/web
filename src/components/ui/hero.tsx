import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"

/**
 * Figma's description fill is a conic gradient (accents/blue-secondary → neutrals/text-primary → blue-secondary)
 * skewed by an affine transform, which CSS `conic-gradient` can't express directly. These stops are the Figma
 * gradient resampled in screen space for the two Figma text boxes (780×64 desktop, 354×112 mobile), centered where
 * Figma centers it (45.23% 50%). Each stop mixes the two theme colors, so the gradient follows the theme:
 * `DESCRIPTION_MIX` is the share of blue-secondary at each stop (the rest is text-primary), the same for both boxes.
 */
const DESCRIPTION_MIX = [
  28, 31, 36, 40, 44, 49, 53, 58, 63, 68, 73, 77, 82, 86, 91, 96, 100, 100, 96, 92, 88, 83, 80, 75, 72, 68, 64, 60, 56,
  52, 48, 44, 40, 36, 32, 28, 24, 20, 16, 12, 8, 4, 0, 3, 7, 12, 17, 21, 26, 28,
]
const DESCRIPTION_ANGLES_DESKTOP = [
  0, 19.3, 46.4, 60.6, 68.6, 73.7, 77.2, 80, 82.1, 84, 85.6, 87.1, 88.5, 90, 91.4, 92.9, 94.5, 96.4, 98.6, 101.3, 104.9,
  110.1, 118.3, 132.9, 160.7, 199.3, 226.4, 240.6, 248.6, 253.7, 257.2, 260, 262.1, 264, 265.6, 267.1, 268.5, 270,
  271.4, 272.9, 274.5, 276.4, 278.6, 281.3, 284.9, 290.1, 298.3, 312.9, 340.7, 360,
]
const DESCRIPTION_ANGLES_MOBILE = [
  0, 5.2, 15.2, 24.7, 33.5, 41.5, 48.9, 55.7, 62, 67.9, 73.5, 79, 84.4, 89.8, 95.3, 101, 107, 113.3, 120.2, 127.7,
  135.8, 144.7, 154.3, 164.4, 174.8, 185.2, 195.2, 204.7, 213.5, 221.5, 228.9, 235.7, 242, 247.9, 253.5, 259, 264.4,
  269.8, 275.3, 281, 287, 293.3, 300.2, 307.7, 315.8, 324.7, 334.3, 344.4, 354.8, 360,
]

const descriptionGradient = (angles: number[]) =>
  `conic-gradient(at 45.23% 50%, ${DESCRIPTION_MIX.map(
    (mix, i) => `color-mix(in srgb, var(--color-blue-secondary) ${mix}%, var(--color-text-primary)) ${angles[i]}deg`
  ).join(", ")})`

const descriptionGradientStyle = {
  "--hero-gradient-mobile": descriptionGradient(DESCRIPTION_ANGLES_MOBILE),
  "--hero-gradient-desktop": descriptionGradient(DESCRIPTION_ANGLES_DESKTOP),
} as CSSProperties

function longestWord(text: string) {
  return Math.max(...text.split(/\s+/).map((word) => word.length))
}

export function Hero({
  title,
  description,
  className,
  descriptionClassName,
}: {
  title: string
  description: string
  className?: string
  descriptionClassName?: string
}) {
  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      {/* The page's h1: the header logo is not a heading. The gradient is drawn per line (box-decoration-clone) */}
      <h1 className="typo-display-large sm:typo-display-extralarge w-full self-stretch text-balance py-4 text-center motion-safe:animate-hero-enter sm:pt-2 sm:pb-0">
        {/* Capped so the longest word fits the width, since a word can't wrap (DM Sans is about 0.55em per letter) */}
        <span
          className="bg-linear-to-b from-text-primary to-83% to-[#6e6e6e] box-decoration-clone bg-clip-text text-[min(3.5625rem,calc((100vw-3rem)/var(--hero-fit)))] text-transparent sm:text-[min(7.5rem,calc((100vw-5rem)/var(--hero-fit)))]"
          style={{ "--hero-fit": longestWord(title) * 0.55 } as CSSProperties}
        >
          {title}
        </span>
      </h1>
      <p
        // One style on every page: Figma's gradient, balanced so a two-line description doesn't leave a lone word
        className={cn(
          "typo-title-large sm:typo-headline-small bg-(image:--hero-gradient-mobile) sm:bg-(image:--hero-gradient-desktop) max-w-195 text-balance bg-clip-text text-center text-transparent",
          "[animation-delay:45ms] motion-safe:animate-hero-enter",
          descriptionClassName
        )}
        style={descriptionGradientStyle}
      >
        {description}
      </p>
    </div>
  )
}
