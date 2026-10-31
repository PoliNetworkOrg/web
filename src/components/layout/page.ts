/** Content column of the redesigned pages: Figma's ~1272px column with the homepage's 24/40/64px gutters. */
export const CONTAINER = "mx-auto w-full max-w-350 px-6 sm:px-10 lg:px-16"

/** Section title: the grey gradient is the only text gradient the style guide allows over the decorated background. */
export const SECTION_TITLE =
  "typo-headline-medium sm:typo-display-medium text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent"

export const SECTION_LEAD = "typo-body-large sm:typo-headline-extrasmall text-pretty"

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
export const PAGE_HERO = "pt-52 pb-8 md:pt-57.5 md:pb-12 xl:pb-24"

/** Placeholder for a list with nothing to show yet: dashed, so it reads as "empty" rather than as a card. */
export const EMPTY_STATE =
  "typo-body-large rounded-rectangles border border-slate-300 border-dashed px-6 py-10 text-center text-slate-600"
