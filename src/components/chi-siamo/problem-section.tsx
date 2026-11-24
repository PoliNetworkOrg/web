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
  { text: "Dove si trova l’aula della lezione?", icon: FiBook },
  { text: "Quando posso modificare il piano studi?", icon: FiFileText },
  { text: "Quali documenti servono per l’ISEE?", icon: FiClipboard },
  { text: "Ci sono gruppi per le matricole?", icon: FiUsers },
  { text: "Come faccio a convalidare un esame?", icon: FiEdit },
  { text: "Quando scade l’iscrizione al semestre?", icon: FiCalendar },
  { text: "Come trovo il ricevimento del docente?", icon: FiUsers },
  { text: "Come si richiede una borsa di studio?", icon: FiDollarSign },
  { text: "Dove posso studiare tra una lezione e l’altra?", icon: FiBook },
] as const

const SLOTS = 8
const SWAP_EVERY = 450
const ENTRANCE_STAGGER = 0.06

type Bubble = { slot: number; question: number; id: number; offset: number; top: number }

export function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduceMotion = useReducedMotion()
  const [shown, setShown] = useState<Bubble[]>(() =>
    Array.from({ length: SLOTS }, (_, i) => ({ slot: i, question: i, id: i, offset: (i * 7) % 15, top: (i * 5) % 13 }))
  )
  const sequence = useRef(SLOTS)
  // False until the section is first seen: the bubbles then pop in, instead of already being there
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    if (inView) setEntered(true)
  }, [inView])

  useEffect(() => {
    // Cycles only while visible, and not at all with reduced motion: the first questions stay put
    if (!inView || reduceMotion) return
    let tick = 0
    const id = setInterval(() => {
      const slot = tick++ % SLOTS
      const bubbleId = sequence.current++
      const offset = Math.random() * 16
      const top = Math.random() * 12
      const candidate = Math.floor(Math.random() * questions.length)
      setShown((current) => {
        let next = candidate
        while (current.some((bubble) => bubble.question === next)) next = (next + 1) % questions.length
        return current.map((bubble, i) =>
          i === slot
            ? { ...bubble, question: next, id: bubbleId, offset: (bubble.offset + 5 + (offset % 6)) % 16, top }
            : bubble
        )
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
        <div ref={ref} aria-hidden className="grid w-full max-w-6xl grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
          {shown.map((bubble, i) => {
            const question = questions[bubble.question] ?? questions[0]
            // The first question of each slot waits for the ones above it; the later ones swap in at once
            const delay = bubble.id < SLOTS ? i * ENTRANCE_STAGGER : 0
            return (
              // A fixed-height slot: a question wrapping onto two lines doesn't push the others
              <div key={bubble.slot} className={cn("flex h-24 min-w-0 items-start", i >= 6 && "hidden sm:flex")}>
                <AnimatePresence mode="wait">
                  {(entered || reduceMotion) && (
                    <motion.div
                      key={bubble.id}
                      style={{
                        marginLeft: `${bubble.offset}%`,
                        marginTop: bubble.top,
                        maxWidth: `${100 - bubble.offset}%`,
                      }}
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 8 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: { type: "spring", bounce: 0.15, duration: 0.28, delay },
                      }}
                      exit={{ opacity: 0, transition: { duration: 0.12 } }}
                      transition={{ type: "spring", bounce: 0.35, duration: 0.5 }}
                      className="max-w-full"
                    >
                      {/* Each bubble bobs gently, out of step with the others */}
                      <motion.div
                        animate={reduceMotion ? { y: 0 } : { y: [0, -3, 0] }}
                        transition={{ duration: 4 + i * 0.7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        className="flex items-center gap-4 rounded-rectangles border border-white/50 bg-background-blur px-5 py-4 backdrop-blur-md"
                      >
                        <GradientIcon icon={question.icon} className="size-6 shrink-0" />
                        <span className="typo-body-medium sm:typo-body-large text-pretty">{question.text}</span>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </MotionConfig>
    </section>
  )
}
