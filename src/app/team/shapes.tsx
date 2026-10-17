import Image from "next/image"
import heroGlow from "@/assets/shapes/team/hero-glow.svg"
import { FigmaShape, type FigmaShapePlacement, ShapeLayer } from "@/components/shapes"

export function TeamHeroShapes() {
  return (
    <ShapeLayer className="@container">
      <Image
        src={heroGlow}
        alt=""
        className="-translate-x-1/2 -top-100 md:-top-166.25 absolute left-1/2 h-auto w-160 max-w-none md:left-[calc(50%-29px)] md:w-[77.77%]"
      />
      <FigmaShape variant="looper" refWidth={1728} x={882.5} y={393} w={1401} h={1358} className="hidden md:block" />
    </ShapeLayer>
  )
}

// Original Figma layers, anchored to their sections so they follow responsive content reflow.
const placements: Record<string, FigmaShapePlacement[]> = {
  it: [
    { variant: "big-teal", x: 11, y: 1, w: 1164, h: 1164 },
    { variant: "small-blue", x: -13, y: -306, w: 424, h: 424, matrix: [0.7649, 0.6441, -0.6441, 0.7649] },
    { variant: "looper", x: 373, y: -13, w: 1924, h: 1866 },
  ],
  "design-marketing": [
    { variant: "big-teal", x: 1587, y: -177, w: 662, h: 662 },
    { variant: "small-blue", x: 1442, y: -612, w: 354, h: 354, matrix: [0.8875, -0.4608, 0.4608, 0.8875] },
    { variant: "small-blue", x: -82, y: -240, w: 502, h: 502, matrix: [0.8875, -0.4608, 0.4608, 0.8875] },
  ],
  hr: [
    { variant: "big-teal", x: 0, y: 559, w: 974, h: 974 },
    { variant: "small-blue", x: 310, y: 869, w: 354.126, h: 354.126 },
  ],
  "events-partnership": [
    { variant: "small-blue", x: 1423, y: 432, w: 781, h: 781, matrix: [0.951, -0.3093, 0.3093, 0.951] },
    { variant: "big-teal", x: 1086, y: 627, w: 705, h: 705, matrix: [0.928, 0.3727, -0.3727, 0.928] },
  ],
}

export function TeamSectionShapes({ section }: { section: string }) {
  return (
    <ShapeLayer className="@container">
      {(placements[section] ?? []).map((placement, index) => (
        <FigmaShape
          key={`${section}-${placement.variant}-${index}`}
          {...placement}
          refWidth={1728}
          className="hidden md:block"
        />
      ))}
    </ShapeLayer>
  )
}
