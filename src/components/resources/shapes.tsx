import { Shape, ShapeLayer } from "@/components/shapes"

/**
 * Hero background shared by the Matricole and FAQs pages (same Figma design).
 */

export function ResourcesHeroShapes() {
  return (
    <ShapeLayer>
      {/* Mobile Shapes */}
      <Shape variant="looper" className="top-93.75 left-[calc(50%+77.49px)] h-[1242.39px] w-[1242.38px] md:hidden" />
      <Shape
        variant="big-teal"
        className="top-130.5 left-[calc(50%-351.91px)] h-91.75 w-[414.26px] rotate-[22.26deg] md:hidden"
      />
      <Shape
        variant="resources-top-glow"
        className="-top-106.5 left-[calc(50%-816px)] h-[894.535px] w-[974.665px] md:hidden"
      />
      <Shape
        variant="resources-glow-2"
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
