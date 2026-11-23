import * as SelectPrimitive from "@radix-ui/react-select"
import type * as React from "react"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import { cn } from "@/lib/utils"

function Select(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup(props: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("typo-body-medium text-text-primary data-placeholder:text-text-secondary", className)}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  const paddingClass = size === "sm" ? "px-4 py-2" : "px-5 py-2.5"

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "press-feedback group inline-flex items-center justify-center gap-1.5 backdrop-blur-md",
        paddingClass,
        "rounded-buttonsM",
        "hover:glass-glow border border-edge/50 bg-background-blur hover:border-edge data-[state=open]:bg-surface/70",
        "outline-none focus-visible:ring-2 focus-visible:ring-blue-secondary",
        "typo-body-medium text-text-primary",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <FiChevronDown className="h-4 w-4 shrink-0 text-text-primary group-data-[state=open]:rotate-180 motion-safe:transition-transform" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  sideOffset = 16,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        sideOffset={sideOffset}
        className={cn(
          "animate-popover motion-safe:data-[side=top]:[--enter-offset:4px]",
          "relative z-50 max-h-(--radix-select-content-available-height)",
          "origin-(--radix-select-content-transform-origin) overflow-y-auto overflow-x-hidden",
          "rounded-rectangles border border-edge/40",
          "bg-background-blur shadow-lg backdrop-blur-xl",
          "text-text-primary",
          className
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            // il menu matcha la larghezza del trigger
            "p-1",
            position === "popper" && "h-(--radix-select-trigger-height) w-(--radix-select-trigger-width) scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-3 py-1", "typo-body-small text-text-secondary", className)}
      {...props}
    />
  )
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center gap-1.5",
        "rounded-buttonsM px-5 py-2.5",
        "typo-body-medium text-text-primary",
        "outline-none",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        "data-highlighted:bg-blue-tertiary/40 data-[state=checked]:font-semibold",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("-mx-1 pointer-events-none my-1 h-px bg-grey/40", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <FiChevronUp className="h-4 w-4 text-text-secondary" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <FiChevronDown className="h-4 w-4 text-text-secondary" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
