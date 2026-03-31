import * as React from "react"
import type { IconType } from "react-icons"
import { cn } from "@/lib/utils"
import { Glass } from "../glass"
import { Button } from "./button"

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof Glass> & { size?: "default" | "sm" }) {
  return (
    <Glass
      data-slot="card"
      data-size={size}
      className={cn(
        "w-78 h-66 ring-foreground/10 bg-card text-card-foreground gap-4 overflow-hidden rounded-[1.25rem] text-sm has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card flex flex-col",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "gap-1 rounded-t-xl group-data-[size=sm]/card:px-3 [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3 group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-[1.5rem] leading-snug font-medium group-data-[size=sm]/card:text-base bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-description" className={cn("text-muted-foreground text-sm", className)} {...props} />
}

function CardAction({
  className,
  icon: Icon,
  iconSize = "normal",
  ...props
}: React.ComponentProps<"div"> & { icon: IconType; iconSize: "small" | "normal" | "large" }) {
  const gradientId = React.useId()

  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-auto justify-self-end ", className)}
      {...props}
    >
      <svg width="0" height="0" className="absolute">
        <title>Icon gradient helper</title>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" className="text-blue-secondary" stopColor="currentColor" />
          <stop offset="100%" className="text-blue-primary" stopColor="currentColor" />
        </linearGradient>
      </svg>

      <Icon
        size={iconSize === "small" ? "1.125rem" : iconSize === "normal" ? "2rem" : "3.5rem"}
        fill={`url(#${gradientId})`}
        stroke={`url(#${gradientId})`}
      />
    </div>
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("text-[.875rem] group-data-[size=sm]/card:px-3", className)}
      {...props}
    />
  )
}

function CardBottomButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  return <Button data-slot="card-footer" className={cn("self-end", className)} {...props} />
}

export { Card, CardHeader, CardBottomButton, CardTitle, CardAction, CardDescription, CardContent }
