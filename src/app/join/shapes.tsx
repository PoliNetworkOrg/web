import { FigmaShape, type FigmaShapePlacement, ShapeLayer } from "@/components/shapes"

type JoinSection = "hero" | "intro" | "admin" | "team" | "membership"

// Original Figma layer transforms, anchored to each section as its content reflows.
const layouts: Record<"desktop" | "mobile", Record<JoinSection, FigmaShapePlacement[]>> = {
  desktop: {
    hero: [
      { variant: "big-teal", x: 864, y: 199, w: 974, h: 974, matrix: [1, 0, 0, 1] },
      { variant: "big-blue", x: 1740.603, y: 169.599, w: 616.16, h: 616.16, matrix: [1, -0.006, 0.006, 1] },
      { variant: "small-blue", x: 35.063, y: 40.063, w: 354.126, h: 354.126, matrix: [1, 0, 0, 1] },
      {
        variant: "looper",
        x: 890.098,
        y: 150.508,
        w: 1246.093,
        h: 1207.653,
        matrix: [0.9659, -0.2588, 0.2588, 0.9659],
      },
    ],
    intro: [
      { variant: "big-teal", x: 72, y: 49, w: 746, h: 746, matrix: [1, 0, 0, 1] },
      { variant: "big-blue", x: 1631.454, y: 182.454, w: 616.16, h: 616.16, matrix: [0.4229, -0.9062, 0.9062, 0.4229] },
      { variant: "small-blue", x: -12.937, y: 214.063, w: 354.126, h: 354.126, matrix: [1, 0, 0, 1] },
      { variant: "small-blue", x: 937.063, y: 584.063, w: 354.126, h: 354.126, matrix: [1, 0, 0, 1] },
      {
        variant: "looper",
        x: -98.299,
        y: 458.503,
        w: 1090.912,
        h: 1057.259,
        matrix: [-0.5916, -0.8062, 0.8062, -0.5916],
      },
    ],
    admin: [
      { variant: "big-teal", x: 159.5, y: 1077.5, w: 675, h: 675, matrix: [1, 0, 0, 1] },
      { variant: "big-teal", x: 1583, y: 626, w: 664, h: 664, matrix: [1, 0, 0, 1] },
      { variant: "big-blue", x: -32.083, y: 170.919, w: 616.16, h: 616.16, matrix: [-0.275, -0.9614, 0.9614, -0.275] },
      { variant: "small-blue", x: 1019.967, y: 1036.968, w: 221, h: 221, matrix: [0.9731, -0.2302, 0.2302, 0.9731] },
      {
        variant: "small-blue",
        x: 27.612,
        y: 940.612,
        w: 354.126,
        h: 354.126,
        matrix: [0.5243, -0.8515, 0.8515, 0.5243],
      },
      { variant: "looper", x: 1794.453, y: 502.487, w: 1246.093, h: 1207.653, matrix: [0.5, 0.866, -0.866, 0.5] },
      {
        variant: "looper",
        x: -32.232,
        y: 1031.157,
        w: 1246.093,
        h: 1207.653,
        matrix: [0.1468, -0.9892, 0.9892, 0.1468],
      },
    ],
    team: [
      { variant: "big-teal", x: -18.5, y: 685.5, w: 741, h: 741, matrix: [1, 0, 0, 1] },
      { variant: "big-blue", x: 1696.443, y: 502.443, w: 616.16, h: 616.16, matrix: [0.8537, -0.5208, 0.5208, 0.8537] },
      {
        variant: "looper",
        x: -61,
        y: 611.597,
        w: 830.216,
        h: 804.605,
        matrix: [-Math.SQRT1_2, -Math.SQRT1_2, Math.SQRT1_2, -Math.SQRT1_2],
      },
    ],
    membership: [
      { variant: "big-blue", x: -179.592, y: 61.408, w: 554.027, h: 554.027, matrix: [0.866, -0.5, 0.5, 0.866] },
      {
        variant: "big-blue",
        x: 928.663,
        y: 239.663,
        w: 487.353,
        h: 487.353,
        matrix: [0.9656, -0.2601, 0.2601, 0.9656],
      },
    ],
  },
  mobile: {
    hero: [
      { variant: "big-teal", x: 195.5, y: 97.524, w: 571, h: 571, matrix: [1, 0, 0, 1] },
      { variant: "looper", x: 219.393, y: 168.269, w: 730.628, h: 708.09, matrix: [0.8581, -0.5135, 0.5135, 0.8581] },
      { variant: "small-blue", x: 0, y: 40, w: 222, h: 222, matrix: [1, 0, 0, 1] },
      { variant: "small-blue", x: 0, y: 651, w: 222, h: 222, matrix: [1, 0, 0, 1] },
    ],
    intro: [
      { variant: "big-teal", x: 339.5, y: 441.5, w: 571, h: 571, matrix: [1, 0, 0, 1] },
      { variant: "looper", x: 455.27, y: 408.394, w: 730.628, h: 708.09, matrix: [0.5, 0.866, -0.866, 0.5] },
      { variant: "small-blue", x: 9, y: 624, w: 222, h: 222, matrix: [1, 0, 0, 1] },
    ],
    admin: [
      { variant: "big-teal", x: -33.5, y: 391.5, w: 571, h: 571, matrix: [1, 0, 0, 1] },
      { variant: "big-teal", x: -20.366, y: 1077.633, w: 444, h: 444, matrix: [0.7877, -0.616, 0.616, 0.7877] },
      { variant: "looper", x: -106.469, y: 430.5, w: 730.628, h: 708.09, matrix: [-0.2588, -0.9659, 0.9659, -0.2588] },
      { variant: "small-blue", x: 269, y: 677, w: 200, h: 200, matrix: [1, 0, 0, 1] },
      { variant: "small-blue", x: 377.5, y: 1339.5, w: 265, h: 265, matrix: [1, 0, 0, 1] },
    ],
    team: [
      { variant: "big-teal", x: -20.366, y: 491.633, w: 444, h: 444, matrix: [0.7877, -0.616, 0.616, 0.7877] },
      { variant: "looper", x: -184.934, y: 453.92, w: 730.628, h: 708.09, matrix: [0.4581, -0.8889, 0.8889, 0.4581] },
    ],
    membership: [
      { variant: "big-teal", x: 373.634, y: 331.633, w: 444, h: 444, matrix: [0.7877, -0.616, 0.616, 0.7877] },
      { variant: "small-blue", x: -31.5, y: 607.5, w: 265, h: 265, matrix: [1, 0, 0, 1] },
      { variant: "small-blue", x: 373.5, y: 893.5, w: 265, h: 265, matrix: [1, 0, 0, 1] },
    ],
  },
}
const photoLayers: Record<"desktop" | "mobile", FigmaShapePlacement[]> = {
  desktop: [
    { variant: "small-blue", x: 593.712, y: 189, w: 312, h: 312, matrix: [0.9403, -0.3404, 0.3404, 0.9403] },
    { variant: "small-blue", x: -35.053, y: 60.843, w: 372.538, h: 372.538, matrix: [0.9403, -0.3404, 0.3404, 0.9403] },
    { variant: "looper", x: 89.691, y: 137.058, w: 718.112, h: 695.96, matrix: [0.2588, -0.9659, -0.9659, -0.2588] },
  ],
  mobile: [
    {
      variant: "small-blue",
      x: 313.296,
      y: 140.296,
      w: 148.818,
      h: 148.818,
      matrix: [0.9403, -0.3404, 0.3404, 0.9403],
    },
    { variant: "small-blue", x: -6.214, y: 24.787, w: 177.693, h: 177.693, matrix: [0.9403, -0.3404, 0.3404, 0.9403] },
    { variant: "looper", x: 39.651, y: 77.385, w: 342.525, h: 331.959, matrix: [0.2588, -0.9659, -0.9659, -0.2588] },
  ],
}

export function JoinShapes({ section }: { section: JoinSection }) {
  return (
    <ShapeLayer className="@container">
      {(["mobile", "desktop"] as const).map((layout) => (
        <div key={layout} className={layout === "mobile" ? "md:hidden" : "hidden md:block"}>
          {layouts[layout][section].map((shape, index) => (
            <FigmaShape key={`${shape.variant}-${index}`} {...shape} refWidth={layout === "mobile" ? 402 : 1728} />
          ))}
        </div>
      ))}
    </ShapeLayer>
  )
}

export function JoinPhotoShapes() {
  return (
    <div aria-hidden className="@container pointer-events-none absolute inset-0 z-10">
      {(["mobile", "desktop"] as const).map((layout) => (
        <div key={layout} className={layout === "mobile" ? "md:hidden" : "hidden md:block"}>
          {photoLayers[layout].map((shape, index) => (
            <FigmaShape
              key={`${shape.variant}-${index}`}
              {...shape}
              refWidth={layout === "mobile" ? 354 : 642}
              refHeight={layout === "mobile" ? 172 : 312}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
