import {
  Children,
  cloneElement,
  type FunctionComponent,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type SVGProps,
  useId,
} from "react"

export type GradientIconType = FunctionComponent<SVGProps<SVGSVGElement>>

type GradientIconProps = {
  title: string
  icon: GradientIconType
  className: string
}

function maskChildren(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) return child

    const element = child as ReactElement<SVGProps<SVGElement>>

    return cloneElement(element, {
      ...element.props,
      stroke: "white",
      fill: "none",
      children: maskChildren(element.props.children),
    })
  })
}

export function GradientIcon({ title, icon: Icon, className }: GradientIconProps) {
  const iconId = useId().replaceAll(":", "")
  const gradientId = `icon-gradient-${iconId}`
  const maskId = `icon-mask-${iconId}`
  const svg = Icon({ className, "aria-label": title }) as ReactElement<SVGProps<SVGSVGElement>>
  const children = svg.props.children

  return cloneElement(svg, {
    ...svg.props,
    stroke: undefined,
    fill: "none",
    children: (
      <>
        <defs>
          <linearGradient id={gradientId} x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-blue-secondary)" />
            <stop offset="100%" stopColor="var(--color-blue-primary)" />
          </linearGradient>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
            {maskChildren(children)}
          </mask>
        </defs>
        <rect x="0" y="0" width="24" height="24" fill={`url(#${gradientId})`} mask={`url(#${maskId})`} />
      </>
    ),
  })
}
