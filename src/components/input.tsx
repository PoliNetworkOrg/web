import type * as React from "react"
import { cn } from "@/lib/utils"
import { Glass } from "./glass"

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode
  containerClassName?: string
}

export function Input({ icon, className, containerClassName, ...inputProps }: InputProps) {
  return (
    <Glass
      className={cn(
        "inline-flex w-full items-center gap-2.5",
        "border border-white/50",
        "px-6 py-3 rounded-full", //"rounded-buttonsM", is not working
        "bg-background-blur backdrop-blur-xl",
        containerClassName
      )}
    >
      {icon && (
        <span className="flex h-6 w-6 items-center justify-center shrink-0 text-text-primary">
          {icon}
        </span>
      )}

      <input
        {...inputProps}
        placeholder={inputProps.placeholder ?? undefined}
        className={cn(
          "w-full bg-transparent border-none outline-none",
          "typo-body-small text-text-primary placeholder:text-text-secondary",
          className
        )}
      />
    </Glass>
  )
}