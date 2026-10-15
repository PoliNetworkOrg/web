import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Horizontal frame shared by every Collabora section: 24px gutters on mobile (402px Figma frame), growing to the
 * 145px gutters of the 1728px desktop frame, then centered so the content column never exceeds 1438px.
 */
export const sectionContainerClass = "mx-auto w-full max-w-432 px-6 md:px-[clamp(1.5rem,8.391%,9.0625rem)]"

export function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        "typo-headline-medium md:typo-display-medium bg-linear-to-b from-text-accent-lightbg to-[#41496b] bg-clip-text text-center text-transparent md:mb-3 md:text-start",
        className
      )}
    >
      {children}
    </h2>
  )
}

/**
 * Section body copy: Red Hat 16px centered on mobile, Poppins 24px on desktop. Browsers add the letter-spacing after
 * the last glyph of a line too, so lines that exactly fill their Figma box would wrap: the box gets 1px of slack.
 */
export const sectionTextClass =
  "typo-body-large md:typo-headline-small -mx-[0.5px] text-center text-black md:mr-[-1px] md:ml-0 md:text-start"

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
