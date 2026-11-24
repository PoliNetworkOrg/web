import { Dialog as DialogPrimitive } from "radix-ui"
import type * as React from "react"
import { FiArrowLeft, FiX } from "react-icons/fi"
import { Shape } from "@/components/shapes"
import { cn } from "@/lib/utils"

function Dialog(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger(props: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal(props: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose(props: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 animate-popover bg-black/40 backdrop-blur-sm [--enter-offset:0px] [--enter-scale:1] [--exit-offset:0px] [--exit-scale:1]",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <DialogOverlay />
        <DialogPrimitive.Content
          data-slot="dialog-content"
          className={cn(
            "-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] max-w-md animate-popover flex-col gap-5 overflow-y-auto overscroll-contain rounded-[1.25rem] bg-white p-6 shadow-lg focus-visible:ring-2 focus-visible:ring-blue-primary motion-safe:[--enter-offset:8px] motion-safe:[--exit-offset:4px]",
            className
          )}
          {...props}
        >
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[1.25rem]">
            <div className="-inset-x-16 -bottom-80 absolute top-0">
              <Shape variant="big-teal" className="-top-24 -right-16 absolute h-80 w-80" />
              <Shape variant="small-blue" className="-bottom-28 -left-16 absolute h-64 w-64" />
              <Shape variant="big-blue" className="-right-40 -bottom-56 absolute h-112 w-112" />
              <Shape variant="looper" className="-bottom-72 -left-52 absolute h-128 w-128" />
            </div>
          </div>
          <div className="relative z-10 flex flex-col gap-5">{children}</div>
        </DialogPrimitive.Content>
      </div>
    </DialogPortal>
  )
}

function DialogHeaderIconSlot({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={cn(
        "press-feedback size-6 shrink-0 rounded-full p-1 text-text-secondary outline-none hover:bg-white/60 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-blue-secondary",
        className
      )}
      {...props}
    />
  )
}

function DialogHeader({
  className,
  title,
  titleClassName,
  onBack,
  showClose = true,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  title: React.ReactNode
  titleClassName?: string
  onBack?: () => void
  showClose?: boolean
}) {
  return (
    <div data-slot="dialog-header" className={cn("flex flex-col gap-1.5", className)} {...props}>
      <div className="flex items-center gap-2">
        {onBack ? (
          <DialogHeaderIconSlot aria-label="Indietro" onClick={onBack}>
            <FiArrowLeft className="size-4" />
          </DialogHeaderIconSlot>
        ) : (
          <span className="size-6 shrink-0" aria-hidden="true" />
        )}
        <DialogTitle className={cn("min-w-0 flex-1 text-center", titleClassName)}>{title}</DialogTitle>
        {showClose ? (
          <DialogPrimitive.Close asChild>
            <DialogHeaderIconSlot aria-label="Chiudi">
              <FiX className="size-4" />
            </DialogHeaderIconSlot>
          </DialogPrimitive.Close>
        ) : (
          <span className="size-6 shrink-0" aria-hidden="true" />
        )}
      </div>
      {children}
    </div>
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  )
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("typo-headline-small text-text-primary", className)}
      {...props}
    />
  )
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("typo-body-small text-text-secondary", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
