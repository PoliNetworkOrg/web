"use client"

import { MotionConfig, motion } from "motion/react"
import { type ReactNode, useEffect } from "react"

/**
 * False until the first page has hydrated: that page is shown as it is (the server already rendered it, and hiding it
 * until the script loads would delay it), every page reached by navigating afterwards animates in.
 */
let navigated = false

/**
 * Next remounts the root template whenever the first segment of the URL changes (/about → /team), not while moving
 * inside a section (the groups wizard keeps its card). The new page rises and fades in, so changing page reads as a
 * change rather than as the old page scrolling. Header, background and footer live in the root layout, outside it.
 */
export default function Template({ children }: { children: ReactNode }) {
  const animate = navigated
  useEffect(() => {
    navigated = true
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={animate ? { opacity: 0, y: 24 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        // The root layout centres its children in a column: the wrapper takes their place in it
        className="flex w-full flex-col items-center"
      >
        {children}
      </motion.div>
    </MotionConfig>
  )
}
