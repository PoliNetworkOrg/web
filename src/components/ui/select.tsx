import * as SelectPrimitive from "@radix-ui/react-select"
import type * as React from "react"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import { cn } from "@/lib/utils"
import { FloatingGlass, GLASS_LAYER, Glass } from "../glass"

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
        "press-feedback group relative isolate inline-flex items-center justify-center gap-1.5",
        paddingClass,
        "rounded-buttonsM",
        "outline-none focus-visible:ring-2 focus-visible:ring-blue-secondary",
        "typo-body-medium text-text-primary",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {/* The glass is a layer behind the label, not the trigger itself: Radix gives its trigger a ref, which would
          replace the glass's own */}
      <Glass className="-z-1 pointer-events-none absolute inset-0 rounded-[inherit] p-0">
        {/* A clear hover and open state, like the accordions and course rows: the bare glass gave no feedback. Over the
            glass's tint, under the label */}
        <span className="group-hover:glass-glow absolute inset-0 rounded-[inherit] transition-colors duration-200 group-data-[state=open]:bg-white/60" />
      </Glass>
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
          "relative z-50 flex max-h-(--radix-select-content-available-height) flex-col",
          "origin-(--radix-select-content-transform-origin)",
          "text-text-primary",
          className
        )}
        position={position}
        align={align}
        {...props}
      >
        {/* Opens over the page and the header: 3D glass, on the layer above the header's */}
        <FloatingGlass layer={GLASS_LAYER.overlay} className="flex min-h-0 flex-1 flex-col rounded-rectangles">
          {/* Clips the list to the corners, inside the glass: a clipped glass would lose its shadow */}
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[inherit]">
            <SelectScrollUpButton />
            <SelectPrimitive.Viewport
              className={cn(
                // il menu matcha la larghezza del trigger
                "p-1",
                position === "popper" &&
                  "h-(--radix-select-trigger-height) w-(--radix-select-trigger-width) scroll-my-1"
              )}
            >
              {children}
            </SelectPrimitive.Viewport>
            <SelectScrollDownButton />
          </div>
        </FloatingGlass>
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
