import type * as React from "react"
import type { IconType } from "react-icons"
import { cn } from "@/lib/utils"
import { CardHoverBackground } from "../card-icon/hover-background"
import { Glass } from "../glass"
import { GradientIcon } from "../gradient-icon"
import { Button } from "./button"

function Card({
  className,
  size = "default",
  hoverBackground = false,
  children,
  ...props
}: React.ComponentProps<typeof Glass> & { size?: "default" | "sm"; hoverBackground?: boolean }) {
  return (
    <Glass
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card relative flex h-66 w-78 flex-col gap-4 overflow-hidden rounded-[1.25rem] bg-background-blur text-card-foreground text-sm ring-foreground/10 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      )}
      {...props}
    >
      {hoverBackground && <CardHoverBackground />}
      {children}
    </Glass>
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

function CardTitle({ gradient = true, className, ...props }: React.ComponentProps<"h3"> & { gradient?: boolean }) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        `${gradient ? "bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent" : ""} font-medium leading-snug group-data-[size=sm]/card:text-base`,
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-description" className={cn("text-muted-foreground", className)} {...props} />
}

function CardAction({
  className,
  icon: Icon,
  iconSize = "normal",
  gradient = true,
  ...props
}: React.ComponentProps<"div"> & { icon: IconType; iconSize?: "small" | "normal" | "large"; gradient?: boolean }) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-auto justify-self-end", className)}
      {...props}
    >

      <GradientIcon icon={Icon} className={cn(iconSize === "small" ? "h-4.5 w-4.5" : iconSize === "normal" ? "h-8 w-8" : "h-14 w-14")} />
    </div>
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("group-data-[size=sm]/card:px-3", className)} {...props} />
}

function CardBottomButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  return <Button data-slot="card-footer" className={cn("self-end", className)} {...props} />
}

export { Card, CardHeader, CardBottomButton, CardTitle, CardAction, CardDescription, CardContent }
