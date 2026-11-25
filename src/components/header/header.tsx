import { useRoutePathname } from "@/utils/use-route-pathname"
import { DesktopLayout } from "./desktop-layout"
import { MobileLayout } from "./mobile-layout"

export type { HeaderMenuItem, HeaderSubmenuItem } from "./types"

const HIDDEN_ROUTES = ["/matricole/guida"]

export function Header() {
  const pathname = useRoutePathname()

  if (HIDDEN_ROUTES.includes(pathname)) {
    return null
  }

  return (
    <header>
      <div className="lg:hidden">
        <MobileLayout key={pathname} />
      </div>
      <div className="max-lg:hidden">
        <DesktopLayout />
      </div>
    </header>
  )
}
