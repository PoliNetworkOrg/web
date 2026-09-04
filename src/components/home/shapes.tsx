import { Shape } from "@/components/shapes"

/**
 * `left` offsets below are expressed as `calc(50% + Npx)`, i.e. relative to the
 * horizontal center of the section rather than its left edge. The homepage
 * content is itself center-anchored (not width-capped), so anchoring shapes to
 * the edge would make them drift away from the content on screens wider or
 * narrower than the 1728px/402px Figma reference frames.
 *
 * `top` is relative to the top of the section each component is mounted in
 * (Materials or Projects), not to the page. Materials and Projects/AboutUs
 * used to share one absolute layer with cumulative offsets, but AboutUs uses
 * `min-h-screen` (fluid height, depends on the viewport) — if a shape ever
 * needs to sit inside AboutUs, mount it scoped to that section too, the same
 * way this file already splits Materials from Projects. Otherwise any
 * mismatch between a fluid section's real height and Figma's fixed height
 * assumption compounds into every shape positioned after it (e.g. shapes
 * drifting away from their section when the browser is zoomed out — see
 * src/app/projects/shapes.tsx, which had exactly this bug).
 */

export function HomeHeroShapes() {
  return (
    <div aria-hidden className="-z-10 pointer-events-none absolute inset-0 overflow-hidden">
      {/* Mobile Shapes */}
      <Shape variant="big-teal" className="top-49.5 left-[calc(50%-201px)] size-100.25 md:hidden" />
      <Shape variant="small-blue" className="top-22 left-[calc(50%-178px)] size-[354.13px] md:hidden" />
      <Shape variant="looper" className="top-9.75 left-[calc(50%-374px)] h-216.5 w-222.75 md:hidden" />

      {/* Desktop Shapes */}
      <Shape variant="hero-glow" className="-top-166.25 left-[calc(50%-647px)] hidden h-428 w-322.5 md:block" />
      <Shape variant="looper" className="-top-71.5 left-[calc(50%-682px)] hidden h-339.5 w-350.25 md:block" />
    </div>
  )
}

export function HomeMaterialsShapes() {
  return (
    <div aria-hidden className="-z-10 pointer-events-none absolute inset-0 overflow-hidden">
      {/* Mobile Shapes */}
      <Shape variant="big-teal" className="top-10.75 left-[calc(50%-315px)] size-100.25 md:hidden" />
      <Shape variant="small-blue" className="top-42.5 left-[calc(50%-281px)] size-58.25 md:hidden" />
      <Shape variant="big-teal" className="top-151.25 left-[calc(50%-89px)] size-100.25 md:hidden" />
      <Shape variant="looper" className="-top-88 -rotate-100 left-[calc(50%-598px)] h-216.5 w-222.75 md:hidden" />
      <Shape variant="big-teal" className="top-230.75 left-[calc(50%-315px)] size-100.25 md:hidden" />
      <Shape variant="looper" className="top-222.75 left-[calc(50%-409px)] h-334.75 w-344 rotate-59 md:hidden" />

      {/* Desktop Shapes */}
      <Shape variant="big-teal" className="top-142.25 left-[calc(50%-1261px)] hidden size-243.5 md:block" />
      <Shape variant="small-blue" className="top-137.5 left-[calc(50%-1043px)] hidden size-[498.98px] md:block" />
      <Shape variant="looper" className="top-66 left-[calc(50%-1276px)] hidden h-[1560.48px] w-[1609.71px] md:block" />
    </div>
  )
}

export function HomeProjectsShapes() {
  return (
    <div aria-hidden className="-z-10 pointer-events-none absolute inset-0 overflow-hidden">
      {/* Mobile Shapes */}
      <Shape variant="big-teal" className="top-13.25 left-[calc(50%-111px)] size-100.25 md:hidden" />
      <Shape variant="small-blue" className="top-32.5 left-[calc(50%+17px)] size-55.5 md:hidden" />
      <Shape variant="big-teal" className="top-156.5 left-[calc(50%-200px)] size-100.25 md:hidden" />

      {/* Desktop Shapes */}
      <Shape variant="big-teal" className="top-157.25 left-[calc(50%+392px)] hidden size-165.5 md:block" />
      <Shape
        variant="small-blue"
        className="top-[287.32px] left-[calc(50%+340.32px)] hidden size-[477.48px] md:block"
      />
    </div>
  )
}
