import type * as React from "react"
import { Glass } from "@/components/glass"
import { cn } from "@/lib/utils"

function Item({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Glass
      data-slot="item"
      className={cn("rounded-4xl border-white/50 bg-background-blur p-0 text-card-foreground", className)}
      {...props}
    />
  )
}

function ItemInner({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-inner"
      className={cn("flex items-center justify-between gap-4 py-4 pr-4 pl-8", className)}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-content" className={cn("flex min-w-0 flex-1 items-center", className)} {...props} />
}

function ItemTitle({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="item-title" className={cn("typo-title-medium text-blue-secondary", className)} {...props} />
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-actions" className={cn("flex shrink-0 items-center", className)} {...props} />
}

export { Item, ItemInner, ItemContent, ItemTitle, ItemActions }
