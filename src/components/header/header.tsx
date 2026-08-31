"use client"

import { usePathname } from "next/navigation"
import { DesktopLayout } from "./desktop-layout"
import { MobileLayout } from "./mobile-layout"

export type { HeaderMenuItem, HeaderSubmenuItem } from "./types"

const HIDDEN_ROUTES = ["/matricole/guida"]
const LOGO_ONLY_PREFIXES = ["/groups"]

export function Header() {
  const pathname = usePathname()

  if (HIDDEN_ROUTES.includes(pathname)) {
    return null
  }

  const logoOnly = LOGO_ONLY_PREFIXES.some((prefix) => pathname.startsWith(prefix))

  return (
    <>
      <div className="md:hidden">
        <MobileLayout logoOnly={logoOnly} />
      </div>
      <div className="max-md:hidden">
        <DesktopLayout logoOnly={logoOnly} />
      </div>
    </>
  )
}
