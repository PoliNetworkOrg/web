"use client"

import { useId, useState } from "react"
import { FiArrowDown, FiArrowUp, FiSearch, FiUploadCloud } from "react-icons/fi"
import type { ApiOutput } from "@/types"
import { CardCaption } from "../card-caption"
import { Button } from "../ui/button"
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from "../ui/carousel"
import { Input } from "../ui/input"

type Project = ApiOutput["web"]["projects"]["getAllProjects"][number]

const INITIAL_PROJECT_COUNT = 8

export function Collection({ projects }: { projects: Project[] }) {
  const [expanded, setExpanded] = useState(false)
  const gridId = useId()
  const visibleProjects = expanded ? projects : projects.slice(0, INITIAL_PROJECT_COUNT)

  return (
    <section className="mx-auto flex min-h-screen max-w-400 flex-col items-center justify-center gap-12 px-4 sm:gap-22">
      <div className="flex flex-col items-center gap-8">
        <h2 className="typo-headline-medium sm:typo-display-medium text-center">
          Esplora la raccolta completa dei progetti
        </h2>
        <div className="flex w-full justify-center">
          <Input
            icon={<FiSearch className="h-5 w-5" />}
            type="text"
            placeholder="Search by name"
            aria-label="Search by name"
            containerClassName="max-w-xl"
            className="typo-body-medium"
          />
        </div>
      </div>

      {projects.length === 0 ? (
        <p className="typo-body-large text-center">Nessun progetto disponibile al momento.</p>
      ) : (
        <>
          <div className="hidden flex-col gap-12 sm:flex">
            <div id={gridId} className="grid 1xl:grid-cols-4 grid-cols-2 justify-items-center gap-6">
              {visibleProjects.map((project) => (
                <CardCaption
                  key={project.id}
                  title={project.title}
                  caption={project.descriptionIt}
                  icon={FiUploadCloud}
                  href={project.link ?? undefined}
                />
              ))}
            </div>
            {projects.length > INITIAL_PROJECT_COUNT && (
              <div className="flex justify-center">
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  aria-expanded={expanded}
                  aria-controls={gridId}
                  onClick={() => setExpanded((previous) => !previous)}
                >
                  {expanded ? "Mostra di meno" : "Mostra di più"}
                  {expanded ? <FiArrowUp /> : <FiArrowDown />}
                </Button>
              </div>
            )}
          </div>

          <div className="flex w-full items-center justify-center sm:hidden">
            <Carousel className="w-full">
              <CarouselContent>
                {projects.map((project) => (
                  <CarouselItem key={project.id}>
                    <div className="flex justify-center">
                      <CardCaption
                        title={project.title}
                        caption={project.descriptionIt}
                        icon={FiUploadCloud}
                        href={project.link ?? undefined}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselDots className="mt-8" />
            </Carousel>
          </div>
        </>
      )}
    </section>
  )
}
