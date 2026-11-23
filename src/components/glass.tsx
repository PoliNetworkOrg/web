import { type GlassProps, GlassProvider, glassColors, glassPresets, Glass as LiquidGlass } from "@polinetwork/glass"
import type { ComponentProps, CSSProperties, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { useRoutePathname } from "@/utils/use-route-pathname"

/**
 * Layers of the floating glass. A 3D glass bends the capture of the page, which leaves out every 3D glass and what it
 * holds; on a higher layer it bends what is on the screen behind it, the 3D glass of the layers below included (a
 * popover over the header). Each one is above the ones it covers, as its z-index already is. The CSS glass is not on
 * any layer: it is part of the capture (see {@link Glass}).
 */
export const GLASS_LAYER = {
  /** Popovers inside the page, which scroll under the header */
  page: 1,
  /** The header and what is fixed to the screen */
  chrome: 2,
  /** Portalled popovers, which open over the header */
  overlay: 3,
} as const

/**
 * The package puts `position: relative` and `z-index: 1` inline, which beat the classes: unset them, so a `fixed` or
 * `absolute` given to the glass applies, and give the same defaults as classes, which a call site can override.
 * `isolate` stands in for the z-index: the glass is drawn on a child at `z-index: -1`, which needs a stacking context.
 */
const UNSET_POSITION: CSSProperties = { position: undefined, zIndex: undefined }
const BASE = "relative isolate"

/**
 * The `ref` is left out on purpose: the package's glass keeps its own on the element and a passed one would replace
 * it, so the glass would never measure itself. Put the ref on an element around or inside it (and don't give a glass
 * to a Radix `asChild`, which passes one).
 */
type DivProps = Omit<ComponentProps<"div">, "ref" | "color" | "children"> & { children?: ReactNode }

/**
 * The package marks every glass `glass-ignore`, which leaves it and all it holds out of the capture of the page. The
 * layers only see the glass the renderer draws, the 3D one, so a CSS glass was in neither: a card, its text included,
 * vanished under the header. Unset, the CSS glass is captured as it looks (its tint, edges and content; a backdrop
 * filter isn't drawn in the capture, so not its blur), and the 3D glass above it bends it as it bends the page.
 */
const CAPTURED = { "glass-ignore": undefined }

/**
 * Glass for what sits on the page's background (cards, accordions, fields, the footer): the CSS glass of
 * `@polinetwork/glass`, which blurs and tints what is behind it with the same rim, stroke and shadow as the 3D one.
 */
export function Glass({ className, style, children, ...props }: DivProps) {
  return (
    <LiquidGlass
      disable3D
      options={glassPresets.regular}
      color={glassColors.light}
      className={cn(BASE, "rounded-lg p-4", className)}
      style={{ ...UNSET_POSITION, ...style }}
      {...CAPTURED}
      {...props}
    >
      {children}
    </LiquidGlass>
  )
}

type FloatingGlassProps = DivProps &
  Pick<GlassProps, "interactive" | "claimTouch"> & {
    /** One of {@link GLASS_LAYER} */
    layer: number
    options?: GlassProps["options"]
  }

/**
 * Glass for what floats over the page (the fixed header, menus, popovers, toasts): the 3D glass, which bends the page
 * behind it at its edges. Where the device can't draw it, the package falls back to the CSS glass by itself. A glass
 * inside another glass, in the React tree, is always the CSS one.
 */
export function FloatingGlass({
  className,
  style,
  children,
  layer,
  options = glassPresets.regular,
  ...props
}: FloatingGlassProps) {
  return (
    <LiquidGlass
      layer={layer}
      options={options}
      color={glassColors.light}
      className={cn(BASE, className)}
      style={{ ...UNSET_POSITION, ...style }}
      {...props}
    >
      {children}
    </LiquidGlass>
  )
}

/** Captures the page for the 3D glass, again on every navigation: the page under the header is a new one */
export function GlassRoot({ children }: { children: ReactNode }) {
  const pathname = useRoutePathname()
  return <GlassProvider deps={[pathname]}>{children}</GlassProvider>
}
