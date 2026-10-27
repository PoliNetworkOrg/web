import Image from "next/image"
import Link from "next/link"
import { FiArrowRight } from "react-icons/fi"
import { Card, CardContent, CardTitle } from "../ui/card"
import { getProjectResources, type Project, resourceDetails } from "./resources"

/**
 * A project in the lists. The whole card opens the project page; the footer says what's waiting there (the web app or
 * the source code) when the project has a link. The project's own logo replaces Figma's placeholder icon.
 */
export function ProjectCard({ project }: { project: Project }) {
  const [resource] = getProjectResources(project)
  const details = resource && resourceDetails[resource.kind]

  return (
    <Card
      hoverBackground
      className="h-full w-full gap-3 p-6 has-[>a:focus-visible]:ring-2 has-[>a:focus-visible]:ring-blue-secondary"
    >
      <Link
        href={`/projects/${project.id}`}
        className="absolute inset-0 z-10 outline-none"
        aria-label={project.title}
      />
      <div className="relative flex items-center gap-3">
        {project.logo && (
          <Image src={project.logo} alt="" width={40} height={40} className="size-10 shrink-0 object-contain" />
        )}
        <CardTitle gradient={false} className="typo-title-large wrap-anywhere text-balance">
          {/* Gradient per line (box-decoration-clone): a two-line title doesn't fade into a paler second line */}
          <span className="bg-linear-to-b from-blue-secondary to-blue-primary box-decoration-clone bg-clip-text text-transparent">
            {project.title}
          </span>
        </CardTitle>
      </div>
      <CardContent className="typo-body-medium relative line-clamp-4 text-pretty">{project.descriptionIt}</CardContent>
      <div className="typo-label-large relative mt-auto flex items-center justify-between gap-3 pt-3">
        {details ? (
          <span className="flex items-center gap-2 text-slate-600">
            <details.icon aria-hidden className="size-4 shrink-0" />
            {details.title}
          </span>
        ) : (
          <span />
        )}
        <FiArrowRight aria-hidden className="size-4 shrink-0 text-blue-secondary" />
      </div>
    </Card>
  )
}
