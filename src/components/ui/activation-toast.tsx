import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { FiInfo } from "react-icons/fi"
import { FloatingGlass, GLASS_LAYER } from "@/components/glass"

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
          <FloatingGlass
            key={announcement}
            layer={GLASS_LAYER.chrome}
            className="pointer-events-none fixed right-4 bottom-4 z-100 max-w-[calc(100vw-2rem)] animate-content-enter rounded-2xl sm:right-6 sm:bottom-6"
          >
            <output
              aria-live="polite"
              aria-atomic="true"
              className="typo-body-medium flex items-center gap-3 px-5 py-4 text-text-primary"
            >
              <FiInfo aria-hidden className="size-5 shrink-0 text-blue-secondary" />
              In attivazione
            </output>
          </FloatingGlass>,
          document.body
        )
      : null,
  }
}
