import Image from "next/image"
import bigBlueSvg from "@/assets/shapes/big-blue.svg"
import bigTealSvg from "@/assets/shapes/big-teal.svg"
import looperSvg from "@/assets/shapes/looper.svg"
import smallBlueSvg from "@/assets/shapes/small-blue.svg"
import { cn } from "@/lib/utils"

export type ShapeVariant = "big-blue" | "big-teal" | "small-blue" | "looper"

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
      alt={`${variant} shape`}
      className={cn(className, "absolute -z-10 select-none")}
    />
  )
}
