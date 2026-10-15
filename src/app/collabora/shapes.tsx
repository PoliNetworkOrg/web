import { FigmaShape, type FigmaShapePlacement, ShapeLayer } from "@/components/shapes"

/**
 * Decorative shapes of the "Collabora con Noi" Figma frames (desktop node 5248:13597, 1728px wide; mobile node
 * 5246:13012, 402px wide). Values are the Figma layers' centers, sizes and rotations, in paint order.
 *
 * Background shapes are grouped by the section that contains their center and `y` is measured from that section's
 * top, so they stay next to their section however the copy reflows. `x` and the size scale with the page width.
 *
 * Shapes Figma draws over the photos are anchored to the photo itself (see `PhotoShapes`).
 */

type Placement = FigmaShapePlacement

const DESKTOP_WIDTH = 1728
const MOBILE_WIDTH = 402

function SectionShapes({ desktop = [], mobile = [] }: { desktop?: Placement[]; mobile?: Placement[] }) {
  return (
    <ShapeLayer className="@container">
      {mobile.map((shape) => (
        <FigmaShape
          key={`${shape.variant}-${shape.x}-${shape.y}`}
          {...shape}
          refWidth={MOBILE_WIDTH}
          className="md:hidden"
        />
      ))}
      {desktop.map((shape) => (
        <FigmaShape
          key={`${shape.variant}-${shape.x}-${shape.y}`}
          {...shape}
          refWidth={DESKTOP_WIDTH}
          className="max-md:hidden"
        />
      ))}
    </ShapeLayer>
  )
}

const ROTATE_MINUS_34 = [0.828, -0.56, 0.56, 0.828] as const
const ROTATE_MINUS_98 = [-0.132, -0.991, 0.991, -0.132] as const
const ROTATE_MINUS_45 = [Math.SQRT1_2, -Math.SQRT1_2, Math.SQRT1_2, Math.SQRT1_2] as const

export function CollaboraHeroShapes() {
  return (
    <SectionShapes
      desktop={[
        { variant: "big-teal", x: 274, y: 171, w: 974, h: 974 },
        { variant: "big-blue", x: 1774.2, y: 75.2, w: 676.3, h: 676.3, matrix: [0.951, -0.309, 0.309, 0.951] },
        { variant: "big-blue", x: 77.7, y: -40.3, w: 690.5, h: 690.5, matrix: [0.979, 0.205, -0.205, 0.979] },
        { variant: "looper", x: 393, y: -21.7, w: 1609.7, h: 1560.5, matrix: [0.976, 0.217, -0.217, 0.976] },
      ]}
      mobile={[
        { variant: "big-teal", x: 125.5, y: 140.5, w: 401, h: 401 },
        { variant: "small-blue", x: 401.9, y: 526.9, w: 354.1, h: 354.1, matrix: [0.926, -0.378, 0.378, 0.926] },
        { variant: "looper", x: 100.6, y: 348.8, w: 891, h: 866, matrix: [-0.238, 0.971, 0.971, 0.238] },
      ]}
    />
  )
}

export function CollaboraAboutShapes() {
  return (
    <SectionShapes
      desktop={[
        { variant: "big-teal", x: 170.5, y: 511.5, w: 687, h: 687 },
        { variant: "big-blue", x: 1601.9, y: 299.5, w: 475.1, h: 475.1, matrix: [0.576, -0.818, 0.818, 0.576] },
        { variant: "big-teal", x: 1573, y: 215, w: 782, h: 782 },
        { variant: "looper", x: 361.5, y: 527.5, w: 999, h: 967 },
        { variant: "looper", x: 1561.5, y: 49.5, w: 1407, h: 1363 },
      ]}
      mobile={[
        { variant: "small-blue", x: -49.1, y: 262.9, w: 354.1, h: 354.1, matrix: ROTATE_MINUS_98 },
        { variant: "big-teal", x: 349.5, y: 633.5, w: 401, h: 401 },
        { variant: "looper", x: 184.5, y: 578.9, w: 891, h: 866, matrix: [0.031, -1, 1, 0.031] },
      ]}
    />
  )
}

export function CollaboraCollaborationShapes() {
  return (
    <SectionShapes
      mobile={[
        { variant: "small-blue", x: -9.4, y: 30.6, w: 221.8, h: 221.8, matrix: ROTATE_MINUS_98 },
        { variant: "big-teal", x: -25.5, y: 224.5, w: 401, h: 401 },
        { variant: "looper", x: 215.8, y: 531.2, w: 891, h: 866, matrix: ROTATE_MINUS_45 },
      ]}
    />
  )
}

