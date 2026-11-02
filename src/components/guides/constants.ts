import type { AccordionListItem } from "@/components/accordion-list/types"

// The guides have no content yet, and how they will be organised is still open: until then the pages show their empty state.
export const GENERAL_GUIDES: AccordionListItem[] = []

/** Guides for a given course, by course slug. */
export const COURSE_GUIDES: Record<string, AccordionListItem[]> = {}
