import { FiArrowUpRight } from "react-icons/fi"
import { CONTAINER } from "@/components/layout/page"
import { Link } from "@/components/link"
import { PeekCarousel } from "@/components/peek-carousel"
import { ProjectCard } from "@/components/projects/project-card"
import type { Project } from "@/components/projects/resources"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/** `featured`: the first four live projects, in the order set from the admin dashboard (see `fetchFeaturedProjects`) */
export function Projects({ featured }: { featured: Project[] }) {
  return (
    <section
      className={cn(
        CONTAINER,
        "grid grid-cols-1 gap-y-6 py-12 sm:gap-y-8 sm:py-24 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] xl:gap-x-16 xl:gap-y-10 xl:py-32"
      )}
    >
      <h2 className="typo-display-fluid-extralarge text-center text-gradient-grey xl:col-span-2 xl:text-start">
        Progetti
      </h2>

      <div className="flex flex-col items-center gap-8 text-center xl:items-start xl:text-start">
        <p className="typo-body-large hidden max-w-xl sm:block">
          Progetti e strumenti creati dalla nostra community. Qui trovi le iniziative nate dagli studenti del
          Politecnico per semplificare la vita universitaria e creare innovazione. Hai un'idea o un progetto? Proponilo!
          Puoi trovare collaboratori, ricevere supporto dal nostro team e dare vita alla tua soluzione.
        </p>
        <p className="typo-body-large max-w-lg sm:hidden">
          Progetti e strumenti nati dalla community del Politecnico per semplificare la vita universitaria e promuovere
          l’innovazione. Hai un’idea? Proponila, trova collaboratori e realizza la tua soluzione.
        </p>
        <Button variant="primary" size="lg" className="w-fit" asChild>
          <Link href="/progetti">
            Esplora la raccolta
            <FiArrowUpRight />
          </Link>
        </Button>
      </div>

      {featured.length > 0 && (
        // A small heading over the cards: these four are the community's favourites, not the whole collection
        <div className="mx-auto flex w-full min-w-0 max-w-4xl flex-col gap-4 pt-8 xl:max-w-none xl:pt-0">
          <h3 className="typo-title-large text-center text-blue-secondary sm:text-start">I più amati</h3>
          <ul className="hidden w-full auto-rows-fr gap-6 md:grid md:grid-cols-2">
            {featured.map((project) => (
              <li key={project.id} className="min-w-0">
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>

          <PeekCarousel
            items={featured}
            getKey={(project) => project.id}
            render={(project) => <ProjectCard project={project} />}
            className="md:hidden"
          />
        </div>
      )}
    </section>
  )
}
