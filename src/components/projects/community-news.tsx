import { SECTION_LEAD, SECTION_TITLE } from "../layout/page"
import { ProjectList, ProjectsEmpty } from "./project-list"
import type { Project } from "./resources"
import { SECTION } from "./section"

export function CommunityNews({ projects }: { projects: Project[] }) {
  return (
    <section aria-labelledby="novita-title" className={SECTION}>
      <div className="flex flex-col gap-4">
        <h2 id="novita-title" className={SECTION_TITLE}>
          Le novità della community
        </h2>
        <p className={SECTION_LEAD}>Rimani aggiornato sulle idee appena condivise dagli studenti del Politecnico.</p>
      </div>
      <ProjectList
        projects={projects}
        empty={
          <ProjectsEmpty>
            Nessuna novità al momento.{" "}
            <a href="#proponi" className="text-blue-secondary underline underline-offset-4">
              Hai un'idea? Proponila
            </a>
          </ProjectsEmpty>
        }
      />
    </section>
  )
}
