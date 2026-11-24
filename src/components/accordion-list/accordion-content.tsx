"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { motion, useReducedMotion } from "motion/react"
import type * as React from "react"
import { cn } from "@/lib/utils"

const EASE = [0.25, 0.1, 0.25, 1] as const

export function AccordionContent({
  className,
  children,
  open,
  ...props
}: Omit<React.ComponentProps<typeof AccordionPrimitive.Content>, "asChild" | "forceMount"> & { open: boolean }) {
  const reduceMotion = useReducedMotion()

  return (
    // Always mounted, so motion can animate the height down to 0 before the answer disappears; `inert` keeps the
    // closed answer out of the tab order and the accessibility tree
    <AccordionPrimitive.Content data-slot="accordion-content" forceMount asChild {...props}>
      <motion.div
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          open: { height: "auto", transition: { duration: reduceMotion ? 0 : 0.32, ease: EASE } },
          closed: { height: 0, transition: { duration: reduceMotion ? 0 : 0.24, ease: EASE } },
        }}
        inert={!open}
        className="relative overflow-hidden"
      >
        {/* Answers stop at a readable line length (~70 characters) however wide the list is */}
        <motion.div
          variants={{
            open: { opacity: 1, y: 0, transition: { duration: 0.18, ease: EASE } },
            closed: { opacity: 0, y: -4, transition: { duration: 0.12, ease: EASE } },
          }}
          className={cn(
            "typo-body-large motion-reduce:transform-none! max-w-[70ch] text-pretty px-6 pt-0 pb-6",
            className
          )}
        >
          {children}
        </motion.div>
      </motion.div>
    </AccordionPrimitive.Content>
  )
}