export function CollaboraAssociationShapes() {
  return (
    <SectionShapes
      desktop={[
        { variant: "big-blue", x: 1672, y: 643, w: 458, h: 458 },
        { variant: "big-blue", x: -25.3, y: 549.7, w: 399.9, h: 399.9, matrix: ROTATE_MINUS_34 },
      ]}
      mobile={[
        { variant: "small-blue", x: -7.4, y: 207.6, w: 221.8, h: 221.8, matrix: ROTATE_MINUS_98 },
        { variant: "big-teal", x: 430.5, y: -0.5, w: 401, h: 401 },
      ]}
    />
  )
}

export function CollaboraCompanyShapes() {
  return (
    <SectionShapes
      mobile={[{ variant: "small-blue", x: 397.6, y: 271.6, w: 221.8, h: 221.8, matrix: ROTATE_MINUS_98 }]}
    />
  )
}

export function CollaboraContactShapes() {
  return (
    <SectionShapes
      desktop={[
        { variant: "big-blue", x: 842.7, y: 435.7, w: 261.4, h: 261.4, matrix: ROTATE_MINUS_34 },
        { variant: "big-teal", x: 83.5, y: 335, w: 489, h: 490 },
        { variant: "big-teal", x: 1570.5, y: 409.5, w: 535, h: 535 },
        { variant: "big-blue", x: 1697.5, y: 230.5, w: 488.5, h: 488.5, matrix: [0.861, 0.508, -0.508, 0.861] },
      ]}
      mobile={[
        { variant: "small-blue", x: -8.4, y: 205.6, w: 221.8, h: 221.8, matrix: ROTATE_MINUS_98 },
        { variant: "big-teal", x: 361.5, y: 393.5, w: 401, h: 401 },
      ]}
    />
  )
}

/**
 * Shapes drawn over a photo, positioned in the photo's own Figma frame (611px wide on desktop, 354px on mobile) so
 * they follow it at every size.
 */
function PhotoShapes({
  desktop,
  mobile,
}: {
  desktop: { width: number; height: number; shapes: Placement[] }
  mobile: { width: number; height: number; shapes: Placement[] }
}) {
  return (
    <>
      {mobile.shapes.map((shape) => (
        <FigmaShape
          key={`${shape.variant}-${shape.x}-${shape.y}`}
          {...shape}
          refWidth={mobile.width}
          refHeight={mobile.height}
          className="md:hidden"
        />
      ))}
      {desktop.shapes.map((shape) => (
        <FigmaShape
          key={`${shape.variant}-${shape.x}-${shape.y}`}
          {...shape}
          refWidth={desktop.width}
          refHeight={desktop.height}
          className="max-md:hidden"
        />
      ))}
    </>
  )
}

export function CollaboraAssociationPhotoShapes() {
  return (
    <PhotoShapes
      desktop={{
        width: 611,
        height: 370,
        shapes: [
          { variant: "small-blue", x: 63.5, y: 246.5, w: 295, h: 295 },
          { variant: "big-teal", x: 620, y: -33, w: 684, h: 684 },
          { variant: "small-blue", x: 600.5, y: -36.5, w: 199, h: 199 },
          { variant: "looper", x: 654.5, y: 69.5, w: 813, h: 787 },
        ],
      }}
      mobile={{
        width: 354,
        height: 210,
        shapes: [
          { variant: "small-blue", x: 15.5, y: 197, w: 163, h: 164 },
          { variant: "big-teal", x: 323, y: -13.5, w: 378, h: 379 },
          { variant: "looper", x: 342.5, y: 43.5, w: 449, h: 435 },
        ],
      }}
    />
  )
}

export function CollaboraCompanyPhotoShapes() {
  return (
    <PhotoShapes
      desktop={{
        width: 611,
        height: 366,
        shapes: [
          { variant: "small-blue", x: 565, y: 322, w: 248, h: 248 },
          { variant: "big-teal", x: -61, y: 119, w: 684, h: 684 },
          { variant: "looper", x: 324.5, y: 261.6, w: 750, h: 727.4, matrix: [0.5, -0.866, 0.866, 0.5] },
        ],
      }}
      mobile={{
        width: 354,
        height: 209,
        shapes: [
          { variant: "small-blue", x: 332.2, y: 159.9, w: 148.4, h: 148.4 },
          { variant: "big-teal", x: -42.4, y: -39.4, w: 409.3, h: 409.3 },
          { variant: "looper", x: 188.3, y: 123.8, w: 448.8, h: 435.3, matrix: [0.5, -0.866, 0.866, 0.5] },
        ],
      }}
    />
  )
}
