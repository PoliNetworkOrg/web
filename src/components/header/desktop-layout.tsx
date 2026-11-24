"use client"

import Link from "next/link"
import { FiChevronDown } from "react-icons/fi"
import { Glass } from "@/components/glass"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { useRoutePathname } from "@/utils/use-route-pathname"
import { headerMenuItems, isActiveHref } from "./constants"
import { Logo } from "./logo"

export const DesktopLayout = ({ logoOnly = false }: { logoOnly?: boolean }) => {
  const pathname = useRoutePathname()
  const removeDefaultHoverEffectClass = "hover:bg-transparent focus:bg-transparent bg-transparent!"
  // A soft pill grows in behind the label on hover. It is drawn on ::before with a
  // negative inset, so it can bleed past the tight label without shifting the layout.
  const pillClass =
    "relative isolate rounded-full outline-none focus-visible:ring-0 before:absolute before:-inset-x-3.5 before:-inset-y-1.5 before:-z-10 before:rounded-full before:bg-white/70 before:opacity-0 before:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.8)] before:transition-[opacity,scale,background-color] before:duration-200 before:ease-(--ease-ui-out) motion-safe:before:scale-90 hover:before:opacity-100 hover:before:scale-100 data-[state=open]:before:opacity-100 data-[state=open]:before:scale-100 focus-visible:before:opacity-100 focus-visible:before:scale-100 focus-visible:before:ring-2 focus-visible:before:ring-blue-secondary"
  // The section that contains the current page keeps an azure pill
  const activePillClass =
    "text-blue-secondary! before:opacity-100 before:scale-100 before:bg-blue-tertiary/35 before:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-blue-tertiary)_70%,transparent)] hover:before:bg-blue-tertiary/50"
  // Submenu rows already have padding: a plain background is enough
  const rowClass =
    "rounded-2xl outline-none transition-colors duration-200 ease-(--ease-ui-out) hover:bg-white/70! focus-visible:bg-white/70! focus-visible:ring-2 focus-visible:ring-blue-secondary"
  const activeRowClass = "bg-blue-tertiary/35! text-blue-secondary! hover:bg-blue-tertiary/50!"

  return (
    <div className="fixed inset-x-6 top-10 z-20 mx-auto box-border max-w-261.25 rounded-full">
      <Glass className="pointer-events-none absolute inset-0 rounded-full" />

      <NavigationMenu
        viewport={false}
        className="relative top-0 flex max-w-full shrink-0 items-stretch bg-transparent px-17.5 py-5 [&>div]:w-full"
      >
        <NavigationMenuList className={cn("flex w-full", logoOnly ? "justify-center" : "justify-between")}>
          {logoOnly ? (
            <Logo />
          ) : (
            <NavigationMenuLink asChild className={cn("p-0 py-0.75", removeDefaultHoverEffectClass)}>
              <Logo />
            </NavigationMenuLink>
          )}

          {!logoOnly &&
            headerMenuItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                {"menu" in item ? (
                  <>
                    <NavigationMenuTrigger
                      className={cn(
                        "typo-body-medium group h-fit p-0 font-red-hat text-text-primary [&_.lucide-chevron-down]:hidden",
                        removeDefaultHoverEffectClass,
                        pillClass,
                        item.menu.some((subItem) => isActiveHref(pathname, subItem.href)) && activePillClass
                      )}
                      hideChevron
                      onPointerEnter={(e) => e.preventDefault()}
                      onPointerLeave={(e) => e.preventDefault()}
                      onPointerMove={(e) => e.preventDefault()}
                    >
                      <div className="flex flex-col gap-1">
                        <span className="typo-body-medium font-red-hat text-current">{item.title}</span>
                      </div>
                      <FiChevronDown
                        size={16}
                        className="relative top-px ml-1 text-current ease-(--ease-ui-out) group-data-[state=open]:rotate-180 motion-safe:transition-transform"
                      />
                    </NavigationMenuTrigger>

                    <NavigationMenuContent className="-translate-x-1/2 overflow-visible! group/menu left-1/2 mt-8.5! rounded-none! border-none bg-transparent p-0 shadow-none! data-[state=closed]:animate-menu-out! data-[state=open]:animate-menu-in! data-[state=closed]:bg-transparent data-[state=open]:bg-transparent">
                      {/* Stronger blur than the header pill: the panel opens over the page titles */}
                      {/* Same rounding as the site's other glass panels (tabs, accordions), not Glass's default */}
                      <Glass className="w-fit text-nowrap rounded-3xl border-white/50 p-3 backdrop-blur-xl group-data-[state=closed]/menu:animate-fade-out group-data-[state=open]/menu:animate-fade-in">
                        <ul className="flex flex-col gap-1">
                          {item.menu.map((subItem) => {
                            const Icon = subItem.icon
                            const active = isActiveHref(pathname, subItem.href)
                            return (
                              <li key={subItem.title}>
                                <NavigationMenuLink
                                  asChild
                                  active={active}
                                  className={cn(
                                    "flex shrink-0 flex-row flex-nowrap items-center justify-between gap-6 px-3 py-2",
                                    removeDefaultHoverEffectClass,
                                    rowClass,
                                    active && activeRowClass
                                  )}
                                >
                                  <Link href={subItem.href}>
                                    <span className="typo-body-medium font-red-hat text-current">{subItem.title}</span>
                                    <Icon size={20} className="text-current" aria-hidden />
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            )
                          })}
                        </ul>
                      </Glass>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild active={isActiveHref(pathname, item.href)}>
                    <Link
                      href={item.href}
                      className={cn(
                        "typo-body-medium font-red-hat text-text-primary",
                        removeDefaultHoverEffectClass,
                        pillClass,
                        isActiveHref(pathname, item.href) && activePillClass
                      )}
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
