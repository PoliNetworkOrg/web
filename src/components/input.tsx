import * as React from "react"
import { Glass } from "./glass"
import { cn } from "@/lib/utils"

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode
  containerClassName?: string
}

export function Input({
  icon,
  className,
  containerClassName,
  ...inputProps
}: InputProps) {
  return (
    <Glass
      className={cn(
        "inline-flex w-full items-center gap-2.5",  // 10 px gap
        'border border-white/50',
        "px-6 py-3",  // padding 24 x - 12 y
        "rounded-full", // 60 px border radius
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
          "text-sm leading-5 font-normal",  // 14px / 20px / tracking 0.25
          "text-text-primary placeholder:text-text-secondary",
          className
        )}
      />
    </Glass>
  )
}