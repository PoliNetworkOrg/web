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
import { headerMenuItems } from "./constants"
import { IconButtonsDesktop } from "./icon-buttons"
import { Logo } from "./logo"

export const DesktopLayout = () => {
  const removeDefaultHoverEffectClass = "hover:bg-transparent focus:bg-transparent bg-transparent!"
  const customHoverEffectClass = "hover:underline focus-visible:underline decoration-1 decoration-blue-secondary "

  return (
    <div className="fixed inset-x-6 top-10 z-20 mx-auto box-border max-w-261.25 rounded-full">
      <Glass className="pointer-events-none absolute inset-0 rounded-full" />

      <NavigationMenu
        viewport={false}
        className="relative top-0 flex max-w-full shrink-0 items-stretch bg-transparent px-17.5 py-5 [&>div]:w-full"
      >
        <NavigationMenuList className="flex w-full justify-between">
          <NavigationMenuLink asChild className={cn("p-0 py-0.75", removeDefaultHoverEffectClass)}>
            <Logo />
          </NavigationMenuLink>

          {headerMenuItems.map((item) => (
            <NavigationMenuItem key={item.title}>
              {"menu" in item && item.menu ? (
                <>
                  <NavigationMenuTrigger
                    className={cn(
                      "typo-body-medium group h-fit p-0 font-red-hat text-text-primary [&_.lucide-chevron-down]:hidden",
                      removeDefaultHoverEffectClass,
                      customHoverEffectClass
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
                    <ul className="w-fit text-nowrap">
                      <Glass>
                        {"menu" in item &&
                          item.menu.map((subItem) => {
                            const Icon = subItem.icon
                            return (
                              <li key={subItem.title}>
                                <NavigationMenuLink
                                  asChild
                                  className={cn(
                                    "flex shrink-0 flex-row flex-nowrap items-center justify-between",
                                    removeDefaultHoverEffectClass,
                                    customHoverEffectClass
                                  )}
                                >
                                  <Link href={subItem.href || "#"}>
                                    <div className="flex flex-col gap-1">
                                      <span className="typo-body-medium font-red-hat text-text-primary">
                                        {subItem.title}
                                      </span>
                                    </div>
                                    <Icon size={24} className="text-text-primary" />
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            )
                          })}
                      </Glass>
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink asChild>
                  <Link
                    href={"href" in item ? item.href || "#" : "#"}
                    className={cn(
                      "typo-body-medium font-red-hat text-text-primary",
                      removeDefaultHoverEffectClass,
                      customHoverEffectClass
                    )}
                  >
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}

          <NavigationMenuItem className="flex items-center gap-5">
            <IconButtonsDesktop removeHoverClass={removeDefaultHoverEffectClass} />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
