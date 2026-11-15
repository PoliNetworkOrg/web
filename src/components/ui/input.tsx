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
        // The input itself carries the vertical padding, so the whole field is clickable (and a 44px+ tap target)
        icon ? "px-6" : "px-4",
        // The input drops its own outline: the field shows the focus instead
        "focus-within:ring-2 focus-within:ring-blue-secondary",
        "rounded-buttonsM",
        "bg-background-blur",
        containerClassName
      )}
    >
      {icon && <span className="flex h-6 w-6 shrink-0 items-center justify-center text-text-primary"> {icon} </span>}

      <input
        type={inputProps.type}
        placeholder={inputProps.placeholder ?? undefined}
        data-slot="input"
        {...inputProps}
        className={cn(
          "w-full border-none bg-transparent outline-none",
          icon ? "py-3" : "py-2",
          "typo-body-medium text-text-primary placeholder:text-text-secondary",
          className
        )}
      />
    </Glass>
  )
}

export { Input }
