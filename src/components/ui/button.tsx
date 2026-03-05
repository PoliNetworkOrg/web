import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

//TODO: Varianti
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-slate-950 focus-visible:ring-slate-950/50 focus-visible:ring-[3px] aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500 dark:focus-visible:border-slate-300 dark:focus-visible:ring-slate-300/50 dark:aria-invalid:ring-red-900/20 dark:dark:aria-invalid:ring-red-900/40 dark:aria-invalid:border-red-900",
  {
    variants: {
      variant: {
        primary:
          "bg-button-primary hover:bg-button-primary/90 text-text-accent-lightbg typo-label-large rounded-buttonsM",
        tertiary:
          "bg-button-tertiary hover:bg-button-tertiary/90 text-text-accent-lightbg typo-label-large rounded-buttonsM",
        tertiaryBlur:
          "bg-blue-tertiary-blur hover:bg-blue-tertiary-blur/90 text-text-accent-lightbg typo-label-large rounded-buttonsM",
        outline:
          "border bg-white shadow-xs hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-200/30 dark:border-slate-200 dark:hover:bg-slate-200/50 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:dark:bg-slate-800/30 dark:dark:border-slate-800 dark:dark:hover:bg-slate-800/50",
        link: "text-slate-900 underline-offset-4 underline dark:text-slate-50",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
