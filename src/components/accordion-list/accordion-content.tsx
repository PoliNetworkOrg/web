"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { motion } from "motion/react"
import type * as React from "react"
import { cn } from "@/lib/utils"

/** Ease-out: the answer unfolds quickly and settles, and folds back the same way */
const EASE_OUT = [0.22, 1, 0.36, 1] as const

export function AccordionContent({
  className,
  children,
  open,
  ...props
}: Omit<React.ComponentProps<typeof AccordionPrimitive.Content>, "asChild" | "forceMount"> & { open: boolean }) {
  return (
    // Always mounted, so motion can animate the height down to 0 before the answer disappears; `inert` keeps the
    // closed answer out of the tab order and the accessibility tree
    <AccordionPrimitive.Content data-slot="accordion-content" forceMount asChild {...props}>
      <motion.div
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          open: { height: "auto", opacity: 1, transition: { duration: 0.35, ease: EASE_OUT } },
          closed: { height: 0, opacity: 0, transition: { duration: 0.25, ease: EASE_OUT } },
        }}
        inert={!open}
        className="overflow-hidden"
      >
        {/* Answers stop at a readable line length (~70 characters) however wide the list is */}
        <motion.div
          variants={{ open: { y: 0 }, closed: { y: -8 } }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          className={cn("typo-body-large max-w-[70ch] text-pretty px-6 pt-0 pb-6", className)}
        >
          {children}
        </motion.div>
      </motion.div>
    </AccordionPrimitive.Content>
  )
}
