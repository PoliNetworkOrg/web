import { Shape, ShapeLayer } from "@/components/shapes"

/**
 * `left` offsets are `calc(50% + Npx)`, relative to the horizontal center of
 * the 1728px (desktop) / 402px (mobile) Figma frames — see
 * src/components/home/shapes.tsx.
 *
 * The real sections are much shorter/taller than the Figma frames (up to
 * ~300px drift on desktop, and the mobile page is ~60% taller), so each
 * section's shapes are `top`-anchored to that section's heading (the section's
 * top edge): `top = figmaY - figmaHeadingY`. The hero shapes are instead on a
 * layer over the whole `<main>`, where page y = Figma y.
 *
 * On mobile the photo decorations of "associazione"/"azienda" are anchored to
 * the section bottom, since the photo is the last element there.
 *
 * Section layers use `-inset-x-4` because the sections sit inside `<main>`'s
 * `px-4`: without it the layer (and its horizontal clip) would stop 16px short
 * of the viewport edges.
 */

export function CollaboraHeroShapes() {
  return (
    <ShapeLayer>
      {/* Mobile Shapes */}
      <Shape variant="big-teal" className="-top-15 left-[calc(50%-276px)] size-100.25 md:hidden" />
      <Shape variant="small-blue" className="top-[429.87px] left-[calc(50%-30px)] size-[461.71px] md:hidden" />
      <Shape variant="looper" className="-top-46.75 left-[calc(50%-414.95px)] h-[1071.5px] w-[1053.17px] md:hidden" />

      {/* Desktop Shapes */}
      <Shape variant="big-teal" className="-top-79 left-[calc(50%-1077px)] hidden size-243.5 md:block" />
      <Shape variant="big-blue" className="top-[-141.76px] left-[calc(50%+484px)] hidden size-[852.32px] md:block" />
      <Shape variant="big-blue" className="-top-112.25 left-[calc(50%-1053.43px)] hidden size-[817.37px] md:block" />
      <Shape
        variant="looper"
        className="-top-239.5 left-[calc(50%-1087.41px)] hidden h-[1872.58px] w-[1909.95px] md:block"
      />
      <Shape variant="big-teal" className="top-153 left-[calc(50%+318px)] hidden size-195.5 md:block" />
      <Shape variant="looper" className="top-39 left-[calc(50%-6px)] hidden h-340.75 w-351.75 md:block" />
    </ShapeLayer>
  )
}

export function CollaboraAboutShapes() {
  return (
    <ShapeLayer className="-inset-x-4">
      {/* Mobile Shapes */}
      <Shape variant="small-blue" className="top-[341.77px] left-[calc(50%-402.25px)] size-[397.83px] md:hidden" />
      <Shape variant="big-teal" className="top-78.25 left-[calc(50%-52px)] size-100.25 md:hidden" />

      {/* Desktop Shapes */}
      <Shape variant="big-teal" className="top-23.25 left-[calc(50%-1037px)] hidden size-171.75 md:block" />
      <Shape variant="big-blue" className="top-[281.91px] left-[calc(50%+406.91px)] hidden size-[661.95px] md:block" />
      <Shape variant="looper" className="-top-7.75 left-[calc(50%-1002px)] hidden h-241.75 w-249.75 md:block" />
    </ShapeLayer>
  )
}

export function CollaboraCollaborationShapes() {
  return (
    <ShapeLayer className="-inset-x-4">
      {/* Mobile Shapes */}
      <Shape variant="small-blue" className="top-[35.16px] left-[calc(50%-305.68px)] size-[249.16px] md:hidden" />
      <Shape variant="big-teal" className="-top-24 left-[calc(50%-427px)] size-100.25 md:hidden" />
      <Shape variant="big-teal" className="top-71.25 left-[calc(50%+29px)] size-100.25 md:hidden" />
      <Shape variant="looper" className="top-[74.56px] left-[calc(50%-463.34px)] h-[917.81px] w-[893.61px] md:hidden" />
      <Shape variant="looper" className="top-[420.03px] left-[calc(50%-606.39px)] size-[1242.39px] md:hidden" />

      {/* Desktop Shapes */}
      <Shape variant="big-teal" className="top-40.5 left-[calc(50%+386px)] hidden size-171 md:block" />
      <Shape variant="looper" className="top-53.25 left-[calc(50%+356px)] hidden h-196.75 w-203.25 md:block" />
    </ShapeLayer>
  )
}

