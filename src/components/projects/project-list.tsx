"use client"

import { type ReactNode, useId, useState } from "react"
import { FiArrowDown, FiArrowUp } from "react-icons/fi"
import { Button } from "../ui/button"
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from "../ui/carousel"
import { ProjectCard } from "./project-card"
import type { Project } from "./resources"

/**
 * Cards keep a readable width at every viewport (16rem min, one fr max), so the column count follows the space
 * instead of jumping at fixed breakpoints. On phones the list becomes a carousel with the next card peeking in.
 */
export function ProjectList({
  projects,
  initialCount,
  empty,
}: {
  projects: Project[]
  /** Show only this many cards on larger screens until expanded. */
  initialCount?: number
  empty: ReactNode
}) {
  const [expanded, setExpanded] = useState(false)
  const gridId = useId()

  if (projects.length === 0) return empty

  const collapsible = initialCount !== undefined && projects.length > initialCount
  const visible = collapsible && !expanded ? projects.slice(0, initialCount) : projects

  return (
    <>
      <div className="hidden flex-col items-center gap-12 sm:flex">
        <ul id={gridId} className="grid w-full grid-cols-[repeat(auto-fill,minmax(min(100%,16rem),1fr))] gap-6">
          {visible.map((project) => (
            <li key={project.id} className="min-w-0">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
        {collapsible && (
          <Button
            type="button"
            variant="primary"
            size="lg"
            aria-expanded={expanded}
            aria-controls={gridId}
            onClick={() => setExpanded((previous) => !previous)}
          >
            {expanded ? "Mostra di meno" : `Mostra tutti (${projects.length})`}
            {expanded ? <FiArrowUp aria-hidden="true" /> : <FiArrowDown aria-hidden="true" />}
          </Button>
        )}
      </div>

      <div className="-mx-6 sm:hidden">
        <Carousel opts={{ align: "start" }}>
          <CarouselContent className="mr-6 ml-2">
            {projects.map((project) => (
              <CarouselItem key={project.id} className="basis-[85%]">
                <ProjectCard project={project} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots className="mt-6" />
        </Carousel>
      </div>
    </>
  )
}

/** Shown in place of an empty list: says so plainly and points to the one thing the reader can do about it. */
export function ProjectsEmpty({ children }: { children: ReactNode }) {
  return (
    <div className="typo-body-large rounded-rectangles border border-slate-300 border-dashed px-6 py-10 text-center text-slate-600">
      {children}
    </div>
  )
}
