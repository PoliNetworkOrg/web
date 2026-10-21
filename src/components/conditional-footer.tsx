"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { matchesAnyRoutePrefix } from "@/utils/route-match"

const HIDDEN_EXACT = ["/matricole/guida"]
const HIDDEN_PREFIXES = ["/groups"]

/**
 * Hides the footer on full-screen routes. The footer itself is passed as `children` so it stays a server component
 * instead of being bundled under this client boundary.
 */
export function ConditionalFooter({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const hidden = HIDDEN_EXACT.includes(pathname) || matchesAnyRoutePrefix(pathname, HIDDEN_PREFIXES)
  if (hidden) return null
  return children
}
