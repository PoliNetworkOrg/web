import type * as React from "react"
import { cn } from "@/lib/utils"
import { Glass } from "../glass"

type InputProps = React.ComponentProps<"input"> & {
  icon?: React.ReactNode
  containerClassName?: string
}

function Input({ icon, className, containerClassName, ...inputProps }: InputProps) {
  return (
    <Glass
      className={cn(
        "inline-flex w-full items-center gap-2.5",
        "border border-white/50",
        icon ? "px-6 py-3" : "px-4 py-2",
        "rounded-buttonsM",
        "bg-background-blur",
        containerClassName
      )}
    >
      {icon && <span className="flex h-6 w-6 items-center justify-center shrink-0 text-text-primary"> {icon} </span>}

      <input
        type={inputProps.type}
        placeholder={inputProps.placeholder ?? undefined}
        data-slot="input"
        {...inputProps}
        className={cn(
          "w-full bg-transparent border-none outline-none",
          "typo-body-medium text-text-primary placeholder:text-text-secondary",
          className
        )}
      />
    </Glass>
  )
}

export { Input }
