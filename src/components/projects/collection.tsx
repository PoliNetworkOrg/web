import { FiArrowDown, FiSearch, FiUploadCloud } from "react-icons/fi"
import type { ApiOutput } from "@/types"
import { CardCaption } from "../card-caption"
import { Button } from "../ui/button"
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from "../ui/carousel"
import { Input } from "../ui/input"

type Project = ApiOutput["web"]["projects"]["getAllProjects"][number]

export function Collection({ projects }: { projects: Project[] }) {
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
    </section>
  )
}
