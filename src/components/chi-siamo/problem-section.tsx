"use client"

import { AnimatePresence, MotionConfig, motion, useInView, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import {
  FiBook,
  FiCalendar,
  FiClipboard,
  FiDollarSign,
  FiEdit,
  FiFileText,
  FiGlobe,
  FiRepeat,
  FiUsers,
} from "react-icons/fi"
import { GradientIcon } from "@/components/gradient-icon"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import { cn } from "@/lib/utils"

const questions = [
  { text: "Dove trovo il gruppo del mio corso?", icon: FiUsers },
  { text: "Come funziona il piano degli studi?", icon: FiFileText },
  { text: "Cosa succede se non passo l’OFA di inglese?", icon: FiEdit },
  { text: "Quando escono le graduatorie del TOL?", icon: FiClipboard },
  { text: "Come mi iscrivo a un appello d’esame?", icon: FiCalendar },
  { text: "Dove trovo appunti e temi d’esame?", icon: FiBook },
  { text: "Come si calcolano le tasse universitarie?", icon: FiDollarSign },
  { text: "Posso cambiare corso dopo il primo anno?", icon: FiRepeat },
  { text: "Come funziona l’Erasmus?", icon: FiGlobe },
] as const

/** Where each bubble floats: they alternate sides, so the questions look scattered rather than listed */
const SLOTS = ["self-start", "self-end sm:mr-8", "self-start sm:ml-16", "self-end"] as const
/** A bubble is replaced every this many ms, one slot after the other */
const SWAP_EVERY = 2200

export function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduceMotion = useReducedMotion()
  // The question shown in each slot, as indices into `questions`
  const [shown, setShown] = useState<number[]>(() => SLOTS.map((_, i) => i))

  useEffect(() => {
    // Cycles only while visible, and not at all with reduced motion: the first questions stay put
    if (!inView || reduceMotion) return
    let tick = 0
    const id = setInterval(() => {
      setShown((current) => {
        const slot = tick % SLOTS.length
        tick++
        // The next question that isn't on screen yet, after the last one shown
        let next = (Math.max(...current) + 1) % questions.length
        while (current.includes(next)) next = (next + 1) % questions.length
        return current.map((question, i) => (i === slot ? next : question))
      })
    }, SWAP_EVERY)
    return () => clearInterval(id)
  }, [inView, reduceMotion])

  return (
    <section className={`${CONTAINER} flex flex-col items-center gap-10 md:gap-14`}>
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className={SECTION_TITLE}>Il problema</h2>
        <p className={cn(SECTION_LEAD, "max-w-180 text-balance")}>
          Il PoliMi è complesso. Le informazioni non dovrebbero esserlo.
        </p>
      </div>

      {/* The questions students ask, popping up and fading away. Screen readers get them as a plain list */}
      <ul className="sr-only">
        {questions.map((question) => (
          <li key={question.text}>{question.text}</li>
        ))}
      </ul>
      <MotionConfig reducedMotion="user">
        <div ref={ref} aria-hidden className="flex w-full max-w-4xl flex-col gap-3">
          {SLOTS.map((slot, i) => {
            const question = questions[shown[i] ?? i] ?? questions[0]
            return (
              // A fixed-height slot: a question wrapping onto two lines doesn't push the others
              <div key={slot} className={cn("flex h-18 max-w-full items-center sm:h-16", slot)}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={question.text}
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ type: "spring", bounce: 0.35, duration: 0.6 }}
                    className="max-w-full"
                  >
                    {/* Each bubble bobs gently, out of step with the others */}
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4 + i * 0.7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      className="flex items-center gap-4 rounded-rectangles border border-white/50 bg-background-blur px-5 py-4 backdrop-blur-md"
                    >
                      <GradientIcon icon={question.icon} className="size-6 shrink-0" />
                      <span className="typo-body-medium sm:typo-body-large text-pretty">{question.text}</span>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </MotionConfig>
    </section>
  )
}
