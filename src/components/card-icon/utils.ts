import type { CardSize, ResponsiveCardSize } from "./types"

type ResponsiveClassMap = {
  base: Record<CardSize, string>
  sm: Record<CardSize, string>
  md: Record<CardSize, string>
  lg: Record<CardSize, string>
}

function resolveResponsiveClasses(size: ResponsiveCardSize, classes: ResponsiveClassMap) {
  if (typeof size === "string") return classes.base[size]

  return [classes.base[size.base], size.sm ? classes.sm[size.sm] : "", size.md ? classes.md[size.md] : "", size.lg ? classes.lg[size.lg] : ""]
    .filter(Boolean)
    .join(" ")
}

export function getIconSizeClasses(size: ResponsiveCardSize) {
  return resolveResponsiveClasses(size, {
    base: {
      xs: "h-10 w-10",
      sm: "h-14 w-14",
      md: "h-32 w-32",
      lg: "h-44 w-44",
    },
    sm: {
      xs: "sm:h-10 sm:w-10",
      sm: "sm:h-14 sm:w-14",
      md: "sm:h-32 sm:w-32",
      lg: "sm:h-44 sm:w-44",
    },
    md: {
      xs: "md:h-10 md:w-10",
      sm: "md:h-14 md:w-14",
      md: "md:h-32 md:w-32",
      lg: "md:h-44 md:w-44",
    },
    lg: {
      xs: "lg:h-10 lg:w-10",
      sm: "lg:h-14 lg:w-14",
      md: "lg:h-32 lg:w-32",
      lg: "lg:h-44 lg:w-44",
    },
  })
}

export function getCardPaddingClasses(size: ResponsiveCardSize, hasDescription: boolean) {
  if (!hasDescription) {
    return resolveResponsiveClasses(size, {
      base: {
        xs: "p-3",
        sm: "px-8 py-4",
        md: "p-8",
        lg: "p-8",
      },
      sm: {
        xs: "sm:p-3",
        sm: "sm:px-8 sm:py-4",
        md: "sm:p-8",
        lg: "sm:p-8",
      },
      md: {
        xs: "md:p-3",
        sm: "md:px-8 md:py-4",
        md: "md:p-8",
        lg: "md:p-8",
      },
      lg: {
        xs: "lg:p-3",
        sm: "lg:px-8 lg:py-4",
        md: "lg:p-8",
        lg: "lg:p-8",
      },
    })
  }

  return resolveResponsiveClasses(size, {
    base: {
      xs: "p-8",
      sm: "p-8",
      md: "p-8",
      lg: "p-8",
    },
    sm: {
      xs: "sm:p-8",
      sm: "sm:p-8",
      md: "sm:p-8",
      lg: "sm:p-8",
    },
    md: {
      xs: "md:p-8",
      sm: "md:p-8",
      md: "md:p-8",
      lg: "md:p-8",
    },
    lg: {
      xs: "lg:p-8",
      sm: "lg:p-8",
      md: "lg:p-8",
      lg: "lg:p-8",
    },
  })
}

export function getContentGapClasses(size: ResponsiveCardSize) {
  return resolveResponsiveClasses(size, {
    base: {
      xs: "gap-2",
      sm: "gap-2",
      md: "gap-6",
      lg: "gap-6",
    },
    sm: {
      xs: "sm:gap-2",
      sm: "sm:gap-2",
      md: "sm:gap-6",
      lg: "sm:gap-6",
    },
    md: {
      xs: "md:gap-2",
      sm: "md:gap-2",
      md: "md:gap-6",
      lg: "md:gap-6",
    },
    lg: {
      xs: "lg:gap-2",
      sm: "lg:gap-2",
      md: "lg:gap-6",
      lg: "lg:gap-6",
    },
  })
}

export function getTitleSizeClasses(size: ResponsiveCardSize) {
  return resolveResponsiveClasses(size, {
    base: {
      xs: "typo-label-large",
      sm: "typo-headline-medium",
      md: "typo-headline-medium",
      lg: "typo-headline-medium",
    },
    sm: {
      xs: "sm:typo-label-large",
      sm: "sm:typo-headline-medium",
      md: "sm:typo-headline-medium",
      lg: "sm:typo-headline-medium",
    },
    md: {
      xs: "md:typo-label-large",
      sm: "md:typo-headline-medium",
      md: "md:typo-headline-medium",
      lg: "md:typo-headline-medium",
    },
    lg: {
      xs: "lg:typo-label-large",
      sm: "lg:typo-headline-medium",
      md: "lg:typo-headline-medium",
      lg: "lg:typo-headline-medium",
    },
  })
}
