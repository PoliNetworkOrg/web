import { FiCrop } from "react-icons/fi"
import type { ApiOutput } from "@/types"
import { CardCaption } from "../card-caption"
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from "../ui/carousel"
import { Hero } from "../ui/hero"

type Project = ApiOutput["web"]["projects"]["getAllProjects"][number]

export function CommunityNews({ projects }: { projects: Project[] }) {
  return (
    <section className="mx-auto flex min-h-screen max-w-400 flex-col items-center justify-center gap-48 px-4 py-49">
      <Hero title="Projects" description=" Esplora e contribuisci ai progetti degli studenti" />

      <div className="mx-auto flex w-full flex-col gap-14 sm:w-fit">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <h3 className="typo-headline-medium sm:typo-display-medium text-center sm:text-left">
            Le novità della community
          </h3>
          <p className="typo-body-large text-center sm:text-left">
            Rimani aggiornato sulle idee appena condivise dagli studenti del Politecnico
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="typo-body-large text-center sm:text-left">Nessuna novità disponibile al momento.</p>
        ) : (
          <>
            {/* Desktop Grid */}
            <div className="hidden 1xl:grid-cols-4 justify-items-center gap-6 md:grid md:grid-cols-2">
              {projects.map((project) => (
                <CardCaption
                  key={project.id}
                  title={project.title}
                  caption={project.descriptionIt}
                  icon={FiCrop}
                  iconPosition="right"
                  href={project.link ?? undefined}
                />
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="sm:hidden">
              <Carousel className="w-full">
                <CarouselContent>
                  {projects.map((project) => (
                    <CarouselItem key={project.id}>
                      <div className="flex justify-center">
                        <CardCaption
                          title={project.title}
                          caption={project.descriptionIt}
                          icon={FiCrop}
                          iconPosition="right"
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
      </div>
    </section>
  )
}
