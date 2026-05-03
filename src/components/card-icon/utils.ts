import {
  CARD_PADDING_WITH_DESCRIPTION,
  CARD_PADDING_WITHOUT_DESCRIPTION,
  CONTENT_GAP_CLASSES,
  ICON_SIZE_CLASSES,
  TITLE_SIZE_CLASSES,
} from "./classes"

import type { CardBreakpoint, ResponsiveCardSize, SizeClassMap } from "./types"

const BREAKPOINTS: CardBreakpoint[] = ["base", "sm", "md", "lg"]

const BREAKPOINT_PREFIX: Record<CardBreakpoint, string> = {
  base: "",
  sm: "sm:",
  md: "md:",
  lg: "lg:",
}

function prefixClasses(prefix: string, value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((token) => `${prefix}${token}`)
    .join(" ")
}

function resolveResponsiveClasses(size: ResponsiveCardSize, classesBySize: SizeClassMap): string {
  if (typeof size === "string") {
    return classesBySize[size]
  }

  return BREAKPOINTS.map((breakpoint) => {
    const currentSize = size[breakpoint]

    if (!currentSize) {
      return ""
    }

    return prefixClasses(BREAKPOINT_PREFIX[breakpoint], classesBySize[currentSize])
  })
    .filter(Boolean)
    .join(" ")
}

export function getIconSizeClasses(size: ResponsiveCardSize) {
  return resolveResponsiveClasses(size, ICON_SIZE_CLASSES)
}

export function getCardPaddingClasses(size: ResponsiveCardSize, hasDescription: boolean) {
  return resolveResponsiveClasses(
    size,
    hasDescription ? CARD_PADDING_WITH_DESCRIPTION : CARD_PADDING_WITHOUT_DESCRIPTION
  )
}

export function getContentGapClasses(size: ResponsiveCardSize) {
  return resolveResponsiveClasses(size, CONTENT_GAP_CLASSES)
}

export function getTitleSizeClasses(size: ResponsiveCardSize) {
  return resolveResponsiveClasses(size, TITLE_SIZE_CLASSES)
}
