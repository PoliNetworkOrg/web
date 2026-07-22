"use client"

import { useRouter } from "next/navigation"
import type { ReactNode } from "react"
import { FiArrowLeft, FiX } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { cn } from "@/lib/utils"

const STEPS = ["Facoltà", "Triennale/Magistrale", "Corso"] as const

const iconButton = "grid size-10 shrink-0 place-items-center rounded-full bg-white/60"

type WizardShellProps = {
  activeStep: number
  title: string
  caption?: string
  action?: ReactNode
  children: ReactNode
}

export function WizardShell({ activeStep, title, caption, action, children }: WizardShellProps) {
  const router = useRouter()

  return (
    <main className="flex min-h-svh flex-col items-center px-4 pt-32 pb-16">
      <Glass className="relative m-auto flex min-h-146 w-full max-w-7xl flex-col rounded-rectangles border-white/50 bg-background-blur p-6 md:h-157 md:w-7xl md:gap-15 md:p-12">
        <div className="flex shrink-0 items-center gap-4">
          <button type="button" onClick={() => router.back()} aria-label="Indietro" className={iconButton}>
            <FiArrowLeft className="size-5" />
          </button>

          <ol className="flex flex-1 items-center gap-4 md:gap-6">
            {STEPS.map((label, index) => (
              <li
                key={label}
                className={cn(
                  "typo-label-large flex-1 border-b-5 pb-2 text-center uppercase",
                  index <= activeStep ? "border-blue-primary text-blue-primary" : "border-white/40 text-text-secondary"
                )}
              >
                {label}
              </li>
            ))}
          </ol>

          <button type="button" onClick={() => router.push("/groups")} aria-label="Chiudi" className={iconButton}>
            <FiX className="size-5" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-10">
          <div className="flex shrink-0 flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-2.5">
              {caption && <p className="typo-body-medium text-text-secondary">{caption}</p>}
              <h1 className="typo-headline-large text-text-primary">{title}</h1>
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        </div>
      </Glass>
    </main>
  )
}
