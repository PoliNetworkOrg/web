"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { cn } from "@/lib/utils"
import { headerMenuItems, isActiveHref } from "./constants"
import { Logo } from "./logo"

export const MobileLayout = ({ logoOnly = false }: { logoOnly?: boolean }) => {
  const pathname = usePathname()
  const [openOn, setOpenOn] = useState<string | null>(null)
  // The menu belongs to the page it was opened on: following a link (or reaching a logo-only route, where the toggle
  // is hidden) closes it, since this component instance persists across navigation
  const mobileMenuOpen = !logoOnly && openOn === pathname

  useEffect(() => {
    if (!mobileMenuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenOn(null)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [mobileMenuOpen])

  return (
    <Glass
      className={cn(
        "fixed inset-x-6 top-14 z-20 box-border rounded-[36px] px-6 py-5",
        // Open, the panel covers the page: a stronger blur keeps the titles underneath from competing with the links
        mobileMenuOpen && "backdrop-blur-xl"
      )}
    >
      <div className={cn("flex w-full items-center", logoOnly ? "justify-center" : "justify-between")}>
        <Logo href={logoOnly ? "https://polinetwork.org" : "/"} />
        {!logoOnly && (
          <button
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
        <nav id="mobile-menu" aria-label="Menu principale" className="max-h-[calc(100dvh-9rem)] overflow-y-auto pb-1">
          {headerMenuItems.map((item) => (
            <div key={item.title} className="mt-5">
              {/* Plain text: the style guide keeps colour gradients for display titles only */}
              <p className="typo-title-medium text-text-secondary">{item.title}</p>
              {"menu" in item && item.menu && (
                <ul className="mt-1 flex flex-col">
                  {item.menu.map((subItem) => {
                    const active = isActiveHref(pathname, subItem.href)
                    const Icon = subItem.icon
                    return (
                      <li key={subItem.title}>
                        {/* 40px rows: the old 20px links were hard to hit */}
                        <Link
                          href={subItem.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "typo-body-large flex min-h-10 items-center justify-between gap-2 rounded-md text-text-primary decoration-1 decoration-blue-secondary underline-offset-4 outline-none hover:underline focus-visible:underline",
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
