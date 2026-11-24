import { cn } from "@/lib/utils"

/** Marks the term in office: always the last one of its list */
export function InOfficeBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "typo-label-medium inline-flex shrink-0 items-center rounded-full border border-blue-secondary/40 bg-white/70 px-3 py-1 text-blue-secondary",
        className
      )}
    >
      In carica
    </span>
  )
}
