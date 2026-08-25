"use client"

import { usePathname } from "next/navigation"
import { DesktopLayout } from "./desktop-layout"
import { MobileLayout } from "./mobile-layout"

export type { HeaderMenuItem, HeaderSubmenuItem } from "./types"

const HIDDEN_ROUTES = ["/matricole/guida"]

export function Header() {
  const pathname = usePathname()

  if (HIDDEN_ROUTES.includes(pathname)) {
    return null
  }

  return (
    <>
      <div className="md:hidden">
        <MobileLayout />
      </div>
      <div className="max-md:hidden">
        <DesktopLayout />
      </div>
    </>
  )
}
