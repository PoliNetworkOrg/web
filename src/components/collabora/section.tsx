import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Highlight({ children }: { children: ReactNode }) {
  return <span className="text-blue-secondary">{children}</span>
}

/** The small parenthetical asides that follow a paragraph (Figma: body/small with 21px leading, body/large with 28px). */
export function Aside({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("font-red-hat text-xs/[21px] tracking-[0.4px] md:text-base/7 md:tracking-[0.5px]", className)}>
      {children}
    </span>
  )
}
