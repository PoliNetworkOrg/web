import { Shape } from "@/components/shapes"

export function FooterShapes() {
  return (
    <div aria-hidden className="-z-10 pointer-events-none absolute inset-0 overflow-hidden">
      {/* Desktop Shapes */}
      <Shape variant="big-teal" className="top-45.75 left-[calc(50%-1064px)] hidden size-361 md:block" />
      <Shape variant="small-blue" className="top-88.75 left-[calc(50%-815px)] hidden size-88.5 md:block" />
      <Shape variant="big-blue" className="top-8.5 left-[calc(50%-100px)] hidden size-265.5 rotate-26 md:block" />
    </div>
  )
}
