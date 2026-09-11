import { Shape, ShapeLayer } from "@/components/shapes"

/**
 * `left` offsets are `calc(50% + Npx)`, relative to the horizontal center of
 * the 1728px-wide (desktop) / 402px-wide (mobile) Figma reference frames —
 * see src/components/home/shapes.tsx for why.
 *
 * `top` is relative to the top of the section each component is mounted in
 * (MatricoleIntro, MatricoleGuides, FAQsPage), matching how the section
 * boundaries are grouped in the Figma file, not to the page as a whole.
 */

export function MatricoleIntroShapes() {
  return (
    <ShapeLayer>
      {/* Mobile Shapes */}
      <Shape variant="looper" className="top-93.75 left-[calc(50%+77.49px)] h-[1242.39px] w-[1242.38px] md:hidden" />
      <Shape
        variant="big-teal"
        className="top-130.5 left-[calc(50%-351.91px)] h-91.75 w-[414.26px] rotate-[22.26deg] md:hidden"
      />
      <Shape
        variant="matricole-top-glow"
        className="-top-106.5 left-[calc(50%-816px)] h-[894.535px] w-[974.665px] md:hidden"
      />
      <Shape
        variant="matricole-glow-2"
        className="top-[435.28px] left-[calc(50%+342.24px)] size-[287.24px] md:hidden"
      />

      {/* Desktop Shapes */}
      <Shape variant="big-teal" className="top-0 left-[calc(50%-1314px)] hidden size-243.5 md:block" />
      <Shape variant="big-teal" className="-top-1.25 left-[calc(50%+289px)] hidden size-243.5 md:block" />
      <Shape
        variant="looper"
        className="-rotate-13 -top-100 left-[calc(50%-1428px)] hidden h-[1881.13px] w-[1918.09px] md:block"
      />
      <Shape
        variant="looper"
        className="-rotate-151 -top-100 left-[calc(50%-400px)] hidden h-[1881.13px] w-[1918.09px] md:block"
      />
    </ShapeLayer>
  )
}

export function MatricoleGuidesShapes() {
  return (
    <ShapeLayer>
      {/* Mobile Shapes */}
      <Shape variant="big-teal" className="top-44 left-[calc(50%-206px)] size-100.25 md:hidden" />
      <Shape variant="small-blue" className="top-88.75 left-[calc(50%-116px)] size-58.25 md:hidden" />
      <Shape variant="big-teal" className="top-243.75 left-[calc(50%-317px)] size-100.25 md:hidden" />
      <Shape variant="big-teal" className="top-422.5 left-[calc(50%-260px)] size-40.75 md:hidden" />
      <Shape variant="big-teal" className="top-408.5 left-[calc(50%-19px)] size-100.25 md:hidden" />
      <Shape variant="big-teal" className="top-475 left-[calc(50%-412px)] size-100.25 md:hidden" />
      <Shape variant="small-blue" className="top-224.5 left-[calc(50%-14px)] size-58.25 md:hidden" />
      <Shape variant="matricole-glow-1" className="top-[1553.59px] left-[calc(50%-304px)] size-54.75 md:hidden" />
      <Shape variant="big-teal" className="top-571.75 left-[calc(50%+311px)] size-100.25 md:hidden" />

      <Shape variant="looper" className="-top-20 left-[calc(50%-340px)] size-200 rotate-45 md:hidden" />
      <Shape variant="looper" className="-rotate-93 top-350.75 left-[calc(50%-500px)] size-250 md:hidden" />

      {/* Desktop Shapes */}
      <Shape variant="big-teal" className="top-[711.58px] left-[calc(50%-1200px)] hidden size-243.5 md:block" />
      <Shape variant="small-blue" className="top-[699.7px] left-[calc(50%-900px)] hidden size-[498.98px] md:block" />
      <Shape
        variant="looper"
        className="top-[521.62px] left-[calc(50%-1700px)] hidden h-[1560.48px] w-[1609.71px] rotate-x-180 md:block"
      />
      <Shape variant="big-teal" className="top-[1032.08px] left-[calc(50%+300px)] hidden size-165.5 md:block" />
      <Shape variant="small-blue" className="top-[920.96px] left-[calc(50%+500px)] hidden size-[477.48px] md:block" />
    </ShapeLayer>
  )
}

export function MatricoleFAQsShapes() {
  return (
    <ShapeLayer>
      {/* Mobile Shapes (this section has no shapes on desktop) */}
      <Shape variant="big-teal" className="top-75 left-[calc(50%-364px)] h-103.75 w-107 md:hidden" />
      <Shape variant="small-blue" className="top-95.75 left-[calc(50%-327px)] size-58.25 md:hidden" />
      <Shape variant="big-teal" className="left-[calc(50%)] size-100 md:hidden" />
    </ShapeLayer>
  )
}
