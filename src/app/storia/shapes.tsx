import { Shape, ShapeLayer } from "@/components/shapes"

// Desktop offsets are relative to the matching section in the 1728px Figma
// frame. Each layer follows its section as the content reflows, as on the other
// pages. Smaller viewports use the same assets at the repository's mobile scale.
export function HistoryHeroShapes() {
  return (
    <ShapeLayer>
      <Shape
        variant="big-teal"
        className="-top-15 left-[calc(50%-401px)] size-100.25 xl:top-0 xl:left-[calc(50%-1314px)] xl:size-243.5"
      />
      <Shape
        variant="big-teal"
        className="-top-15 left-1/2 size-100.25 xl:top-0 xl:left-[calc(50%+340px)] xl:size-243.5"
      />
      <Shape
        variant="looper"
        className="-top-46 xl:-top-18.5 left-[calc(50%-600px)] h-245 w-250 xl:left-[calc(50%-1428px)] xl:h-[1881px] xl:w-[1918px]"
      />
      <Shape
        variant="looper"
        className="top-185 left-[calc(50%+190px)] hidden h-[2145px] w-[2164px] rotate-180 xl:block"
      />
    </ShapeLayer>
  )
}

export function HistoryIntroShapes() {
  return (
    <ShapeLayer className="-inset-x-4">
      <Shape
        variant="big-teal"
        className="top-45.75 left-[calc(50%-200px)] size-100.25 xl:left-[calc(50%-487px)] xl:size-243.5"
      />
    </ShapeLayer>
  )
}

export function HistoryTimelineShapes() {
  return (
    <ShapeLayer className="-inset-x-4">
      <Shape variant="big-blue" className="top-172 left-[calc(50%+14px)] size-80 xl:size-115" />
      <Shape
        variant="big-teal"
        className="top-165.25 left-[calc(50%-300px)] size-100.25 xl:left-[calc(50%-801px)] xl:size-243.5"
      />
    </ShapeLayer>
  )
}

export function HistoryChaptersShapes() {
  return (
    <ShapeLayer className="-inset-x-4">
      <Shape
        variant="big-blue"
        className="top-180.75 left-[calc(50%-280px)] size-100 xl:left-[calc(50%-666px)] xl:size-150"
      />
      <Shape variant="big-blue" className="top-330.25 left-[calc(50%-65px)] size-100 xl:size-144.5" />
      <Shape
        variant="big-teal"
        className="top-445.75 left-[calc(50%-400px)] size-150 xl:left-[calc(50%-939px)] xl:size-329.5"
      />
      <Shape
        variant="big-blue"
        className="top-601.75 left-[calc(50%+10px)] size-100 xl:left-[calc(50%+336px)] xl:size-144.5"
      />
    </ShapeLayer>
  )
}

export function HistoryBoardsShapes() {
  return (
    <ShapeLayer className="-inset-x-4">
      <Shape
        variant="big-teal"
        className="top-108 left-[calc(50%+10px)] size-100.25 xl:left-[calc(50%+316px)] xl:size-201.5"
      />
    </ShapeLayer>
  )
}

export function HistoryProjectsShapes() {
  return (
    <ShapeLayer className="-inset-x-4">
      <Shape
        variant="big-teal"
        className="top-203 left-[calc(50%-300px)] size-100.25 xl:left-[calc(50%-706px)] xl:size-243.5"
      />
      <Shape variant="big-blue" className="top-229.5 left-[calc(50%-199px)] size-100 xl:size-144.5" />
      <Shape variant="big-blue" className="top-209.75 left-[calc(50%+45px)] size-80 xl:size-115" />
    </ShapeLayer>
  )
}

export function HistoryThanksShapes() {
  return (
    <ShapeLayer className="-inset-x-4">
      <Shape
        variant="big-blue"
        className="top-126.5 left-[calc(50%-280px)] size-100 xl:left-[calc(50%-571px)] xl:size-150"
      />
    </ShapeLayer>
  )
}
