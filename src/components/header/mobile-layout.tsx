"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { cn } from "@/lib/utils"
import { useRoutePathname } from "@/utils/use-route-pathname"
import { getCurrentLocation, headerMenuItems, isActiveHref } from "./constants"
import styles from "./header.module.css"
import { Logo } from "./logo"

const rowClass = cn(styles.item, "typo-body-large flex min-h-11 items-center justify-between gap-2 rounded-lg px-3")

export const MobileLayout = ({ logoOnly = false }: { logoOnly?: boolean }) => {
  const pathname = useRoutePathname()
  const [openOn, setOpenOn] = useState<string | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)
  // Tied to the page it was opened on, so any navigation closes it: this component persists across pages
  const mobileMenuOpen = !logoOnly && openOn === pathname
  const close = () => setOpenOn(null)

  useEffect(() => {
    if (!mobileMenuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setOpenOn(null)
      toggleRef.current?.focus()
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) setOpenOn(null)
    }
    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown)
    }
  }, [mobileMenuOpen])

  return (
    <Glass
      ref={panelRef}
      className={cn(
        "fixed inset-x-6 top-(--nav-top) z-20 box-border rounded-[35px] border-white/75 bg-white/75 px-6 py-3",
        // The Figma frame is a full device screen, so its 56px offset includes the status bar, while the
        // browser viewport already starts below it. Keep a small gap that grows toward the desktop's 40px,
        // and fall back to the safe-area inset when the page is drawn under the status bar.
        "[--nav-top:max(1rem,env(safe-area-inset-top))] sm:[--nav-top:max(1.5rem,env(safe-area-inset-top))] md:[--nav-top:max(2rem,env(safe-area-inset-top))]",
        // Open, the panel covers the page: a stronger blur keeps the titles underneath from competing with the links
        mobileMenuOpen && "bg-white/90 backdrop-blur-xl"
      )}
      // Following any link, the current page and the logo included, closes the menu; so does tabbing out of it
      onClick={(event) => (event.target as HTMLElement).closest("a") && close()}
      onBlur={(event) => !event.currentTarget.contains(event.relatedTarget) && close()}
    >
      <div className={cn("flex w-full items-center", logoOnly ? "justify-center" : "justify-between")}>
        <Logo />
        {!logoOnly && (
          <button
            ref={toggleRef}
            type="button"
            onClick={() => {
              if (!mobileMenuOpen && navRef.current) navRef.current.scrollTop = 0
              setOpenOn(mobileMenuOpen ? null : pathname)
            }}
            className="press-feedback group -me-2 ml-auto grid size-11 place-items-center rounded-lg text-slate-700 outline-none hover:text-blue-secondary focus-visible:ring-2 focus-visible:ring-blue-secondary aria-expanded:text-blue-secondary"
            aria-label={mobileMenuOpen ? "Chiudi il menu" : "Apri il menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <FiMenu
              size={24}
              aria-hidden
              className="motion-safe:group-aria-expanded:-rotate-45 col-start-1 row-start-1 transition-opacity group-aria-expanded:opacity-0 motion-safe:transition-[opacity,rotate]"
            />
            <FiX
              size={24}
              aria-hidden
              className="col-start-1 row-start-1 opacity-0 transition-opacity group-aria-expanded:opacity-100 motion-safe:rotate-45 motion-safe:transition-[opacity,rotate] motion-safe:group-aria-expanded:rotate-0"
            />
          </button>
        )}
      </div>

      {!logoOnly && (
        <div className="mobile-menu-panel" data-state={mobileMenuOpen ? "open" : "closed"} inert={!mobileMenuOpen}>
          <nav
            ref={navRef}
            id="mobile-menu"
            aria-label="Menu principale"
            className="max-h-[calc(100dvh-var(--nav-top)*2-4.5rem)] min-h-0 divide-y divide-slate-200 overflow-y-auto overscroll-contain"
          >
            {headerMenuItems.map((item) => {
              if (!("menu" in item)) {
                return (
                  <div key={item.title} className="py-2">
                    <Link href={item.href} className={rowClass} aria-current={getCurrentLocation(pathname, item.href)}>
                      {item.title}
                    </Link>
                  </div>
                )
              }

              const current = item.menu.some((subItem) => isActiveHref(pathname, subItem.href))
              return (
                <div key={item.title} className="py-3">
                  <p
                    aria-current={current ? "location" : undefined}
                    className={cn(styles.section, "typo-title-small mb-1 px-3 text-slate-600")}
                  >
                    {item.title}
                  </p>
                  <ul>
                    {item.menu.map((subItem) => {
                      const Icon = subItem.icon
                      return (
                        <li key={subItem.title}>
                          <Link
                            href={subItem.href}
                            aria-current={getCurrentLocation(pathname, subItem.href)}
                            className={rowClass}
                          >
                            {subItem.title}
                            {Icon && <Icon className="size-4" aria-hidden />}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </nav>
        </div>
      )}
    </Glass>
  )
}
