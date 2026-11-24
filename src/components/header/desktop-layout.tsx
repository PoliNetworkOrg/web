"use client"

import Link from "next/link"
import { useLayoutEffect, useRef, useState } from "react"
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
import { ACTIVE_FILL_CLASS, HOVER_FILL_CLASS, headerMenuItems, isActiveHref } from "./constants"
import { Logo } from "./logo"

/** How far the pills reach past the tight labels, in px: Tailwind's 3.5 and 1.5 below. */
const PILL_PAD_X = 14
const PILL_PAD_Y = 6

type PillRect = { x: number; y: number; width: number; height: number; instant: boolean }

/** Solid azure pill behind the label of the section that contains the current page. */
function ActivePill() {
  return <span aria-hidden className={cn("-inset-x-3.5 -inset-y-1.5 -z-10 absolute rounded-full", ACTIVE_FILL_CLASS)} />
}

export const DesktopLayout = ({ logoOnly = false }: { logoOnly?: boolean }) => {
  const pathname = useRoutePathname()
  const removeDefaultHoverEffectClass = "hover:bg-transparent focus:bg-transparent bg-transparent!"
  // isolate: the active pill sits at -z-10 behind the label but above the sliding hover pill
  const itemClass =
    "relative isolate rounded-full outline-none focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-sky-600 focus-visible:outline-offset-6"
  const activeItemClass = "text-white! [&_svg]:text-white!"

  // One hover pill for the whole bar, gliding to the hovered item, or to the one whose menu is open
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef(new Map<string, HTMLElement>())
  const [hovered, setHovered] = useState<string | null>(null)
  const [openMenu, setOpenMenu] = useState("")
  const [pill, setPill] = useState<PillRect | null>(null)
  const [pillVisible, setPillVisible] = useState(false)
  const pillVisibleRef = useRef(false)
  const target = hovered ?? (openMenu || null)

  useLayoutEffect(() => {
    const item = target ? itemRefs.current.get(target) : undefined
    const container = containerRef.current
    if (!item || !container) {
      pillVisibleRef.current = false
      setPillVisible(false)
      return
    }
    const a = item.getBoundingClientRect()
    const b = container.getBoundingClientRect()
    setPill({
      x: a.left - b.left - PILL_PAD_X,
      y: a.top - b.top - PILL_PAD_Y,
      width: a.width + PILL_PAD_X * 2,
      height: a.height + PILL_PAD_Y * 2,
      // Appearing: fade in where it is. Already shown: glide over from the previous item
      instant: !pillVisibleRef.current,
    })
    pillVisibleRef.current = true
    setPillVisible(true)
  }, [target])

  const registerItem = (key: string) => (el: HTMLElement | null) => {
    if (el) itemRefs.current.set(key, el)
    else itemRefs.current.delete(key)
  }

  return (
    <div ref={containerRef} className="fixed inset-x-6 top-10 z-20 mx-auto box-border max-w-261.25 rounded-full">
      <Glass className="pointer-events-none absolute inset-0 rounded-full" />

      {pill && (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-0 left-0 rounded-full opacity-0 transition-opacity duration-200 ease-(--ease-ui-out)",
            HOVER_FILL_CLASS,
            pillVisible && "opacity-100",
            !pill.instant && "motion-safe:transition-[opacity,translate,width,height] motion-safe:duration-300"
          )}
          style={{ translate: `${pill.x}px ${pill.y}px`, width: pill.width, height: pill.height }}
        />
      )}

      <NavigationMenu
        viewport={false}
        onValueChange={setOpenMenu}
        className="relative top-0 flex max-w-full shrink-0 items-stretch bg-transparent px-17.5 py-5 [&>div]:w-full"
      >
        <NavigationMenuList
          className={cn("flex w-full", logoOnly ? "justify-center" : "justify-between")}
          onPointerOver={(e) => {
            const item = (e.target as Element).closest<HTMLElement>("[data-nav-item]")
            setHovered(item?.dataset.navItem ?? null)
          }}
          onPointerLeave={() => setHovered(null)}
        >
          {logoOnly ? (
            <Logo />
          ) : (
            <NavigationMenuLink asChild className={cn("p-0 py-0.75", removeDefaultHoverEffectClass)}>
              <Logo />
            </NavigationMenuLink>
          )}

          {!logoOnly &&
            headerMenuItems.map((item) => {
              if (!("menu" in item)) {
                const active = isActiveHref(pathname, item.href)
                return (
                  <NavigationMenuItem key={item.title} value={item.title}>
                    <NavigationMenuLink asChild active={active}>
                      <Link
                        ref={registerItem(item.title)}
                        data-nav-item={item.title}
                        href={item.href}
                        className={cn(
                          "typo-body-medium font-red-hat text-text-primary",
                          removeDefaultHoverEffectClass,
                          itemClass,
                          active && activeItemClass
                        )}
                      >
                        {active && <ActivePill />}
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              }

              const active = item.menu.some((subItem) => isActiveHref(pathname, subItem.href))
              return (
                <NavigationMenuItem key={item.title} value={item.title}>
                  <NavigationMenuTrigger
                    ref={registerItem(item.title)}
                    data-nav-item={item.title}
                    className={cn(
                      "typo-body-medium group h-fit p-0 font-red-hat text-text-primary [&_.lucide-chevron-down]:hidden",
                      removeDefaultHoverEffectClass,
                      itemClass,
                      active && activeItemClass
                    )}
                    hideChevron
                    onPointerEnter={(e) => e.preventDefault()}
                    onPointerLeave={(e) => e.preventDefault()}
                    onPointerMove={(e) => e.preventDefault()}
                  >
                    {active && <ActivePill />}
                    <span className="typo-body-medium font-red-hat">{item.title}</span>
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
                          const current = isActiveHref(pathname, subItem.href)
                          return (
                            <li key={subItem.title}>
                              <NavigationMenuLink
                                asChild
                                active={current}
                                className={cn(
                                  "flex shrink-0 flex-row flex-nowrap items-center justify-between gap-6 rounded-2xl px-3 py-2 text-text-primary outline-none transition-[background-color,box-shadow] duration-200 ease-(--ease-ui-out) focus-visible:outline-2 focus-visible:outline-sky-600 focus-visible:outline-offset-2",
                                  removeDefaultHoverEffectClass,
                                  current
                                    ? cn(ACTIVE_FILL_CLASS, "text-white! [&_svg]:text-white!")
                                    : "hover:bg-sky-500/12! hover:shadow-[inset_0_0_0_1px_rgb(14_165_233/0.16)]"
                                )}
                              >
                                <Link href={subItem.href} aria-current={current ? "page" : undefined}>
                                  <span className="typo-body-medium font-red-hat">{subItem.title}</span>
                                  <Icon size={20} className="text-current" aria-hidden />
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
    </div>
  )
}
