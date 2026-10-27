import { SECTION_LEAD, SECTION_TITLE } from "../layout/page"
import { ProjectList, ProjectsEmpty } from "./project-list"
import type { Project } from "./resources"
import { SECTION } from "./section"

export function Deprecated({ projects }: { projects: Project[] }) {
  return (
    <section aria-labelledby="deprecati-title" className={SECTION}>
      <div className="flex flex-col gap-4">
        <h2 id="deprecati-title" className={SECTION_TITLE}>
          Progetti deprecati
        </h2>
        <p className={`${SECTION_LEAD} max-w-200`}>
          Qui raccogliamo i progetti non più aggiornati o attivi. Puoi contribuire a riportarli in vita, migliorarli o
          usarli come base per nuove idee.
        </p>
      </div>
      <ProjectList
        projects={projects}
        initialCount={8}
        empty={<ProjectsEmpty>Nessun progetto deprecato al momento.</ProjectsEmpty>}
      />
    </section>
  )
}
