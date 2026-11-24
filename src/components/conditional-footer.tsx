import type { ReactNode } from "react"
import { hasFooter } from "@/utils/footer-routes"
import { useRoutePathname } from "@/utils/use-route-pathname"

/** Hides the footer on full-screen routes. */
export function ConditionalFooter({ children }: { children: ReactNode }) {
  if (!hasFooter(useRoutePathname())) return null
  return children
}
