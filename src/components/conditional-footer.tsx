"use client"

import { usePathname } from "next/navigation"
import { Footer } from "@/components/footer"

const HIDDEN_ON = ["/matricole/guida"]

export function ConditionalFooter() {
  const pathname = usePathname()
  if (HIDDEN_ON.includes(pathname)) return null
  return <Footer />
}
