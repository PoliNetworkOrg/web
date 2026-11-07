import type { ReactNode } from "react"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import { cn } from "@/lib/utils"

/** The centred call to action that closes a page: title, a short lead and one button. */
export function ClosingCta({ title, lead, action }: { title: ReactNode; lead: ReactNode; action: ReactNode }) {
  return (
    <section className={cn(CONTAINER, "flex flex-col items-center gap-8 py-10 text-center md:py-16")}>
      <h2 className={cn(SECTION_TITLE, "max-w-200 from-blue-secondary to-blue-primary")}>{title}</h2>
      <p className={cn(SECTION_LEAD, "max-w-200 text-balance")}>{lead}</p>
      {action}
    </section>
  )
}
