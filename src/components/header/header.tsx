"use client"

import { DesktopLayout } from "./desktop-layout"
import { MobileLayout } from "./mobile-layout"

export type { HeaderMenuItem, HeaderSubmenuItem } from "./types"

export function Header() {
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
