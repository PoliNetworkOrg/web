"use client"

import { DesktopLayout } from "./DesktopLayout"
import { MobileLayout } from "./MobileLayout"

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
