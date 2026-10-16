import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FiArrowUpRight, FiUploadCloud } from "react-icons/fi"
import { CardIcon } from "@/components/card-icon"
import { Glass } from "@/components/glass"
import { GradientIcon } from "@/components/gradient-icon"
import { getProjectResources, resourceDetails } from "@/components/projects/resources"
import { Button } from "@/components/ui/button"
import { Hero } from "@/components/ui/hero"
import { getProject } from "@/queries/projects"
import { CommunityNewsShapes } from "../shapes"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ id: string }> }

async function loadProject(params: Props["params"]) {
  const { id } = await params
  const projectId = Number(id)
  return Number.isInteger(projectId) ? getProject(projectId) : null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await loadProject(params)
  return project ? { title: project.title, description: project.descriptionIt } : { title: "Progetto non trovato" }
}

export default async function ProjectPage({ params }: Props) {
  const project = await loadProject(params)
  if (!project) notFound()
  const resources = getProjectResources(project)

  return (
    <main className="flex w-full flex-col gap-24 pb-24 md:gap-36 md:pb-36">
      <div className="relative">
        <CommunityNewsShapes />
        <section className="mx-auto flex w-full max-w-330 flex-col items-center gap-6 px-6 pt-52 md:pt-57.5">
          <Glass className="flex size-24 items-center justify-center overflow-hidden rounded-rectangles border-white/50 bg-background-blur p-4 md:size-32">
            {project.logo ? (
              <Image src={project.logo} alt="" width={128} height={128} className="size-full object-contain" />
            ) : (
              <GradientIcon icon={FiUploadCloud} className="size-12 md:size-16" />
            )}
          </Glass>
          <Hero title={project.title} description={project.descriptionIt} gradientDescription />
        </section>
      </div>

      {resources.length > 0 && (
        <section
          aria-labelledby="risorse-title"
          className="mx-auto flex w-full max-w-330 flex-col items-center gap-10 px-6 md:gap-14"
        >
          <div className="flex flex-col gap-4 text-center">
            <h2
              id="risorse-title"
              className="typo-headline-medium sm:typo-display-medium text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent"
            >
              Come usarlo
            </h2>
            <p className="typo-body-large sm:typo-headline-extrasmall text-balance">
              Scegli la versione più adatta a te.
            </p>
          </div>
          <ul className="flex w-full flex-wrap justify-center gap-6">
            {resources.map((resource) => {
              const details = resourceDetails[resource.kind]
              return (
                <li
                  key={`${resource.kind}-${resource.href}`}
                  className="w-full sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]"
                >
                  <CardIcon
                    title={details.title}
                    description={details.description}
                    icon={details.icon}
                    cta={details.cta}
                    href={resource.href}
                    size="compact"
                    align="start"
                    hoverEffect
                    className="h-full"
                  />
                </li>
              )
            })}
          </ul>
        </section>
      )}

      <section className="mx-auto w-full max-w-330 px-6">
        <Glass className="flex flex-col items-center gap-6 rounded-rectangles border-white/50 bg-linear-to-br from-background-blur to-blue-tertiary/30 p-6 text-center sm:p-12">
          <h2 className="typo-headline-medium sm:typo-display-medium text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
            Scopri gli altri progetti
          </h2>
          <p className="typo-body-large sm:typo-headline-extrasmall max-w-200 text-balance">
            Strumenti e app realizzati dagli studenti del Politecnico, per gli studenti del Politecnico.
          </p>
          <Button asChild size="lg">
            <Link href="/projects">
              Tutti i progetti <FiArrowUpRight aria-hidden />
            </Link>
          </Button>
        </Glass>
      </section>
    </main>
  )
}
