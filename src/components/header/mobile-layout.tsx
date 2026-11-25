import { useEffect, useRef, useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { Link } from "@/components/link"
import { cn } from "@/lib/utils"
import { useRoutePathname } from "@/utils/use-route-pathname"
import { headerMenuItems, isActiveHref } from "./constants"
import { Logo } from "./logo"

export const MobileLayout = ({ logoOnly = false }: { logoOnly?: boolean }) => {
  const pathname = useRoutePathname()
  const [mobileMenuOpen, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const close = () => setOpen(false)

  useEffect(() => {
    if (!mobileMenuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setOpen(false)
      toggleRef.current?.focus()
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) setOpen(false)
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
        "bg-background/95 backdrop-blur-none"
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
            onClick={() => setOpen(!mobileMenuOpen)}
            className="press-feedback group -m-2 hover:glass-glow ml-auto grid size-11 place-items-center rounded-full text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-blue-secondary"
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
        <div id="mobile-menu" hidden={!mobileMenuOpen}>
          {mobileMenuOpen && (
            <nav
              aria-label="Menu principale"
              className="max-h-[calc(100dvh-var(--nav-top)*2-5rem)] min-h-0 overflow-y-auto overscroll-contain"
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
                                "typo-body-large hover:glass-glow focus-visible:glass-glow flex min-h-10 items-center justify-between gap-2 rounded-md text-text-primary decoration-1 decoration-blue-secondary underline-offset-4 outline-none transition-colors hover:underline focus-visible:ring-2 focus-visible:ring-blue-secondary focus-visible:ring-inset",
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
        </div>
      )}
    </Glass>
  )
}
