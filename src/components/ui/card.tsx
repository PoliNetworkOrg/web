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
        "group/card flex h-66 w-78 flex-col gap-4 overflow-hidden rounded-[1.25rem] bg-background-blur text-card-foreground text-sm ring-foreground/10 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
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
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] group-data-[size=sm]/card:px-3 [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ gradient = true, className, ...props }: React.ComponentProps<"div"> & { gradient?: boolean }) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        `${gradient ? "bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent" : ""} font-medium text-[1.5rem] leading-snug group-data-[size=sm]/card:text-base`,
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
  gradient = true,
  ...props
}: React.ComponentProps<"div"> & { icon: IconType; iconSize?: "small" | "normal" | "large"; gradient?: boolean }) {
  const gradientId = React.useId()

  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-auto justify-self-end", className)}
      {...props}
    >
      {gradient && (
        <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
          <title>Icon gradient helper</title>
          <linearGradient id={gradientId} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" className="text-blue-secondary" stopColor="currentColor" />
            <stop offset="100%" className="text-blue-primary" stopColor="currentColor" />
          </linearGradient>
        </svg>
      )}

      <Icon
        size={iconSize === "small" ? "1.125rem" : iconSize === "normal" ? "2rem" : "3.5rem"}
        fill={gradient ? `url(#${gradientId})` : "currentColor"}
        stroke={gradient ? `url(#${gradientId})` : "currentColor"}
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
