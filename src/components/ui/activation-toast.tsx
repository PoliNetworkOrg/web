"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { FiInfo } from "react-icons/fi"

/** One short notice at a time; another click restarts its three-second timeout. */
export function useActivationToast() {
  const [announcement, setAnnouncement] = useState(0)

  useEffect(() => {
    if (!announcement) return
    const timeout = window.setTimeout(() => setAnnouncement(0), 3000)
    return () => window.clearTimeout(timeout)
  }, [announcement])

  return {
    showActivationToast: () => setAnnouncement((current) => current + 1),
    activationToast: announcement
      ? createPortal(
          <output
            key={announcement}
            aria-live="polite"
            aria-atomic="true"
            className="typo-body-medium pointer-events-none fixed right-4 bottom-4 z-100 flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-2xl border border-white/70 bg-background/95 px-5 py-4 text-text-primary shadow-lg backdrop-blur-md sm:right-6 sm:bottom-6"
          >
            <FiInfo aria-hidden className="size-5 shrink-0 text-blue-secondary" />
            In attivazione
          </output>,
          document.body
        )
      : null,
  }
}
