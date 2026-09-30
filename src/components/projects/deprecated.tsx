import { FiArrowDown, FiUploadCloud } from "react-icons/fi"
import type { ApiOutput } from "@/types"
import { CardCaption } from "../card-caption"
import { Button } from "../ui/button"
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from "../ui/carousel"

type Project = ApiOutput["web"]["projects"]["getAllProjects"][number]

export function Deprecated({ projects }: { projects: Project[] }) {
  return (
    <section className="mx-auto flex min-h-screen max-w-400 flex-col items-center justify-center px-4 py-49">
      <div className="flex w-full flex-col gap-14 sm:w-fit">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <h3 className="typo-headline-medium sm:typo-display-medium text-center sm:text-left">Progetti deprecati</h3>
          <p className="typo-body-large text-center sm:text-left">
            Qui raccogliamo i progetti non più aggiornati o attivi. <br />
            Puoi contribuire a riportarli in vita, migliorarli o usarli come base per nuove idee.
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="typo-body-large text-center sm:text-left">Nessun progetto deprecato al momento.</p>
        ) : (
          <>
            <div className="hidden flex-col gap-12 sm:flex">
              <div className="grid 1xl:grid-cols-4 grid-cols-2 justify-items-center gap-6">
                {projects.map((project) => (
                  <CardCaption
                    key={project.id}
                    title={project.title}
                    caption={project.descriptionIt}
                    icon={FiUploadCloud}
                    href={project.link ?? undefined}
                  />
                ))}
              </div>
              <div className="flex justify-center">
                <Button variant="primary" size="lg">
                  Mostra di più
                  <FiArrowDown />
                </Button>
              </div>
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
      </div>
    </section>
  )
}
