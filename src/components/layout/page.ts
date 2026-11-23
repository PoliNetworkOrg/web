/** Content column of the redesigned pages: Figma's ~1272px column with the homepage's 24/40/64px gutters. */
export const CONTAINER = "mx-auto w-full max-w-350 px-6 sm:px-10 lg:px-16"

/** Section title in the grey gradient. Closing statements (`ClosingCta`) switch it to blue. */
export const SECTION_TITLE = "typo-headline-medium sm:typo-display-medium text-balance text-gradient-grey"

export const SECTION_LEAD = "typo-body-large sm:typo-headline-extrasmall text-pretty"

/**
 * Vertical rhythm of the redesigned pages. Figma leaves 180px between section blocks at 1728px (Su di noi, Storia):
 * 96px on phones, 128px on tablets, 180px from xl. The bottom padding repeats the gap before the footer.
 */
export const PAGE_MAIN = "flex w-full flex-col gap-24 pb-24 md:gap-32 md:pb-32 xl:gap-45 xl:pb-45"

/**
 * The page's opening section, the same on every page. The top padding clears the fixed header and leaves the title
 * about as much air as the home page's hero (the title sits at y≈184 on desktop, y≈176 on phones; the Figma frames'
 * 286 left the page starting too low). The bottom padding adds a little to the main gap after the hero.
 * The other page openings (groups, wizard, flows) use `PAGE_HERO_TOP` too.
 */
export const PAGE_HERO_TOP = "pt-40 md:pt-44"
export const PAGE_HERO = `${PAGE_HERO_TOP} pb-4 md:pb-6 xl:pb-12`

/** A section made of a heading block followed by its content. */
export const SECTION_STACK = `${CONTAINER} flex flex-col gap-10 md:gap-14`

/** Placeholder for a list with nothing to show yet: dashed, so it reads as "empty" rather than as a card. */
export const EMPTY_STATE =
  "typo-body-large wrap-anywhere rounded-rectangles border border-slate-300 border-dashed px-6 py-10 text-center text-slate-600"
