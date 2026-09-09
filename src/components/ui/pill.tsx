import { cn } from "@/lib/utils"

export type PillVariant = "primary" | "secondary" | "tertiary"

const variantClasses: Record<PillVariant, string> = {
  primary: "bg-blue-tertiary text-text-accent-lightbg",
  secondary: "bg-blue-secondary text-text-accent-darkbg",
  tertiary: "bg-blue-primary text-primary",
}

export function Pill({
  children,
  variant = "tertiary",
  className,
}: {
  children: React.ReactNode
  variant?: PillVariant
  className?: string
}) {
  return (
    <span
      className={cn(
        "typo-body-small inline-flex items-center rounded-buttonsM px-3 py-1",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
