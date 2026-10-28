import type { AccordionListItem } from "@/components/accordion-list/types"

/*
  The guides have no content yet, and how they'll be written and organised (per course, per exam, by whom) is still
  open. Until then the pages show their empty state: the lorem ipsum placeholders used to be served in production.
*/
export const GENERAL_GUIDES: AccordionListItem[] = []

/** Guides for a given course, by course slug. */
export const COURSE_GUIDES: Record<string, AccordionListItem[]> = {}
