import type { ReactNode } from "react"
import { SECTION_TITLE } from "@/components/layout/page"
import { cn } from "@/lib/utils"

export function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn(SECTION_TITLE, "text-start", className)}>{children}</h2>
}

/**
 * Section body copy: Figma sets it in Poppins 24px at 1728px. Between the two frames that size turns paragraphs
 * into walls of text, so it steps 16 → 20 → 24px, and stays left-aligned like the other pages.
 */
export const sectionTextClass = "typo-body-large md:typo-headline-extrasmall 3xl:typo-headline-small text-text-primary"

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
