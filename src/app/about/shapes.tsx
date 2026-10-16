import { FigmaShape, type FigmaShapePlacement, ShapeLayer } from "@/components/shapes"

// Original layers of the desktop Figma frame “Struttura” (5625:7108), anchored to their sections so they follow
// responsive content reflow: `y` is measured from the top of the section the shape sits behind.
const placements: Record<string, FigmaShapePlacement[]> = {
  hero: [
    { variant: "big-teal", x: 1034, y: 411, w: 974, h: 974 },
    { variant: "small-blue", x: 524.06, y: 325.06, w: 436.5, h: 436.5 },
    { variant: "small-blue", x: 1347.07, y: 643.07, w: 441.99, h: 441.99 },
    { variant: "looper", x: 1213.85, y: 569.24, w: 1609.71, h: 1560.48 },
  ],
  board: [
    { variant: "big-teal", x: 371.5, y: 393.5, w: 531, h: 531 },
    { variant: "big-blue", x: 1048.74, y: 212.42, w: 1287.48, h: 1287.48 },
    { variant: "looper", x: 686.14, y: 47.88, w: 2016.29, h: 2045.75 },
  ],
  association: [
    { variant: "big-teal", x: 26, y: 487, w: 974, h: 974 },
    { variant: "big-teal", x: 1710, y: 487, w: 974, h: 974 },
    { variant: "looper", x: 767.23, y: 714, w: 2514.46, h: 2546 },
  ],
  "legal-form": [
    { variant: "big-blue", x: 1012.93, y: -36.07, w: 721.86, h: 721.86 },
    { variant: "big-teal", x: 725, y: -105, w: 690, h: 690 },
    { variant: "looper", x: 677.35, y: 108.29, w: 2114.71, h: 2090.57 },
  ],
}

export function StructureSectionShapes({ section }: { section: string }) {
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
