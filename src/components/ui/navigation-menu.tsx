import { cva } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui"
import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Root wrapper for Radix NavigationMenu that applies shared styling, data attributes, and optionally renders a viewport.
 *
 * @param viewport - When `true` (default), renders the associated `NavigationMenuViewport` element; when `false`, omits the viewport.
 * @returns The rendered NavigationMenu root element with forwarded props.
 */
function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn("group/navigation-menu relative flex max-w-max flex-1 items-center justify-center", className)}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  )
}

/**
 * Wraps Radix's `NavigationMenuPrimitive.List`, adding layout classes and a `data-slot` attribute while forwarding all other props.
 *
 * @param className - Additional class names to merge with the component's base layout classes
 * @returns The rendered `NavigationMenuPrimitive.List` element with merged classes and `data-slot="navigation-menu-list"`
 */
function NavigationMenuList({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn("group flex flex-1 list-none items-center justify-center gap-1", className)}
      {...props}
    />
  )
}

/**
 * Renders a NavigationMenu item wrapper that applies positioning and a `data-slot` attribute.
 *
 * @returns The wrapped `NavigationMenuPrimitive.Item` element with `data-slot="navigation-menu-item"` and merged `className` including `"relative"`.
 */
function NavigationMenuItem({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" className={cn("relative", className)} {...props} />
  )
}

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-text-primary transition-[color,box-shadow] outline-none hover:bg-grey focus:bg-grey focus-visible:ring-[3px] focus-visible:ring-text-primary/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-grey/50 data-[state=open]:hover:bg-grey data-[state=open]:focus:bg-grey"
)

/**
 * Renders a styled navigation menu trigger with a chevron icon.
 *
 * Renders a NavigationMenuPrimitive.Trigger element with preset styling, a `data-slot="navigation-menu-trigger"` attribute, and a down-pointing chevron that rotates when the trigger is open.
 *
 * @returns The rendered trigger element for the navigation menu.
 */
function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}
      {""}
      <ChevronDownIcon
        className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

/**
 * Wraps Radix's `NavigationMenuPrimitive.Content`, applying layout, animation, and theme-related classes and forwarding all props.
 *
 * @param props - Props passed to the underlying `NavigationMenuPrimitive.Content`. The `className` prop, if provided, is merged with the component's internal classes.
 * @returns A `NavigationMenuPrimitive.Content` element with a `data-slot="navigation-menu-content"` attribute, merged classes, and forwarded props.
 */
function NavigationMenuContent({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out top-0 left-0 w-full p-2 pr-2.5 data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out md:absolute md:w-auto",
        "group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 **:data-[slot=navigation-menu-link]:focus:outline-none **:data-[slot=navigation-menu-link]:focus:ring-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:border-grey group-data-[viewport=false]/navigation-menu:bg-background group-data-[viewport=false]/navigation-menu:text-text-primary group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a centered, absolutely positioned container that hosts the NavigationMenu viewport.
 *
 * @returns A React element containing the Radix NavigationMenu viewport wrapped in an absolutely positioned, centered container.
 */
function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div className={cn("absolute top-full left-0 isolate z-50 flex justify-center")}>
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-top-center overflow-hidden rounded-md border border-grey bg-background text-text-primary shadow data-[state=closed]:animate-out data-[state=open]:animate-in md:w-[var(--radix-navigation-menu-viewport-width)]",
          className
        )}
        {...props}
      />
    </div>
  )
}

/**
 * Render a styled NavigationMenu link element with a consistent `data-slot` and utility classes.
 *
 * @returns A `NavigationMenuPrimitive.Link` element with base layout, typography, and state-aware styling; additional props are forwarded to the underlying element.
 */
function NavigationMenuLink({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "flex flex-col gap-1 rounded-sm p-2 text-sm text-text-primary outline-none transition-all hover:bg-grey focus:bg-grey focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-text-primary/50 data-[active=true]:bg-grey/50 data-[active=true]:focus:bg-grey data-[active=true]:hover:bg-grey [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-text-secondary",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the navigation menu indicator: an animated, diamond-shaped visual used to point to active menu content.
 *
 * @returns A NavigationMenuPrimitive.Indicator element containing the rotated square indicator.
 */
function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:animate-out data-[state=visible]:animate-in",
        className
      )}
      {...props}
    >
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-grey shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
}
