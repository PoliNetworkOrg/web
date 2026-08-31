"use client"

import { usePathname } from "next/navigation"
import { Footer } from "@/components/footer"

const HIDDEN_EXACT = ["/matricole/guida"]
const HIDDEN_PREFIXES = ["/groups"]

export function ConditionalFooter() {
  const pathname = usePathname()
  const hidden = HIDDEN_EXACT.includes(pathname) || HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  if (hidden) return null
  return <Footer />
}
