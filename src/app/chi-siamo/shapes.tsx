import { Shape, ShapeLayer } from "@/components/shapes"

/**
 * `left` offsets are `calc(50% + Npx)`, relative to the horizontal center of
 * the 1728px (desktop) Figma frame — see src/components/home/shapes.tsx.
 *
 * Each section's shapes are `top`-anchored to that section's heading (the
 * section's top edge): `top = figmaY - figmaHeadingY`. The vision shapes are
 * instead anchored to the page top, since that section starts at the top of
 * `<main>`, where page y = Figma y.
 *
 * The Figma file only has a desktop frame for this page, so there are no
 * mobile shapes yet.
 */

export function ChiSiamoVisionShapes() {
  return (
    <ShapeLayer>
      {/* Desktop Shapes */}
      <Shape variant="big-teal" className="top-0 left-[calc(50%-1314px)] hidden size-243.5 md:block" />
      <Shape variant="big-teal" className="top-0 left-[calc(50%+340px)] hidden size-243.5 md:block" />
      <Shape
        variant="looper"
        className="-top-108.5 left-[calc(50%-1428px)] hidden h-[1881.13px] w-[1918.09px] md:block"
      />
      <Shape
        variant="looper"
        className="-top-144.75 left-[calc(50%-472px)] hidden h-[2145.12px] w-[2164.32px] md:block"
      />
    </ShapeLayer>
  )
}

export function ChiSiamoProblemShapes() {
  return (
    <ShapeLayer>
      {/* Desktop Shapes */}
      <Shape
        variant="looper"
        className="-top-60.75 left-[calc(50%-959px)] hidden h-[1881.13px] w-[1918.09px] md:block"
      />
      <Shape variant="big-teal" className="top-57 left-[calc(50%-487px)] hidden size-243.5 md:block" />
    </ShapeLayer>
  )
}

export function ChiSiamoAnswerShapes() {
  return (
    <ShapeLayer>
      {/* Desktop Shapes */}
      <Shape variant="big-blue" className="top-61.75 left-[calc(50%-294px)] hidden size-144.5 md:block" />
    </ShapeLayer>
  )
}

export function ChiSiamoPathShapes() {
  return (
    <ShapeLayer>
      {/* Desktop Shapes */}
      <Shape variant="big-blue" className="top-81.25 left-[calc(50%-50px)] hidden size-115 md:block" />
      <Shape variant="big-teal" className="top-74.5 left-[calc(50%-801px)] hidden size-243.5 md:block" />
      <Shape variant="looper" className="top-42 left-[calc(50%-1136px)] hidden h-[1560.48px] w-[1609.71px] md:block" />
    </ShapeLayer>
  )
}

export function ChiSiamoNumbersShapes() {
  return (
    <ShapeLayer>
      {/* Desktop Shapes */}
      <Shape
        variant="big-blue"
        className="top-[691.05px] left-[calc(50%-767.95px)] hidden size-115 rotate-[21.84deg] md:block"
      />
      <Shape variant="big-teal" className="top-219.5 left-[calc(50%-41px)] hidden h-238 w-245.5 md:block" />
      <Shape variant="looper" className="top-186 left-[calc(50%-395px)] hidden h-[1560.48px] w-[1609.71px] md:block" />
    </ShapeLayer>
  )
}

export function ChiSiamoHistoryShapes() {
  return (
    <ShapeLayer>
      {/* Desktop Shapes */}
      <Shape variant="big-blue" className="top-73.75 left-[calc(50%+42px)] hidden size-[770.77px] md:block" />
    </ShapeLayer>
  )
}
