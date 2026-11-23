import Link from "next/link"
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi"
import { CardCaption } from "@/components/card-caption"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import { PeekCarousel } from "@/components/peek-carousel"
import { ProjectCard } from "@/components/projects/project-card"
import type { Project } from "@/components/projects/resources"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getAllProjects } from "@/queries/projects"
import { Devices } from "./devices"

/** The four tools shown here, matched by name against the projects from the backend */
const FEATURED = [
  {
    match: /graduatori/i,
    title: "Graduatorie",
    description: "Per consultare le graduatorie degli anni precedenti.",
  },
  { match: /\btol\b/i, title: "TOL", description: "Per esercitarsi con prove e simulazioni del TOL." },
  { match: /aule/i, title: "PoliAule", description: "Per trovare un’aula libera in cui studiare." },
  {
    match: /webeep/i,
    title: "WeBeep Sync",
    description: "Per rendere più semplice l’accesso ai file dei corsi.",
  },
] as const

type Featured = { project: Project } | { title: string; description: string }

/**
 * Without a match from the backend, a card with the same look as `ProjectCard`, pointing to the collection: four
 * cards are always shown, like everywhere else on the site.
 */
function FallbackCard({ title, description }: { title: string; description: string }) {
  return (
    <CardCaption
      title={title}
      caption={description}
      href="/progetti"
      className="h-full w-full gap-3 p-6"
      titleClassName="typo-title-large wrap-anywhere text-balance"
      captionClassName="line-clamp-4 text-pretty"
      footer={
        <span className="typo-label-large flex items-center gap-3 pt-3">
          <FiArrowRight aria-hidden className="ml-auto size-4 shrink-0 text-blue-secondary" />
        </span>
      }
    />
  )
}

function FeaturedCard({ item }: { item: Featured }) {
  return "project" in item ? <ProjectCard project={item.project} /> : <FallbackCard {...item} />
}

export async function HistoryProjects() {
  const projects = await getAllProjects()
  const featured: Featured[] = FEATURED.map(({ match, title, description }) => {
    const project = projects.find((candidate) => match.test(candidate.title))
    return project ? { project } : { title, description }
  })
  const key = (item: Featured) => ("project" in item ? String(item.project.id) : item.title)

  return (
    <section className={`${CONTAINER} flex flex-col gap-12 md:gap-16`}>
      <div className="grid items-center gap-12 xl:grid-cols-2 xl:gap-16">
        <div className="flex min-w-0 flex-col items-start gap-6">
          <h2 className={SECTION_TITLE}>Le cose che abbiamo costruito</h2>
          <p className={cn(SECTION_LEAD, "max-w-160")}>
            Nel corso degli anni PoliNetwork ha sviluppato e mantenuto un ecosistema di{" "}
            <span className="text-blue-secondary">strumenti gratuiti e open source</span>, pensati per rispondere ai
            bisogni concreti degli studenti. Molti sono nati da{" "}
            <span className="text-blue-secondary">idee individuali</span> di studenti, poi entrate nel network.
          </p>
          <Button asChild size="lg" className="mt-2">
            <Link href="/progetti">
              Scopri tutti i progetti <FiArrowUpRight aria-hidden />
            </Link>
          </Button>
        </div>
        <Devices />
      </div>

      {/* Four in a row, like the projects on the home page; a carousel on phones */}
      <ul className="hidden auto-rows-fr gap-6 md:grid md:grid-cols-2 xl:grid-cols-4">
        {featured.map((item) => (
          <li key={key(item)} className="min-w-0">
            <FeaturedCard item={item} />
          </li>
        ))}
      </ul>
      <PeekCarousel
        items={featured}
        getKey={key}
        render={(item) => <FeaturedCard item={item} />}
        className="md:hidden"
      />
    </section>
  )
}