export function CollaboraAssociationShapes() {
  return (
    <ShapeLayer className="-inset-x-4">
      {/* Mobile Shapes */}
      <Shape variant="small-blue" className="top-[212.16px] left-[calc(50%-303.68px)] size-[249.16px] md:hidden" />
      {/* Photo decoration, bottom-anchored to the photo */}
      <Shape variant="small-blue" className="-bottom-17.25 left-[calc(50%-243px)] h-41 w-40.75 md:hidden" />
      <Shape variant="big-teal" className="bottom-8.5 left-[calc(50%-43px)] h-94.75 w-94.5 md:hidden" />
      <Shape variant="looper" className="-bottom-12.75 left-[calc(50%-59px)] h-108.75 w-112.25 md:hidden" />

      {/* Desktop Shapes */}
      <Shape variant="big-blue" className="top-66 left-[calc(50%+579px)] hidden size-114.5 md:block" />
      <Shape variant="big-blue" className="top-[346.07px] left-[calc(50%-1167px)] hidden size-[555.32px] md:block" />
      <Shape variant="small-blue" className="top-26.25 left-[calc(50%+24px)] hidden size-73.75 md:block" />
      <Shape variant="big-teal" className="top-109.5 left-[calc(50%-1122px)] hidden size-171 md:block" />
      <Shape variant="small-blue" className="-top-32.5 left-[calc(50%+609px)] hidden size-49.75 md:block" />
    </ShapeLayer>
  )
}

export function CollaboraCompanyShapes() {
  return (
    <ShapeLayer className="-inset-x-4">
      {/* Mobile Shapes */}
      <Shape variant="small-blue" className="top-[276.16px] left-[calc(50%+101.32px)] size-[249.16px] md:hidden" />
      {/* Photo decoration, bottom-anchored to the photo */}
      <Shape variant="small-blue" className="bottom-[-25.11px] left-[calc(50%+81.03px)] size-[148.4px] md:hidden" />
      <Shape variant="big-teal" className="bottom-[43.71px] left-[calc(50%-424px)] size-[409.29px] md:hidden" />
      <Shape
        variant="looper"
        className="bottom-[-606.61px] left-[calc(50%-289.36px)] h-[606.31px] w-[601.37px] md:hidden"
      />

      {/* Desktop Shapes */}
      <Shape variant="big-blue" className="top-99.25 left-[calc(50%+747.24px)] hidden size-[668.96px] md:block" />
      <Shape variant="small-blue" className="top-52 left-[calc(50%-278px)] hidden size-62 md:block" />
      <Shape
        variant="looper"
        className="top-[414.54px] left-[calc(50%-897px)] hidden h-[1013.26px] w-[1004.99px] md:block"
      />
    </ShapeLayer>
  )
}

export function CollaboraContactShapes() {
  return (
    <ShapeLayer className="-inset-x-4">
      {/* Mobile Shapes */}
      <Shape variant="small-blue" className="top-[270.16px] left-[calc(50%-304.68px)] size-[249.16px] md:hidden" />
      <Shape variant="big-teal" className="top-33.25 left-[calc(50%-40px)] size-100.25 md:hidden" />

      {/* Desktop Shapes */}
      <Shape variant="big-blue" className="top-[275.64px] left-[calc(50%-202.82px)] hidden size-[362.96px] md:block" />
      <Shape variant="big-teal" className="-top-8.75 left-[calc(50%-1025px)] hidden h-122.5 w-122.25 md:block" />
      <Shape variant="big-teal" className="top-4.25 left-[calc(50%+439px)] hidden size-133.75 md:block" />
    </ShapeLayer>
  )
}
