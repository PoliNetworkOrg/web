"use client"

import { usePathname } from "next/navigation"
import { Footer } from "@/components/footer"
import { matchesAnyRoutePrefix } from "@/utils/route-match"

const HIDDEN_EXACT = ["/matricole/guida"]
const HIDDEN_PREFIXES = ["/groups"]

export function ConditionalFooter() {
  const pathname = usePathname()
  const hidden = HIDDEN_EXACT.includes(pathname) || matchesAnyRoutePrefix(pathname, HIDDEN_PREFIXES)
  if (hidden) return null
  return <Footer />
}
