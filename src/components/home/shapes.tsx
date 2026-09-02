import Image from "next/image"
import heroGlowSvg from "@/assets/shapes/hero-glow.svg"
import { Shape } from "@/components/shapes"

/**
 * `left` offsets below are expressed as `calc(50% + Npx)`, i.e. relative to the
 * horizontal center of the section rather than its left edge. The homepage
 * content is itself center-anchored (not width-capped), so anchoring shapes to
 * the edge would make them drift away from the content on screens wider or
 * narrower than the 1728px/402px Figma reference frames.
 */

/**
 * Decorative shapes for the Hero section, matching the Figma homepage design.
 * Renders a mobile composition (< sm) and a desktop composition (>= sm).
 */
export function HeroShapes() {
  return (
    <div aria-hidden className="-z-10 pointer-events-none absolute inset-0 overflow-hidden">
      <Shape variant="big-teal" className="top-[198px] left-[calc(50%-201px)] size-[401px] sm:hidden" />
      <Shape variant="small-blue" className="top-[88px] left-[calc(50%-178px)] size-[354.13px] sm:hidden" />
      <Shape variant="looper" className="top-[39px] left-[calc(50%-374px)] h-[866px] w-[891px] sm:hidden" />

      <Image
        src={heroGlowSvg}
        alt=""
        className="-z-10 absolute top-[-665px] left-[calc(50%-647px)] hidden h-[1712px] w-[1290px] select-none sm:block"
      />
      <Shape variant="looper" className="top-[-286px] left-[calc(50%-682px)] hidden h-[1358px] w-[1401px] sm:block" />
    </div>
  )
}

/**
 * Decorative shapes bleeding across the Materials, Projects and About Us sections,
 * matching the Figma homepage design. Mount this once behind those three sections.
 */
export function MiddleShapes() {
  return (
    <div aria-hidden className="-z-10 pointer-events-none absolute inset-0 overflow-hidden">
      <Shape variant="big-teal" className="top-[43px] left-[calc(50%-315px)] size-[401px] sm:hidden" />
      <Shape variant="small-blue" className="top-[170px] left-[calc(50%-281px)] size-[233px] sm:hidden" />
      <Shape variant="big-teal" className="top-[605px] left-[calc(50%-89px)] size-[401px] sm:hidden" />
      <Shape
        variant="looper"
        className="top-[668.89px] left-[calc(50%-452.96px)] h-[1020.89px] w-[1000.33px] sm:hidden"
      />
      <Shape variant="big-teal" className="top-[923px] left-[calc(50%-315px)] size-[401px] sm:hidden" />
      <Shape variant="big-teal" className="top-[1313px] left-[calc(50%-111px)] size-[401px] sm:hidden" />
      <Shape variant="small-blue" className="top-[1390px] left-[calc(50%+17px)] size-[222px] sm:hidden" />
      <Shape variant="big-teal" className="top-[1886px] left-[calc(50%-200px)] size-[401px] sm:hidden" />

      <Shape variant="big-teal" className="top-[1746px] left-[calc(50%+392px)] hidden size-[662px] sm:block" />
      <Shape
        variant="small-blue"
        className="top-[1404.32px] left-[calc(50%+340.32px)] hidden size-[477.48px] sm:block"
      />
      <Shape variant="big-teal" className="top-[569px] left-[calc(50%-1261px)] hidden size-[974px] sm:block" />
      <Shape variant="small-blue" className="top-[550px] left-[calc(50%-1043px)] hidden size-[498.98px] sm:block" />
      <Shape
        variant="looper"
        className="top-[264px] left-[calc(50%-1276px)] hidden h-[1560.48px] w-[1609.71px] sm:block"
      />
    </div>
  )
}
