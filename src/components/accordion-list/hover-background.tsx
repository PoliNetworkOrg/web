import { CardHoverBackground } from "@/components/card-icon/hover-background"

/**
 * The shapes clickable cards show on hover, behind the whole accordion card: an open item lights up its answer too,
 * not just the header. Only the header is clickable, so hovering or focusing it is what shows them. Every accordion
 * of the site uses it, so they all react the same way. Needs `group/accordion` on the item or the card.
 */
export function AccordionHoverBackground() {
  return (
    <CardHoverBackground className="group-has-[[data-slot=accordion-trigger]:focus-visible]/accordion:opacity-100 [@media(hover:hover)]:group-has-[[data-slot=accordion-trigger]:hover]/accordion:opacity-100" />
  )
}
