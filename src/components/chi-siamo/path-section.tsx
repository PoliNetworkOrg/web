import { MotionConfig, motion, useInView, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { FiBook, FiClipboard, FiFileText, FiGift, FiUser, FiUserCheck } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { GradientIcon } from "@/components/gradient-icon"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import { cn } from "@/lib/utils"

const steps = [
  { title: "TOL", description: "Simulazioni, guide e consigli per affrontarlo al meglio.", icon: FiBook },
  { title: "Ammissione", description: "Graduatorie, scadenze e tutto ciò che serve per iniziare.", icon: FiClipboard },
  { title: "Primo anno", description: "Orientamento, gruppi, risorse e supporto tra studenti.", icon: FiUser },
  { title: "Esami", description: "Appunti, temi, consigli e strumenti per prepararti meglio.", icon: FiFileText },
  { title: "Indirizzo", description: "Informazioni chiare per decidere il tuo futuro al PoliMi.", icon: FiUserCheck },
  { title: "Laurea", description: "Fino al traguardo, insieme.", icon: FiGift },
] as const

const LAST = steps.length - 1
/** Time between highlighted steps, and the pause at the end (ms). */
const STEP_EVERY = 1200
const HOLD_AT_END = 3000
const EASE_OUT = [0.22, 1, 0.36, 1] as const

export function PathSection() {
  const ref = useRef<HTMLOListElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reduceMotion = useReducedMotion()
  // The highlighted step (-1: not started).
  const [active, setActive] = useState(-1)

  useEffect(() => {
    if (!inView) return
    // Reduced motion: show the complete path.
    if (reduceMotion) {
      setActive(LAST)
      return
    }
    let step = 0
    let timer: ReturnType<typeof setTimeout>
    const advance = () => {
      if (step < LAST) {
        step++
      } else {
        step = 0
      }
      setActive(step)
      // Hold the final step longer before restarting.
      timer = setTimeout(advance, step === LAST ? HOLD_AT_END : STEP_EVERY)
    }
    // Start highlighting the steps when the section enters the viewport.
    setActive(0)
    timer = setTimeout(advance, STEP_EVERY)
    return () => clearTimeout(timer)
  }, [inView, reduceMotion])

  return (
    <section className={`${CONTAINER} flex flex-col gap-10 md:gap-14`}>
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className={SECTION_TITLE}>Il tuo percorso, sempre al tuo fianco</h2>
        <p className={`${SECTION_LEAD} max-w-215 text-balance`}>
          Dalla prima simulazione del TOL fino alla laurea, ogni studente ha sempre{" "}
          <span className="text-blue-secondary">una risposta</span> a portata di mano e{" "}
          <span className="text-blue-secondary">qualcuno</span> a cui chiederla.
        </p>
      </div>

      <MotionConfig reducedMotion="user">
        <div className="relative">
          <ol ref={ref} className="grid gap-10 lg:grid-cols-6 lg:gap-6">
            {steps.map((step, index) => {
              const reached = index <= active
              return (
                <li
                  key={step.title}
                  className="relative flex items-start gap-4 lg:flex-col lg:items-center lg:text-center"
                >
                  {index < LAST && (
                    // The line to the next step: down on phones, across from lg.
                    <span
                      aria-hidden
                      className="-bottom-10 absolute top-21 left-10 w-1 overflow-hidden rounded-full bg-blue-primary/25 lg:top-10 lg:bottom-auto lg:left-[calc(50%+2.625rem)] lg:h-1 lg:w-[calc(100%-3.75rem)]"
                    >
                      {/* `--fill` grows the bar down on phones and across from lg */}
                      <motion.span
                        className="block size-full origin-top scale-x-100 scale-y-(--fill) rounded-full bg-blue-primary lg:origin-left lg:scale-x-(--fill) lg:scale-y-100"
                        initial={{ "--fill": 0 } as Record<string, number>}
                        animate={{ "--fill": index < active ? 1 : 0 } as Record<string, number>}
                        // `MotionConfig reducedMotion` leaves CSS variables alone: with reduced motion the bars just appear
                        transition={
                          reduceMotion ? { duration: 0 } : { duration: index < active ? 0.9 : 0.3, ease: EASE_OUT }
                        }
                      />
                    </span>
                  )}
                  <div className="relative shrink-0">
                    <Glass
                      className={cn(
                        "flex size-21 items-center justify-center rounded-rectangles p-0 transition-[background-color,border-color,scale] duration-500 motion-reduce:transition-none",
                        reached && "border-white bg-white/70",
                        index === active && "scale-105"
                      )}
                    >
                      <GradientIcon icon={step.icon} className="size-14" />
                    </Glass>
                  </div>
                  <div className="flex flex-col gap-2 pt-2 lg:pt-0">
                    <h3 className="typo-title-large text-balance bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent">
                      {step.title}
                    </h3>
                    <p className="typo-body-medium">{step.description}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </MotionConfig>
    </section>
  )
}
