"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { cn } from "@/lib/utils"
import { headerMenuItems, isActiveHref } from "./constants"
import { Logo } from "./logo"

export const MobileLayout = ({ logoOnly = false }: { logoOnly?: boolean }) => {
  const pathname = usePathname()
  const [openOn, setOpenOn] = useState<string | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
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
        "fixed inset-x-6 top-(--nav-top) z-20 box-border rounded-[36px] px-6 py-5",
        // The Figma frame is a full device screen, so its 56px offset includes the status bar, while the
        // browser viewport already starts below it. Keep a small gap that grows toward the desktop's 40px,
        // and fall back to the safe-area inset when the page is drawn under the status bar.
        "[--nav-top:max(1rem,env(safe-area-inset-top))] sm:[--nav-top:max(1.5rem,env(safe-area-inset-top))] md:[--nav-top:max(2rem,env(safe-area-inset-top))]",
        // Open, the panel covers the page: a stronger blur keeps the titles underneath from competing with the links
        mobileMenuOpen && "backdrop-blur-xl"
      )}
      // Following any link, the current page and the logo included, closes the menu; so does tabbing out of it
      onClick={(event) => (event.target as HTMLElement).closest("a") && close()}
      onBlur={(event) => !event.currentTarget.contains(event.relatedTarget) && close()}
    >
      <div className={cn("flex w-full items-center", logoOnly ? "justify-center" : "justify-between")}>
        <Logo href={logoOnly ? "https://polinetwork.org" : "/"} />
        {!logoOnly && (
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpenOn(mobileMenuOpen ? null : pathname)}
            className="-m-2 ml-auto rounded-full p-2 outline-none focus-visible:ring-2 focus-visible:ring-blue-secondary"
            aria-label={mobileMenuOpen ? "Chiudi il menu" : "Apri il menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <FiX size={24} className="text-text-primary" />
            ) : (
              <FiMenu size={24} className="text-text-primary" />
            )}
          </button>
        )}
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Menu principale"
          className="max-h-[calc(100dvh-var(--nav-top)*2-4.5rem)] overflow-y-auto overscroll-contain pb-1"
        >
          {headerMenuItems.map((item) => (
            <div key={item.title} className="mt-5">
              <p className="typo-title-medium text-text-secondary">{item.title}</p>
              {"menu" in item && item.menu && (
                <ul className="mt-1 flex flex-col">
                  {item.menu.map((subItem) => {
                    const active = isActiveHref(pathname, subItem.href)
                    const Icon = subItem.icon
                    return (
                      <li key={subItem.title}>
                        <Link
                          href={subItem.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "typo-body-large flex min-h-10 items-center justify-between gap-2 rounded-md text-text-primary decoration-1 decoration-blue-secondary underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-blue-secondary",
                            active && "underline"
                          )}
                        >
                          {subItem.title}
                          <Icon size={18} className="text-text-secondary" aria-hidden />
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          ))}
        </nav>
      )}
    </Glass>
  )
}
