import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FiArrowLeft, FiArrowUpRight, FiUploadCloud } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { GradientIcon } from "@/components/gradient-icon"
import { getProjectResources, resourceDetails } from "@/components/projects/resources"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getProject } from "@/queries/projects"

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
    <main className="mx-auto flex w-full max-w-330 flex-col gap-10 px-6 pt-52 pb-24 md:gap-14 md:pt-57.5 md:pb-36">
      <Button asChild variant="tertiary" className="w-fit">
        <Link href="/projects">
          <FiArrowLeft aria-hidden />
          Tutti i progetti
        </Link>
      </Button>

      <Glass className="grid items-center gap-8 rounded-rectangles border-white/50 bg-linear-to-br from-background-blur to-blue-tertiary/30 p-6 sm:p-12 md:grid-cols-[auto_minmax(0,1fr)] md:gap-12">
        <div className="flex size-28 items-center justify-center overflow-hidden rounded-rectangles bg-background-blur md:size-40">
          {project.logo ? (
            <Image src={project.logo} alt="" width={160} height={160} className="size-full object-contain" />
          ) : (
            <GradientIcon icon={FiUploadCloud} className="size-14 md:size-20" />
          )}
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <h1 className="typo-headline-medium sm:typo-display-medium text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
            {project.title}
          </h1>
          <p className="typo-body-large sm:typo-headline-extrasmall text-pretty">{project.descriptionIt}</p>
        </div>
      </Glass>

      {resources.length > 0 && (
        <section aria-labelledby="risorse-title" className="flex flex-col gap-6">
          <h2 id="risorse-title" className="typo-headline-small sm:typo-headline-medium text-balance">
            Come usarlo
          </h2>
          <ul className="grid gap-6 md:grid-cols-2">
            {resources.map((resource) => {
              const details = resourceDetails[resource.kind]
              const external = resource.href.startsWith("http")
              return (
                <li key={`${resource.kind}-${resource.href}`} className="min-w-0 md:last:odd:col-span-2">
                  <Card className="h-full w-full gap-6 border-white/50 p-6 sm:p-8">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <GradientIcon icon={details.icon} className="size-10 shrink-0" />
                      <CardTitle className="typo-headline-medium text-balance">{details.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="typo-body-large flex-1 text-pretty">{details.description}</CardContent>
                    <Button asChild size="lg" className="w-fit max-w-full">
                      <a
                        href={resource.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                      >
                        {details.cta}
                        <FiArrowUpRight aria-hidden />
                      </a>
                    </Button>
                  </Card>
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </main>
  )
}
