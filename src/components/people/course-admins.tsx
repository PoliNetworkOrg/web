import { type AnimationPlaybackControls, animate, useReducedMotion } from "motion/react"
import { useEffect, useRef } from "react"
import TabsNavigation from "@/components/tabs"
import { Tabs } from "@/components/tabs/tabs"
import { TabsContent } from "@/components/tabs/tabs-content"
import { type Area, formatPeriod, type Term } from "@/lib/people"
import { cn } from "@/lib/utils"

const SCHOOLS = [
  { value: "ingegneria", label: "Ingegneria" },
  { value: "design", label: "Design" },
  { value: "architettura", label: "Architettura e Urbanistica" },
] as const

type School = (typeof SCHOOLS)[number]["value"]

const ARCHITECTURE = ["Progettazione dell’Architettura", "Urbanistica", "Management of Built Environment"]

function schoolOf(course: string): School {
  if (course.startsWith("Design")) return "design"
  if (ARCHITECTURE.includes(course)) return "architettura"
  return "ingegneria"
}

/** Consecutive terms of the same person become one span, from their first year to their last */
function byPerson(course: Area) {
  const rows: { name: string; first: Term; last: Term }[] = []
  for (const term of course.terms) {
    const name = term.people.map((person) => person.name).join(", ")
    const previous = rows.at(-1)
    if (previous?.name === name) previous.last = term
    else rows.push({ name, first: term, last: term })
  }
  return rows.map(({ name, first, last }) => ({
    name,
    period: formatPeriod({ from: first.from, to: last.to ?? last.from }),
  }))
}

/**
 * One card per course: its admin leads in order on a short line, like the terms on the other lists of /storia, with
 * the years aligned on the right so they read as a column.
 */
function CourseCard({ course }: { course: Area }) {
  const rows = byPerson(course)
  return (
    <li className="flex flex-col gap-3 rounded-2xl border border-white/70 bg-white/45 p-4 sm:p-5">
      <h4 className="typo-title-medium text-balance text-text-primary">{course.name}</h4>
      <ol
        className={cn(
          "relative flex flex-col gap-2",
          // The line joins the first node to the last, through the gaps between the rows
          rows.length > 1 &&
            "before:absolute before:top-2.5 before:bottom-2.5 before:left-[5px] before:w-0.5 before:rounded-full before:bg-blue-primary/20"
        )}
      >
        {rows.map((row) => (
          <li
            key={`${row.name}:${row.period}`}
            className="relative grid grid-cols-[0.75rem_minmax(0,1fr)_auto] items-start gap-x-3"
          >
            <span aria-hidden className="mt-1.5 size-3 rounded-full border-[3px] border-blue-primary/35 bg-white" />
            <span className="typo-body-medium text-pretty text-text-primary">{row.name}</span>
            <span className="typo-body-medium whitespace-nowrap text-text-secondary tabular-nums">{row.period}</span>
          </li>
        ))}
      </ol>
    </li>
  )
}

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Courses by school, one tab each. Engineering alone is twenty courses and the other schools a handful, so switching
 * tab changes the height a lot: the panels' box eases from the old height to the new one instead of jumping, and
 * everything below it on the page follows smoothly.
 */
export function CourseAdmins({ courses }: { courses: Area[] }) {
  const reduceMotion = useReducedMotion()
  /** The box that eases its height; `content` inside it is the panels at their own height */
  const box = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  /** From a switch until the box has reached the new panel's height */
  const switching = useRef(false)
  const running = useRef<AnimationPlaybackControls | null>(null)
  const fallback = useRef<number | undefined>(undefined)
  // Back to the content's own height, so a resized window or a reflow never leaves it stuck
  const release = useRef(() => {
    switching.current = false
    running.current = null
    box.current?.style.removeProperty("height")
    box.current?.style.removeProperty("overflow")
  }).current

  // Radix swaps the panels a render after the tab changes, so the new height is known when the content resizes
  useEffect(() => {
    const el = box.current
    const inner = content.current
    if (!el || !inner) return
    const observer = new ResizeObserver(() => {
      if (!switching.current) return
      // From wherever the box is, mid-animation too: a quick second switch carries on from there
      const start = el.offsetHeight
      const end = inner.offsetHeight
      running.current?.stop()
      const controls = animate(el, { height: [start, end] }, { duration: 0.38, ease: EASE })
      running.current = controls
      controls.finished.then(() => {
        // A later switch owns the box now
        if (running.current === controls) release()
      })
    })
    observer.observe(inner)
    return () => {
      observer.disconnect()
      running.current?.stop()
      window.clearTimeout(fallback.current)
    }
  }, [release])

  return (
    <Tabs
      defaultValue="ingegneria"
      onValueChange={() => {
        const el = box.current
        if (!el || reduceMotion) return
        // Held at the height it has now until the new panel is in place: read before stopping a running animation
        const height = el.offsetHeight
        running.current?.stop()
        running.current = null
        el.style.height = `${height}px`
        el.style.overflow = "hidden"
        switching.current = true
        // Two panels of the same height never resize the content: let the box go anyway
        window.clearTimeout(fallback.current)
        fallback.current = window.setTimeout(() => {
          if (switching.current && !running.current) release()
        }, 500)
      }}
      className="gap-6"
    >
      <TabsNavigation items={SCHOOLS.map(({ value, label }) => ({ value, label }))} />
      <div ref={box}>
        <div ref={content}>
          {SCHOOLS.map((school) => (
            <TabsContent key={school.value} value={school.value} className="focus-visible:ring-inset">
              <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
                {courses
                  .filter((course) => schoolOf(course.name) === school.value)
                  .map((course) => (
                    <CourseCard key={course.name} course={course} />
                  ))}
              </ul>
            </TabsContent>
          ))}
        </div>
      </div>
    </Tabs>
  )
}
