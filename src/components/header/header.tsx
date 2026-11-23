"use client"

import { matchesAnyRoutePrefix } from "@/utils/route-match"
import { useRoutePathname } from "@/utils/use-route-pathname"
import { DesktopLayout } from "./desktop-layout"
import { MobileLayout } from "./mobile-layout"

export type { HeaderMenuItem, HeaderSubmenuItem } from "./types"

const HIDDEN_ROUTES = ["/matricole/guida"]
const LOGO_ONLY_PREFIXES = ["/groups"]

export function Header() {
  const pathname = useRoutePathname()

  if (HIDDEN_ROUTES.includes(pathname)) {
    return null
  }

  const logoOnly = matchesAnyRoutePrefix(pathname, LOGO_ONLY_PREFIXES)

  return (
    <header>
      <div className="lg:hidden">
        <MobileLayout logoOnly={logoOnly} />
      </div>
      <div className="max-lg:hidden">
        <DesktopLayout logoOnly={logoOnly} />
      </div>
    </header>
  )
}
