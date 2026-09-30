import { Shape, ShapeLayer } from "@/components/shapes"

export function GroupsShapes() {
  return (
    <ShapeLayer className="overflow-hidden">
      {/* Mobile Shapes */}
      <Shape variant="big-teal" className="-top-20 left-[calc(50%-300px)] size-70.25 md:hidden" />
      <Shape variant="big-blue" className="top-20 left-[calc(50%+100px)] size-70.25 rotate-132 md:hidden" />
      <Shape variant="big-teal" className="top-250 left-[calc(50%-206px)] size-100.25 md:hidden" />
      <Shape variant="small-blue" className="top-300 left-[calc(50%-116px)] size-58.25 md:hidden" />
      <Shape variant="looper" className="-top-100 -rotate-163.5 left-[calc(50%-600px)] h-[690.4] w-200.75 md:hidden" />
      <Shape variant="looper" className="top-200.75 left-[calc(50%-400px)] size-220 rotate-45 md:hidden" />

      {/* Desktop Shapes */}
      <Shape variant="big-blue" className="top-121.5 left-[calc(50%-141.91px)] hidden size-[733.21px] md:block" />
      <Shape variant="big-teal" className="top-48.75 left-[calc(50%+154px)] hidden size-209 md:block" />
      <Shape variant="big-teal" className="top-54.25 left-[calc(50%-729px)] hidden size-199.25 md:block" />
      <Shape variant="small-blue" className="top-34.25 left-[calc(50%-759px)] hidden size-[354.13px] md:block" />
      <Shape variant="looper" className="top-12.5 left-[calc(50%-1028px)] hidden size-300 md:block" />
      <Shape variant="looper" className="-top-12.5 left-[calc(50%+100px)] hidden size-300 rotate-215 md:block" />
    </ShapeLayer>
  )
}
