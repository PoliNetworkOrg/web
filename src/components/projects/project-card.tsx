import { FiArrowRight } from "react-icons/fi"
import { CardCaption } from "../card-caption"
import { getProjectResources, type Project, resourceDetails } from "./resources"

/** A project in the lists: opens the project page, and says what it offers there when the project has a link. */
export function ProjectCard({ project }: { project: Project }) {
  const [resource] = getProjectResources(project)
  const details = resource && resourceDetails[resource.kind]

  return (
    <CardCaption
      title={project.title}
      caption={project.descriptionIt}
      image={project.logo ?? undefined}
      href={`/projects/${project.id}`}
      className="h-full w-full gap-3 p-6"
      titleClassName="typo-title-large wrap-anywhere text-balance"
      captionClassName="line-clamp-4 text-pretty"
      footer={
        <span className="typo-label-large flex items-center gap-3 pt-3">
          {details && (
            <span className="flex items-center gap-2 text-slate-600">
              <details.icon aria-hidden className="size-4 shrink-0" />
              {details.title}
            </span>
          )}
          <FiArrowRight aria-hidden className="ml-auto size-4 shrink-0 text-blue-secondary" />
        </span>
      }
    />
  )
}
