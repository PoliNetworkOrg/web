import type { CardSize } from "./types"

export function getIconSizeClasses(size: CardSize) {
  if (size === "sm") return "h-14 w-14"
  if (size === "lg") return "h-44 w-44"
  return "h-32 w-32"
}

export function getCardPaddingClasses(size: CardSize, hasDescription: boolean) {
  if (!hasDescription && size === "sm") return "px-8 py-4"
  return "p-8"
}

export function getContentGapClasses(size: CardSize) {
  if (size === "sm") return "gap-2"
  return "gap-6"
}
