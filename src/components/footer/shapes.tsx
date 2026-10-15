import { FigmaShape, ShapeLayer } from "@/components/shapes"

/** Background of the Figma desktop footer ("footer-francesca" > bg), clipped to the footer like in Figma. */
export function FooterShapes() {
  return (
    <ShapeLayer className="@container max-lg:hidden">
      <FigmaShape variant="big-teal" refWidth={1728} x={526} y={966} w={1444} h={1444} />
      <FigmaShape variant="small-blue" refWidth={1728} x={230.1} y={593.1} w={354.1} h={354.1} />
      <FigmaShape
        variant="big-blue"
        refWidth={1728}
        x={1287.1}
        y={811.1}
        w={1062.2}
        h={1062.2}
        matrix={[0.888, 0.461, -0.461, 0.888]}
      />
      <FigmaShape
        variant="looper"
        refWidth={1728}
        x={742.9}
        y={769.6}
        w={1609.7}
        h={1560.5}
        matrix={[0.857, 0.516, -0.516, 0.857]}
      />
    </ShapeLayer>
  )
}
