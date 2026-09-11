import { Shape, ShapeLayer } from "@/components/shapes"

export function AssociationsShapes() {
  return (
    <ShapeLayer>
      {/* Mobile Shapes */}
      <Shape variant="big-teal" className="top-193.75 left-[calc(50%-315px)] size-100.25 md:hidden" />
      <Shape variant="big-teal" className="top-334.25 left-[calc(50%-89px)] size-100.25 md:hidden" />
      <Shape variant="big-teal" className="top-413.75 left-[calc(50%-315px)] size-100.25 md:hidden" />
      <Shape variant="big-teal" className="top-30.75 left-[calc(50%-448px)] size-100.25 md:hidden" />
      <Shape variant="small-blue" className="top-4.25 left-[calc(50%+3px)] size-[354.13px] md:hidden" />
      <Shape variant="small-blue" className="top-225.5 left-[calc(50%-281px)] size-58.25 md:hidden" />
      <Shape variant="looper" className="top-[496.08px] left-[calc(50%-499px)] h-[1106.65px] w-[1090.12px] md:hidden" />
      <Shape
        variant="looper"
        className="top-[1400.89px] left-[calc(50%-452.96px)] h-[1020.89px] w-[1000.33px] md:hidden"
      />
      <Shape
        variant="looper"
        className="top-[1423.63px] left-[calc(50%+498.85px)] h-[900.57px] w-[875.85px] md:hidden"
      />

      {/* Desktop Shapes */}
      <Shape variant="big-teal" className="top-81.25 left-[calc(50%-939px)] hidden size-243.5 md:block" />
      {/* <Shape variant="big-teal" className="top-394 left-[calc(50%+71px)] hidden size-243.5 md:block" /> */}
      <Shape variant="small-blue" className="top-36.25 left-[calc(50%+461px)] hidden size-[354.13px] md:block" />
      {/* <Shape variant="small-blue" className="top-542 left-[calc(50%+35px)] hidden size-[354.13px] md:block" /> */}
      <Shape
        variant="looper"
        className="top-38.75 left-[calc(50%-864px)] hidden h-[1560.48px] w-[1609.71px] md:block"
      />
      {/* <Shape
        variant="looper"
        className="bottom-[-1185.16px] left-[calc(50%-807px)] hidden h-[1716.52px] w-[1670.92px] md:block"
      /> */}
    </ShapeLayer>
  )
}
