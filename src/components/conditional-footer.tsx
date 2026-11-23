"use client"

import type { ReactNode } from "react"
import { hasFooter } from "@/utils/footer-routes"
import { useRoutePathname } from "@/utils/use-route-pathname"

/**
 * Hides the footer on full-screen routes. The footer itself is passed as `children` so it stays a server component
 * instead of being bundled under this client boundary.
 */
export function ConditionalFooter({ children }: { children: ReactNode }) {
  if (!hasFooter(useRoutePathname())) return null
  return children
}
