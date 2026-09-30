"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { useEffect, useRef, useState } from "react"
import { GenericCard } from "@/components/ui/generic-card"
import { cn } from "@/lib/utils"
import { getCategory, PHASE_TRANSITIONS, PUNCHLINES, TRIGGER_COUNT } from "./constants"
import type { EasterEggPhase, NavCategory } from "./types"

export function NavigationEasterEgg({ children, className }: { children: ReactNode; className?: string }) {
  const pathname = usePathname()
  const lastCategoryRef = useRef<NavCategory | null>(null)
  const toggleCountRef = useRef(0)
  const [phase, setPhase] = useState<EasterEggPhase>("idle")
  const [punchline, setPunchline] = useState(PUNCHLINES[0])

  useEffect(() => {
    const category = getCategory(pathname)
    const lastCategory = lastCategoryRef.current

    if (category === "other") {
      toggleCountRef.current = 0
      lastCategoryRef.current = null
      return
    }

    if (lastCategory && lastCategory !== category) {
      toggleCountRef.current += 1
      if (toggleCountRef.current >= TRIGGER_COUNT) {
        toggleCountRef.current = 0
        setPunchline(PUNCHLINES[Math.floor(Math.random() * PUNCHLINES.length)])
        setPhase("glitch")
      }
    }

    lastCategoryRef.current = category
  }, [pathname])

  useEffect(() => {
    const next = PHASE_TRANSITIONS[phase]
    if (!next) return
    const timeout = setTimeout(() => setPhase(next.to), next.delay)
    return () => clearTimeout(timeout)
  }, [phase])

  return (
    <>
      <div className={cn(className, phase === "glitch" && "animate-easter-egg-shake")}>{children}</div>

      {phase === "glitch" && (
        <div role="presentation" aria-hidden="true" className="pointer-events-none fixed inset-0 z-9999">
          <div className="absolute inset-0 animate-easter-egg-flicker bg-black mix-blend-difference" />
          <div className="absolute inset-0 animate-easter-egg-glitch bg-blue-600/40 mix-blend-screen" />
          <div className="absolute inset-0 animate-easter-egg-glitch bg-sky-300/40 mix-blend-screen [animation-direction:reverse]" />
        </div>
      )}

      {phase === "card" && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <GenericCard className="flex animate-easter-egg-card-pop flex-col items-center gap-6 px-10 py-12">
            <Image src="/polinetwork_meta.png" alt="PoliNetwork" width={120} height={120} priority />
            <p className="typo-title-large sm:typo-headline-small max-w-sm whitespace-pre-line bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-center font-medium text-transparent">
              {punchline}
            </p>
          </GenericCard>
        </div>
      )}
    </>
  )
}
