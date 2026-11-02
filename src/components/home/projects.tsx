import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { CONTAINER } from "@/components/layout/page"
import { PeekCarousel } from "@/components/peek-carousel"
import { ProjectCard } from "@/components/projects/project-card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getAllProjects } from "@/queries/projects"

export async function Projects() {
  // The first four live projects, in the order set from the admin dashboard
  const featured = (await getAllProjects()).filter((project) => project.category !== "deprecated").slice(0, 4)

  return (
    <section
      className={cn(
        CONTAINER,
        "grid grid-cols-1 gap-y-6 py-20 sm:gap-y-8 sm:py-24 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] xl:gap-x-16 xl:gap-y-10 xl:py-32"
      )}
    >
      <h2 className="typo-display-fluid-extralarge bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-center text-transparent xl:col-span-2 xl:text-start">
        15+ Projects
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
          <Link href="/projects">
            Esplora la raccolta
            <FiArrowUpRight />
          </Link>
        </Button>
      </div>

      {featured.length > 0 && (
        <>
          <ul className="mx-auto hidden w-full max-w-4xl auto-rows-fr gap-6 pt-8 sm:grid sm:grid-cols-2 xl:max-w-none xl:pt-0">
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
            className="pt-6 sm:hidden"
          />
        </>
      )}
    </section>
  )
}
