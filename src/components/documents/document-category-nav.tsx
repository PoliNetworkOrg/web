"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { getActiveCategory, getCategoryAnchor } from "./utils"

/** A category counts as the one being read once its top passes under the fixed header (sections use scroll-mt-36). */
const READING_LINE = 160

/**
 * The page's category tabs. The category being read shows Figma's Selected state (blue), so the tabs also tell where
 * you are; on phones the row scrolls sideways to keep that tab in view.
 */
export function DocumentCategoryNav({ categories }: { categories: { id: string; title: string }[] }) {
  const [active, setActive] = useState<string | null>(null)
  const list = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const sections = categories
      .map((category) => document.getElementById(getCategoryAnchor(category.id)))
      .filter((section) => section !== null)
    let frame = 0
    const update = () => {
      frame = 0
      const root = document.documentElement
      const atBottom = window.innerHeight + window.scrollY >= root.scrollHeight - 2
      const tops = sections.map((section) => section.getBoundingClientRect().top)
      const index = getActiveCategory(tops, READING_LINE, atBottom)
      setActive(categories[index]?.id ?? null)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [categories])

  useEffect(() => {
    const row = list.current
    const tab = active && row?.querySelector<HTMLElement>(`[data-category="${active}"]`)
    if (!row || !tab) return
    // Scroll only the row: scrollIntoView would also move the page while it is being scrolled. The nav is the tabs'
    // offset parent (relative), so offsetLeft is already in its scroll coordinates
    const nav = row.parentElement
    if (!nav) return
    const left = tab.offsetLeft
    if (left < nav.scrollLeft || left + tab.offsetWidth > nav.scrollLeft + nav.clientWidth) {
      nav.scrollTo({ left: left - 12, behavior: "smooth" })
    }
  }, [active])

  return (
    <nav aria-label="Categorie dei documenti" className="relative overflow-x-auto border-grey border-b">
      <ul ref={list} className="flex w-max gap-16 px-3">
        {categories.map((category) => (
          <li key={category.id} data-category={category.id}>
            <a
              href={`#${getCategoryAnchor(category.id)}`}
              aria-current={active === category.id ? "location" : undefined}
              className={cn(
                "typo-body-large inline-block rounded-images py-3 text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-blue-primary focus-visible:outline-offset-[-2px]",
                "aria-[current=location]:text-blue-primary"
              )}
            >
              {category.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
