"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { FORGOTTEN_MAN_PATH, getCategory } from "./constants"
import { revokeRoomTicket, rollForgottenMan } from "./storage"
import type { NavCategory } from "./types"

/** Ad ogni passaggio tra home e gruppi c'è una piccola probabilità di finire nella stanza del Forgotten Man. */
export function ForgottenManTrigger() {
  const pathname = usePathname()
  const router = useRouter()
  const lastCategoryRef = useRef<NavCategory | null>(null)

  useEffect(() => {
    if (pathname !== FORGOTTEN_MAN_PATH) revokeRoomTicket()

    const category = getCategory(pathname)
    const lastCategory = lastCategoryRef.current
    lastCategoryRef.current = category === "other" ? null : category

    if (category === "other" || !lastCategory || lastCategory === category) return
    if (rollForgottenMan()) router.push(FORGOTTEN_MAN_PATH)
  }, [pathname, router])

  return null
}
