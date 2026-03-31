import { type FunctionComponent, type SVGProps, useId } from "react"

export type GradientIconType = FunctionComponent<SVGProps<SVGSVGElement>>

type GradientIconProps = {
  icon: GradientIconType
  className: string
}

export function GradientIcon({ icon: Icon, className }: GradientIconProps) {
  const iconId = useId().replaceAll(":", "")
  const gradientId = `icon-gradient-${iconId}`
  const maskId = `icon-mask-${iconId}`

  return (
    <svg className={className} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="var(--color-blue-secondary)" />
          <stop offset="100%" stopColor="var(--color-blue-primary)" />
        </linearGradient>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
          <Icon className={className} stroke="white" fill="none" />
        </mask>
      </defs>
      <rect x="0" y="0" width="16" height="16" fill={`url(#${gradientId})`} mask={`url(#${maskId})`} />
    </svg>
  )
}
