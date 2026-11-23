import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

const buttonSizes = {
  default: "h-9 px-4 py-2 has-[>svg]:px-3",
  sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5 text-xs",
  lg: "h-10 px-6 has-[>svg]:px-4",
  "lg-wide": "h-10 px-10 has-[>svg]:px-7.5",
  icon: "size-9",
  "icon-sm": "size-8",
  "icon-lg": "size-10",
}

export type ButtonSizes = keyof typeof buttonSizes

//TODO: Varianti
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-text-primary focus-visible:ring-text-primary/50 focus-visible:ring-[3px] aria-invalid:ring-red/20 aria-invalid:border-red",
  {
    variants: {
      variant: {
        // Hover turns the button into the site's dark blue with light text: a clear change, not a muddy shade of the fill
        primary:
          "bg-button-primary hover:bg-blue-secondary hover:text-text-accent-darkbg text-text-accent-lightbg typo-label-large rounded-buttonsM",
        tertiary:
          "bg-button-tertiary hover:bg-button-primary text-text-accent-lightbg typo-label-large rounded-buttonsM",
        tertiaryBlur:
          "bg-blue-tertiary-blur hover:bg-blue-tertiary text-text-accent-lightbg typo-headline-small rounded-buttonsM",
        glass: "bg-background-blur hover:glass-glow backdrop-blur-md rounded-buttonsL",
        outline: "border bg-surface shadow-xs hover:bg-background hover:text-text-primary",
        link: "text-text-primary underline-offset-4 underline",
      },
      size: buttonSizes,
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
      className={cn(buttonVariants({ variant, size }), "press-feedback", className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
