"use client"

import { useRouter } from "next/navigation"
import type { ReactNode } from "react"
import { FiArrowLeft, FiX } from "react-icons/fi"
import { ButtonIcon } from "@/components/button-icon"
import { Glass } from "@/components/glass"
import { cn } from "@/lib/utils"

const STEPS = ["Facoltà", "Triennale/​Magistrale", "Corso"] as const

type WizardShellProps = {
  activeStep: number
  title: string
  caption?: string
  captionPosition?: "above" | "below"
  backHref?: string
  action?: ReactNode
  children: ReactNode
}

export function WizardShell({
  activeStep,
  title,
  caption,
  captionPosition = "below",
  backHref,
  action,
  children,
}: WizardShellProps) {
  const router = useRouter()

  return (
    <main className="flex min-h-svh w-full min-w-0 flex-col items-center px-6 py-50 md:py-52">
      <Glass className="relative m-auto flex min-h-146 w-full max-w-7xl flex-col gap-10 border-0 bg-transparent p-4 backdrop-blur-none md:h-157 md:gap-15 md:rounded-rectangles md:border md:border-white/50 md:bg-background-blur md:px-25 md:py-12.5 md:backdrop-blur-md">
        <div className="flex shrink-0 items-end gap-4 md:gap-6">
          <ButtonIcon
            variant="glass"
            icon={FiArrowLeft}
            iconClassName="size-5"
            className="md:rounded-full md:bg-white/60 md:backdrop-blur-none"
            aria-label="Indietro"
            onClick={() => (backHref ? router.replace(backHref) : router.back())}
          />

          <ol className="flex min-w-0 flex-1 items-end justify-between gap-1 md:gap-4">
            {STEPS.map((label, index) => (
              <li
                key={label}
                className={cn(
                  "md:typo-label-large typo-label-tiny border-b-5 pb-2 text-center uppercase md:flex-1",
                  index === 1 ? "min-w-0 flex-1" : "shrink-0 whitespace-nowrap md:whitespace-normal",
                  index <= activeStep ? "border-blue-primary text-blue-primary" : "border-white/40 text-text-secondary"
                )}
              >
                {label}
              </li>
            ))}
          </ol>

          <ButtonIcon
            variant="glass"
            icon={FiX}
            iconClassName="size-5"
            className="md:rounded-full md:bg-white/60 md:backdrop-blur-none"
            aria-label="Chiudi"
            onClick={() => router.push("/groups")}
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-6 md:gap-10">
          <div className="flex shrink-0 flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col items-center gap-2.5 text-center md:items-start md:text-left">
              {captionPosition === "above" && caption && (
                <p className="typo-body-medium md:typo-body-large text-text-secondary">{caption}</p>
              )}
              <h1
                className={cn(
                  "typo-title-large md:typo-display-small text-text-primary",
                  captionPosition === "below" && "order-1 md:order-2"
                )}
              >
                {title}
              </h1>
              {captionPosition === "below" && caption && (
                <p className="typo-body-medium md:typo-body-large order-2 text-text-secondary md:order-1">{caption}</p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        </div>
      </Glass>
    </main>
  )
}
