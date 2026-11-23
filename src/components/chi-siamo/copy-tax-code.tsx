import { useEffect, useState } from "react"
import { FiCheck, FiCopy } from "react-icons/fi"
import { cn } from "@/lib/utils"

/** The tax code as a button that copies it, so nobody has to retype eleven digits into their tax return. */
export function CopyTaxCode({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setFailed(false)
    } catch {
      setCopied(false)
      setFailed(true)
    }
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={copy}
        className={cn(
          "group hover:glass-glow flex w-full flex-col items-start gap-4 rounded-buttonsM border border-edge/70 bg-surface/60 px-6 py-4 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-secondary sm:flex-row sm:items-center sm:justify-between sm:px-8",
          className
        )}
      >
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="typo-label-medium text-text-muted">Codice fiscale</span>
          <span className="typo-headline-small sm:typo-headline-medium select-all text-blue-secondary tabular-nums tracking-wider">
            {value}
          </span>
        </span>
        <span className="typo-label-large flex shrink-0 items-center gap-1.5 text-text-muted group-hover:text-text-primary">
          {copied ? (
            <FiCheck aria-hidden className="size-5 text-blue-secondary" />
          ) : (
            <FiCopy aria-hidden className="size-5" />
          )}
          <span aria-live="polite">{copied ? "Copiato" : "Copia"}</span>
        </span>
      </button>
      <output className={cn("typo-body-small block text-text-muted", failed && "mt-2")}>
        {failed ? "Copia non riuscita. Seleziona il codice fiscale e copialo manualmente." : ""}
      </output>
    </div>
  )
}
