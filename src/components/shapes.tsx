import Image from "next/image"
import bigBlueSvg from "@/assets/shapes/big-blue.svg"
import bigTealSvg from "@/assets/shapes/big-teal.svg"
import heroGlowSvg from "@/assets/shapes/hero-glow.svg"
import looperSvg from "@/assets/shapes/looper.svg"
import smallBlueSvg from "@/assets/shapes/small-blue.svg"
import { cn } from "@/lib/utils"

export type ShapeVariant = "big-blue" | "big-teal" | "small-blue" | "hero-glow" | "looper"

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
