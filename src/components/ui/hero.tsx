import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"

/**
 * Figma's description fill is a conic gradient (accents/blue-secondary → neutrals/text-primary → blue-secondary)
 * skewed by an affine transform, which CSS `conic-gradient` can't express directly. These stops are the Figma
 * gradient resampled in screen space for the two Figma text boxes (780×64 desktop, 354×112 mobile), centered where
 * Figma centers it (45.23% 50%).
 */
const DESCRIPTION_GRADIENT_DESKTOP =
  "conic-gradient(at 45.23% 50%, #012241 0deg, #012444 19.3deg, #01294b 46.4deg, #012d51 60.6deg, #013157 68.6deg, #01365e 73.7deg, #013a64 77.2deg, #013f6b 80deg, #014371 82.1deg, #004878 84deg, #004c7f 85.6deg, #005185 87.1deg, #00558c 88.5deg, #005a92 90deg, #005e98 91.4deg, #00639f 92.9deg, #0067a5 94.5deg, #0067a5 96.4deg, #00639f 98.6deg, #005f99 101.3deg, #005b94 104.9deg, #00578e 110.1deg, #005389 118.3deg, #004f83 132.9deg, #004c7e 160.7deg, #004878 199.3deg, #004472 226.4deg, #01406d 240.6deg, #013c67 248.6deg, #013862 253.7deg, #01345c 257.2deg, #013157 260deg, #012d51 262.1deg, #01294b 264deg, #012646 265.6deg, #012240 267.1deg, #011e3b 268.5deg, #011a35 270deg, #021630 271.4deg, #02122a 272.9deg, #020e24 274.5deg, #020b1f 276.4deg, #020719 278.6deg, #02091d 281.3deg, #020e23 284.9deg, #02122a 290.1deg, #021731 298.3deg, #011b37 312.9deg, #01203e 340.7deg, #012241 360deg)"
const DESCRIPTION_GRADIENT_MOBILE =
  "conic-gradient(at 45.23% 50%, #012241 0deg, #012444 5.2deg, #01294b 15.2deg, #012d51 24.7deg, #013157 33.5deg, #01365e 41.5deg, #013a64 48.9deg, #013f6b 55.7deg, #014371 62deg, #004878 67.9deg, #004c7f 73.5deg, #005185 79deg, #00558c 84.4deg, #005a92 89.8deg, #005e98 95.3deg, #00639f 101deg, #0067a5 107deg, #0067a5 113.3deg, #00639f 120.2deg, #005f99 127.7deg, #005b94 135.8deg, #00578e 144.7deg, #005389 154.3deg, #004f83 164.4deg, #004c7e 174.8deg, #004878 185.2deg, #004472 195.2deg, #01406d 204.7deg, #013c67 213.5deg, #013862 221.5deg, #01345c 228.9deg, #013157 235.7deg, #012d51 242deg, #01294b 247.9deg, #012646 253.5deg, #012240 259deg, #011e3b 264.4deg, #011a35 269.8deg, #021630 275.3deg, #02122a 281deg, #020e24 287deg, #020b1f 293.3deg, #020719 300.2deg, #02091d 307.7deg, #020e23 315.8deg, #02122a 324.7deg, #021731 334.3deg, #011b37 344.4deg, #01203e 354.8deg, #012241 360deg)"

const descriptionGradientStyle = {
  "--hero-gradient-mobile": DESCRIPTION_GRADIENT_MOBILE,
  "--hero-gradient-desktop": DESCRIPTION_GRADIENT_DESKTOP,
} as CSSProperties

export function Hero({
  title,
  description,
  gradientDescription = false,
  className,
}: {
  title: string
  description: string
  gradientDescription?: boolean
  className?: string
}) {
  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      {/* Figma "lightheme-XLarge text effect": #020618 → #6e6e6e at 82.69% */}
      {/* The gradient is drawn per line (box-decoration-clone), so a title that wraps keeps the full effect on each line */}
      <h2 className="typo-display-large sm:typo-display-extralarge w-full self-stretch text-balance py-4 text-center sm:pt-14 sm:pb-0">
        <span className="bg-linear-to-b from-text-primary to-83% to-[#6e6e6e] box-decoration-clone bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      <p
        className={
          gradientDescription
            ? "typo-title-large sm:typo-headline-small bg-(image:--hero-gradient-mobile) sm:bg-(image:--hero-gradient-desktop) max-w-195 bg-clip-text text-center text-transparent"
            : "typo-title-large sm:typo-headline-small max-w-2xl text-center"
        }
        style={gradientDescription ? descriptionGradientStyle : undefined}
      >
        {description}
      </p>
    </div>
  )
}
