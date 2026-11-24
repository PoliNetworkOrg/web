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
import { getCurrentLocation, headerMenuItems, isActiveHref } from "./constants"
import styles from "./header.module.css"
import { Logo } from "./logo"

const categoryClass = cn(
  styles.category,
  "typo-body-medium flex h-11 items-center gap-1.5 whitespace-nowrap rounded-md px-4 py-0"
)

export const DesktopLayout = ({ logoOnly = false }: { logoOnly?: boolean }) => {
  const pathname = useRoutePathname()

  return (
    <div
      className={cn(
        "fixed inset-x-6 top-10 z-20 mx-auto flex max-w-261.25 items-center gap-8 px-8 py-3 xl:px-10",
        logoOnly ? "justify-center" : "justify-between"
      )}
    >
      <Glass
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-rectangles border-white/80 bg-white/70"
      />

      <div className="relative shrink-0">
        <Logo />
      </div>

      {!logoOnly && (
        <NavigationMenu
          viewport={false}
          aria-label="Menu principale"
          className="flex-none border-slate-300/60 border-s ps-5"
        >
          <NavigationMenuList className="gap-3 xl:gap-6">
            {headerMenuItems.map((item) => {
              if (!("menu" in item)) {
                return (
                  <NavigationMenuItem key={item.title} value={item.title}>
                    <NavigationMenuLink asChild className={categoryClass}>
                      <Link href={item.href} aria-current={getCurrentLocation(pathname, item.href)}>
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              }

              const current = item.menu.some((subItem) => isActiveHref(pathname, subItem.href))
              return (
                <NavigationMenuItem key={item.title} value={item.title}>
                  <NavigationMenuTrigger
                    aria-current={current ? "location" : undefined}
                    className={categoryClass}
                    hideChevron
                    onPointerEnter={(event) => event.preventDefault()}
                    onPointerLeave={(event) => event.preventDefault()}
                    onPointerMove={(event) => event.preventDefault()}
                  >
                    {item.title}
                    <FiChevronDown
                      className="size-3.5 group-data-[state=open]:rotate-180 motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-(--ease-ui-out)"
                      aria-hidden
                    />
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className={styles.dropdown}>
                    <Glass className="rounded-2xl border-white/90 bg-white/95 p-1.5 shadow-[0_12px_32px_-20px_rgb(15_23_42/0.32)] backdrop-blur-xl">
                      <ul>
                        {item.menu.map((subItem) => {
                          const Icon = subItem.icon
                          return (
                            <li key={subItem.title}>
                              <NavigationMenuLink
                                asChild
                                className={cn(
                                  styles.row,
                                  "typo-body-medium min-h-10 flex-row items-center justify-between gap-6 rounded-lg py-2 ps-4 pe-3"
                                )}
                              >
                                <Link href={subItem.href} aria-current={getCurrentLocation(pathname, subItem.href)}>
                                  {subItem.title}
                                  <Icon className="size-4" aria-hidden />
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          )
                        })}
                      </ul>
                    </Glass>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </div>
  )
}
