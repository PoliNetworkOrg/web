import { Shape } from "@/components/shapes"

/**
 * `left` offsets below are expressed as `calc(50% + Npx)`, i.e. relative to the
 * horizontal center of the section rather than its left edge. The projects
 * content is itself center-anchored (not width-capped), so anchoring shapes to
 * the edge would make them drift away from the content on screens wider or
 * narrower than the 1728px/402px Figma reference frames.
 *
 * `top` is relative to the top of the section each component is mounted in
 * (CommunityNews, Collection, Upload, Deprecated), not to the page. Every
 * section on this page uses `min-h-screen` (fluid height, depends on the viewport)
 * — each shape below is therefore scoped and `top`-anchored to the section it
 * visually belongs to, rather than using cumulative page offsets.
 */

export function CommunityNewsShapes() {
  return (
    <div aria-hidden className="-z-10 pointer-events-none absolute inset-0">
      {/* Mobile Shapes */}
      <Shape variant="big-teal" className="top-12.25 left-[calc(50%-44px)] size-100.25 md:hidden" />
      <Shape variant="small-blue" className="top-64.75 left-[calc(50%-307px)] size-71.25 md:hidden" />
      <Shape variant="big-teal" className="top-209 left-[calc(50%-200px)] size-100.25 md:hidden" />
      <Shape variant="small-blue" className="top-253.75 left-[calc(50%-110px)] size-58.25 md:hidden" />
      <Shape variant="looper" className="top-120 left-[calc(50%-411px)] h-216.5 w-222.75 rotate-45 md:hidden" />
      <Shape variant="looper" className="-rotate-155 top-17.75 left-[calc(50%-303px)] h-216.5 w-263 md:hidden" />

      {/* Desktop Shapes */}
      <Shape variant="big-teal" className="top-0 left-[calc(50%-1314px)] hidden size-243.5 md:block" />
      <Shape variant="big-teal" className="top-0 left-[calc(50%+340px)] hidden size-243.5 md:block" />
      <Shape
        variant="looper"
        className="top-[-73.78px] left-[calc(50%-1428px)] hidden h-[1881.13px] w-[1918.09px] md:block"
      />
      <Shape variant="projects-glow" className="-top-12.75 left-[calc(50%-1037px)] hidden size-115 md:block" />
      <Shape
        variant="looper"
        className="top-[-280.4px] left-[calc(50%-27.41px)] hidden h-[1584.39px] w-[1464.51px] md:block"
      />
    </div>
  )
}

export function CollectionShapes() {
  return (
    <div aria-hidden className="-z-10 pointer-events-none absolute inset-0">
      {/* Mobile Shapes */}
      <Shape variant="small-blue" className="top-76.25 left-[calc(50%-14px)] size-58.25 md:hidden" />
      <Shape variant="big-teal" className="top-95.5 left-[calc(50%-317px)] size-100.25 md:hidden" />

      {/* Desktop Shapes */}
      <Shape variant="big-teal" className="top-9.25 left-[calc(50%-487px)] hidden size-243.5 md:block" />
      <Shape variant="big-blue" className="top-128 left-[calc(50%-294px)] hidden size-144.5 md:block" />
      <Shape
        variant="looper"
        className="top-[-205.37px] left-[calc(50%-763.83px)] hidden h-[1560.48px] w-[1609.71px] md:block"
      />
    </div>
  )
}

export function UploadShapes() {
  return (
    <div aria-hidden className="-z-9 pointer-events-none absolute inset-0">
      {/* Mobile Shapes */}
      <Shape variant="big-teal" className="top-161 left-[calc(50%-52px)] size-100.25 md:hidden" />
      <Shape variant="looper" className="-rotate-120 top-70 left-[calc(50%-480px)] h-265 w-258 md:hidden" />

      {/* Desktop Shapes */}
      <Shape variant="big-blue" className="top-24 left-[calc(50%-50px)] hidden size-115 md:block" />
      <Shape variant="big-teal" className="top-17.25 left-[calc(50%-801px)] hidden size-243.5 md:block" />
      <Shape
        variant="looper"
        className="-top-15.25 left-[calc(50%-1096.09px)] hidden h-[1560.48px] w-[1609.71px] md:block"
      />
    </div>
  )
}

export function DeprecatedShapes() {
  return (
    <div aria-hidden className="-z-10 pointer-events-none absolute inset-0">
      {/* Mobile Shapes */}
      <Shape variant="big-teal" className="top-23.25 left-[calc(50%-338px)] size-100.25 md:hidden" />
      <Shape variant="small-blue" className="top-45.5 left-[calc(50%-67px)] size-58.25 md:hidden" />
      <Shape variant="looper" className="-rotate-137 top-143.5 left-[calc(50%-609px)] h-394.25 w-364.75 md:hidden" />

      {/* Desktop Shapes */}
      <Shape variant="big-teal" className="-top-13 left-[calc(50%+77px)] hidden size-243.5 md:block" />
      <Shape variant="big-blue" className="top-[364.81px] left-[calc(50%+212.4px)] hidden size-[448.76px] md:block" />
      <Shape
        variant="looper"
        className="top-[-147.41px] left-[calc(50%-268.41px)] hidden h-[1560.62px] w-[1609.84px] rotate-180 md:block"
      />
    </div>
  )
}
