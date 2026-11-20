"use client"

import { useEffect, useState } from "react"
import { FiCheck, FiCopy } from "react-icons/fi"
import { cn } from "@/lib/utils"

/** The tax code as a button that copies it, so nobody has to retype eleven digits into their tax return. */
export function CopyTaxCode({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {
      // Clipboard unavailable (plain HTTP or denied): the code stays visible and selectable
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "group flex w-full items-center justify-between gap-4 rounded-buttonsM border border-white/70 bg-white/60 px-5 py-4 text-left outline-none transition-colors hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-blue-secondary",
        className
      )}
    >
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="typo-label-medium text-slate-600">Codice fiscale</span>
        <span className="typo-headline-small sm:typo-headline-medium select-all text-blue-secondary tabular-nums tracking-wider">
          {value}
        </span>
      </span>
      <span className="typo-label-large flex shrink-0 items-center gap-1.5 text-slate-600 group-hover:text-text-primary">
        {copied ? (
          <FiCheck aria-hidden className="size-5 text-blue-secondary" />
        ) : (
          <FiCopy aria-hidden className="size-5" />
        )}
        <span aria-live="polite">{copied ? "Copiato" : "Copia"}</span>
      </span>
    </button>
  )
}
