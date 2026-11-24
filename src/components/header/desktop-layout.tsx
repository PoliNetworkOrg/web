"use client"

import Link from "next/link"
import { NavigationMenu } from "radix-ui"
import { FiChevronDown } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { cn } from "@/lib/utils"
import { useRoutePathname } from "@/utils/use-route-pathname"
import { getCurrentLocation, headerMenuItems, isActiveHref } from "./constants"
import styles from "./header.module.css"
import { Logo } from "./logo"

const categoryClass = cn(
  styles.item,
  "typo-label-large flex h-11 w-max items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3"
)

export const DesktopLayout = ({ logoOnly = false }: { logoOnly?: boolean }) => {
  const pathname = useRoutePathname()

  return (
    <div className="fixed inset-x-6 top-10 z-20 mx-auto max-w-261.25">
      <Glass aria-hidden className="pointer-events-none absolute inset-0 rounded-[35px] border-white/75 bg-white/75" />

      {logoOnly ? (
        <div className="relative flex min-h-17.5 items-center justify-center">
          <Logo />
        </div>
      ) : (
        <NavigationMenu.Root
          aria-label="Menu principale"
          className="relative grid grid-cols-[auto_1fr] items-center gap-x-16 px-12 xl:px-16"
        >
          <div className="flex h-17.5 items-center">
            <Logo />
          </div>

          <NavigationMenu.List className="grid auto-cols-fr grid-flow-col justify-items-center gap-2">
            {headerMenuItems.map((item) => {
              if (!("menu" in item)) {
                return (
                  <NavigationMenu.Item key={item.title} value={item.title}>
                    <NavigationMenu.Link asChild>
                      <Link
                        href={item.href}
                        className={categoryClass}
                        aria-current={getCurrentLocation(pathname, item.href)}
                      >
                        {item.title}
                      </Link>
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                )
              }

              const current = item.menu.some((subItem) => isActiveHref(pathname, subItem.href))
              return (
                <NavigationMenu.Item key={item.title} value={item.title}>
                  <NavigationMenu.Trigger
                    aria-current={current ? "location" : undefined}
                    className={categoryClass}
                    onPointerMove={(event) => event.preventDefault()}
                    onPointerLeave={(event) => event.preventDefault()}
                  >
                    {item.title}
                    <FiChevronDown className="size-3.5 opacity-70" aria-hidden />
                  </NavigationMenu.Trigger>

                  <NavigationMenu.Content>
                    <ul className="flex flex-wrap items-center justify-center gap-x-4 py-2">
                      {item.menu.map((subItem) => {
                        const Icon = subItem.icon
                        return (
                          <li key={subItem.title}>
                            <NavigationMenu.Link asChild>
                              <Link
                                href={subItem.href}
                                aria-current={getCurrentLocation(pathname, subItem.href)}
                                className={cn(
                                  styles.item,
                                  "typo-body-medium flex min-h-11 items-center gap-2 rounded-lg px-3"
                                )}
                              >
                                {subItem.title}
                                {Icon && <Icon className="size-3.5" aria-hidden />}
                              </Link>
                            </NavigationMenu.Link>
                          </li>
                        )
                      })}
                    </ul>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              )
            })}
          </NavigationMenu.List>

          <NavigationMenu.Viewport className={cn(styles.viewport, "col-span-full border-slate-300/65 border-t")} />
        </NavigationMenu.Root>
      )}
    </div>
  )
}
