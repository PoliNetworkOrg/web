/** Content column of the redesigned pages: Figma's ~1272px column with the homepage's 24/40/64px gutters. */
export const CONTAINER = "mx-auto w-full max-w-350 px-6 sm:px-10 lg:px-16"

/** Section title in the grey gradient. Closing statements (`ClosingCta`) switch it to blue. */
export const SECTION_TITLE =
  "typo-headline-medium sm:typo-display-medium text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent"

export const SECTION_LEAD = "typo-body-large sm:typo-headline-extrasmall text-pretty"

/** A link inside running text: always underlined, so it reads as a link without relying on colour. */
export const INLINE_LINK =
  "rounded-sm text-blue-secondary underline decoration-1 decoration-blue-secondary/40 underline-offset-4 outline-none transition-colors hover:decoration-blue-secondary focus-visible:ring-2 focus-visible:ring-blue-secondary"
