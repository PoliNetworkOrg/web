/** Content column of the redesigned pages: Figma's ~1272px column with the homepage's 24/40/64px gutters. */
export const CONTAINER = "mx-auto w-full max-w-350 px-6 sm:px-10 lg:px-16"

/** Section title in the grey gradient. Closing statements (`ClosingCta`) switch it to blue. */
export const SECTION_TITLE =
  "typo-headline-medium sm:typo-display-medium text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent"

export const SECTION_LEAD = "typo-body-large sm:typo-headline-extrasmall text-pretty"

/** A link inside running text: always underlined, so it reads as a link without relying on colour. */
export const INLINE_LINK =
  "rounded-sm text-blue-secondary underline decoration-1 decoration-blue-secondary/40 underline-offset-4 outline-none transition-colors hover:decoration-blue-secondary focus-visible:ring-2 focus-visible:ring-blue-secondary"

/**
 * Vertical rhythm of the redesigned pages. Figma leaves 180px between section blocks at 1728px (Su di noi, Storia):
 * 96px on phones, 128px on tablets, 180px from xl. The bottom padding repeats the gap before the footer.
 */
export const PAGE_MAIN = "flex w-full flex-col gap-24 pb-24 md:gap-32 md:pb-32 xl:gap-45 xl:pb-45"

/**
 * The page's opening section. The top padding clears the fixed header: with `Hero`'s own offset the title sits at
 * y=286 on desktop, as in every Figma frame. Figma also leaves more air after the hero (~270px at 1728) than between
 * sections (180px): the bottom padding adds that difference to the main gap.
 */
export const PAGE_HERO_TOP = "pt-52 md:pt-57.5"
export const PAGE_HERO = `${PAGE_HERO_TOP} pb-8 md:pb-12 xl:pb-24`

/** A section made of a heading block followed by its content. */
export const SECTION_STACK = `${CONTAINER} flex flex-col gap-10 md:gap-14`
