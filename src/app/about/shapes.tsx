import { FigmaShape, type FigmaShapePlacement, ShapeLayer } from "@/components/shapes"

type StructureSection = "hero" | "diagram" | "board" | "association" | "participation" | "join" | "legal"

// Original Figma layers, anchored to content sections to follow responsive reflow.
const layouts: Record<"desktop" | "mobile", Partial<Record<StructureSection, FigmaShapePlacement[]>>> = {
  desktop: {
    hero: [
      {
        variant: "big-teal",
        x: 1034,
        y: 411,
        w: 974,
        h: 974,
      },
      {
        variant: "small-blue",
        x: 524.063,
        y: 325.063,
        w: 354.126,
        h: 354.126,
        matrix: [0.962952, -0.269672, 0.269672, 0.962952],
      },
      {
        variant: "small-blue",
        x: 1347.063,
        y: 643.063,
        w: 354.126,
        h: 354.126,
        matrix: [0.956549, 0.291573, -0.291573, 0.956549],
      },
      {
        variant: "looper",
        x: 1213.853,
        y: 569.24,
        w: 1609.706,
        h: 1560.48,
      },
    ],
    board: [
      {
        variant: "big-teal",
        x: 371.5,
        y: 393.5,
        w: 531,
        h: 531,
      },
      {
        variant: "big-blue",
        x: 1048.74,
        y: 212.413,
        w: 961.091,
        h: 961.091,
        matrix: [0.896447, 0.443151, -0.443151, 0.896447],
      },
      {
        variant: "looper",
        x: 686.145,
        y: 47.876,
        w: 1609.706,
        h: 1560.48,
        matrix: [0.341412, -0.939914, 0.939914, 0.341412],
      },
    ],
    association: [
      {
        variant: "big-teal",
        x: 26,
        y: 487,
        w: 974,
        h: 974,
      },
      {
        variant: "big-teal",
        x: 1710,
        y: 487,
        w: 974,
        h: 974,
      },
    ],
    participation: [
      {
        variant: "looper",
        x: 767.228,
        y: 6.001,
        w: 1957.868,
        h: 1897.994,
        matrix: [-0.392771, 0.919636, -0.919636, -0.392771],
      },
    ],
    join: [
      {
        variant: "big-blue",
        x: 1012.929,
        y: 583.929,
        w: 589.394,
        h: 589.394,
        matrix: [0.965926, -0.258819, 0.258819, 0.965926],
      },
      {
        variant: "big-teal",
        x: 725,
        y: 515,
        w: 690,
        h: 690,
      },
    ],
    legal: [
      {
        variant: "looper",
        x: 677.351,
        y: 108.285,
        w: 1609.706,
        h: 1560.48,
        matrix: [-0.908395, 0.418112, -0.418112, -0.908395],
      },
    ],
  },
  mobile: {
    hero: [
      {
        variant: "big-teal",
        x: 275.5,
        y: 295.5,
        w: 401,
        h: 401,
      },
      {
        variant: "small-blue",
        x: 75.063,
        y: 272.063,
        w: 354.126,
        h: 354.126,
      },
      {
        variant: "small-blue",
        x: 359.5,
        y: 495.5,
        w: 233,
        h: 233,
      },
      {
        variant: "looper",
        x: 247.062,
        y: 197.977,
        w: 891,
        h: 866,
        matrix: [0.542465, 0.840078, -0.840078, 0.542465],
      },
    ],
    diagram: [
      {
        variant: "big-teal",
        x: -25.5,
        y: 250.5,
        w: 401,
        h: 401,
      },
      {
        variant: "big-teal",
        x: 331.5,
        y: 493.5,
        w: 401,
        h: 401,
      },
      {
        variant: "looper",
        x: 150.273,
        y: 415.9,
        w: 891,
        h: 866,
        matrix: [-0.996255, 0.086469, -0.086469, -0.996255],
      },
    ],
    board: [
      {
        variant: "big-teal",
        x: 312.5,
        y: 311.5,
        w: 401,
        h: 401,
      },
      {
        variant: "small-blue",
        x: 75.5,
        y: 30.5,
        w: 233,
        h: 233,
      },
    ],
    association: [
      {
        variant: "big-teal",
        x: 220.5,
        y: 334.5,
        w: 401,
        h: 401,
      },
      {
        variant: "looper",
        x: 261.925,
        y: 523.285,
        w: 891,
        h: 866,
        matrix: [-0.011115, 0.999938, -0.999938, -0.011115],
      },
    ],
    participation: [
      {
        variant: "big-teal",
        x: 312.5,
        y: 316.5,
        w: 401,
        h: 401,
      },
      {
        variant: "small-blue",
        x: 118.063,
        y: 730.063,
        w: 354.126,
        h: 354.126,
      },
      {
        variant: "looper",
        x: 328.423,
        y: 1356.32,
        w: 891,
        h: 866,
        matrix: [0.104528, -0.994522, 0.994522, 0.104528],
      },
    ],
    join: [
      {
        variant: "big-teal",
        x: 392.5,
        y: 104.5,
        w: 401,
        h: 401,
      },
      {
        variant: "small-blue",
        x: -20.937,
        y: 182.063,
        w: 354.126,
        h: 354.126,
      },
    ],
    legal: [
      {
        variant: "big-teal",
        x: 191.5,
        y: 512.5,
        w: 401,
        h: 401,
      },
      {
        variant: "small-blue",
        x: 197.063,
        y: 366.063,
        w: 354.126,
        h: 354.126,
      },
      {
        variant: "looper",
        x: 288.422,
        y: 453.976,
        w: 891,
        h: 866,
        matrix: [0.542465, 0.840078, -0.840078, 0.542465],
      },
    ],
  },
}

export function StructureShapes({ section }: { section: StructureSection }) {
  return (
    <ShapeLayer className="@container">
      {(["desktop", "mobile"] as const).map((layout) =>
        (layouts[layout][section] ?? []).map((placement) => (
          <FigmaShape
            key={`${layout}-${placement.variant}-${placement.x}-${placement.y}`}
            {...placement}
            refWidth={layout === "desktop" ? 1728 : 402}
            className={layout === "desktop" ? "hidden md:block" : "md:hidden"}
          />
        ))
      )}
    </ShapeLayer>
  )
}
