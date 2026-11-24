import type * as React from "react"
import { cn } from "@/lib/utils"
import { Glass } from "../glass"

type InputProps = React.ComponentProps<"input"> & {
  icon?: React.ReactNode
  containerClassName?: string
}

function Input({ icon, className, containerClassName, ...inputProps }: InputProps) {
  return (
    // A label around the whole field: clicks on the icon and the padding focus the input too. `contents` keeps it out
    // of the layout, so the field sizes against its parent as before
    <label className="contents">
      <Glass
        className={cn(
          "inline-flex w-full items-center gap-2.5",
          "border border-edge/50",
          // The input itself carries the vertical padding (py-0 drops Glass's p-4): a 44px+ tap target
          icon ? "px-6 py-0" : "px-4 py-0",
          // The input drops its own outline: the field brightens instead, like the site's other glass on hover. A blue
          // ring showed on every click, since a text field is always :focus-visible
          "transition-colors duration-200 focus-within:border-edge focus-within:bg-surface/70",
          "rounded-buttonsM",
          "bg-background-blur",
          containerClassName
        )}
      >
        {icon && (
          <span aria-hidden className="flex h-6 w-6 shrink-0 items-center justify-center text-text-primary">
            {icon}
          </span>
        )}

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
    </label>
  )
}

export { Input }
