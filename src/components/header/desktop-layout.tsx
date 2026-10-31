"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
import { headerMenuItems, isActiveHref } from "./constants"
import { Logo } from "./logo"

export const DesktopLayout = ({ logoOnly = false }: { logoOnly?: boolean }) => {
  const pathname = usePathname()
  const removeDefaultHoverEffectClass = "hover:bg-transparent focus:bg-transparent bg-transparent!"
  const customHoverEffectClass = "hover:underline focus-visible:underline decoration-1 decoration-blue-secondary "
  // The current page, and the section that contains it, keep the hover underline
  const activeClass = "underline decoration-1 decoration-blue-secondary underline-offset-4"

  return (
    <div className="fixed inset-x-6 top-10 z-20 mx-auto box-border max-w-261.25 rounded-full">
      <Glass className="pointer-events-none absolute inset-0 rounded-full" />

      <NavigationMenu
        viewport={false}
        className="relative top-0 flex max-w-full shrink-0 items-stretch bg-transparent px-17.5 py-5 [&>div]:w-full"
      >
        <NavigationMenuList className={cn("flex w-full", logoOnly ? "justify-center" : "justify-between")}>
          {logoOnly ? (
            <Logo href="https://polinetwork.org" />
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
                        customHoverEffectClass,
                        item.menu.some((subItem) => isActiveHref(pathname, subItem.href)) && activeClass
                      )}
                      hideChevron
                      onPointerEnter={(e) => e.preventDefault()}
                      onPointerLeave={(e) => e.preventDefault()}
                      onPointerMove={(e) => e.preventDefault()}
                    >
                      <div className="flex flex-col gap-1">
                        <span className="typo-body-medium font-red-hat text-text-primary">{item.title}</span>
                      </div>
                      <FiChevronDown
                        size={16}
                        className="relative top-px ml-1 text-text-primary transition duration-300 group-data-[state=open]:rotate-180"
                      />
                    </NavigationMenuTrigger>

                    <NavigationMenuContent className="-translate-x-1/2 left-1/2 mt-8.5! border-none bg-transparent p-0 shadow-none! data-[state=closed]:bg-transparent data-[state=open]:bg-transparent">
                      {/* Stronger blur than the header pill: the panel opens over the page titles */}
                      <Glass className="w-fit text-nowrap p-3 backdrop-blur-xl">
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
                                    customHoverEffectClass,
                                    active && activeClass
                                  )}
                                >
                                  <Link href={subItem.href}>
                                    <span className="typo-body-medium font-red-hat text-text-primary">
                                      {subItem.title}
                                    </span>
                                    <Icon size={20} className="text-text-primary" aria-hidden />
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
                        customHoverEffectClass,
                        isActiveHref(pathname, item.href) && activeClass
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
