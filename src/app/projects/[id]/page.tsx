import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FiArrowLeft, FiArrowUpRight, FiUploadCloud } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { GradientIcon } from "@/components/gradient-icon"
import { getProjectResources, resourceDetails } from "@/components/projects/resources"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { getProject } from "@/queries/projects"

export const dynamic = "force-dynamic"

const categoryLabels = {
  news: "Novità della community",
  general: "Progetto della community",
  deprecated: "Progetto non più mantenuto",
} as const

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
      <section className="mx-auto flex w-full max-w-330 flex-col gap-6 px-6 pt-52 md:pt-57.5">
        <Link
          href="/projects"
          className="typo-body-medium flex w-fit items-center gap-2 text-blue-secondary underline-offset-4 hover:underline focus-visible:underline"
        >
          <FiArrowLeft aria-hidden className="size-4 shrink-0" /> Tutti i progetti
        </Link>
        <Glass className="grid items-center gap-8 rounded-rectangles border-white/50 bg-linear-to-br from-background-blur to-blue-tertiary/30 p-6 text-center sm:p-12 md:grid-cols-[auto_minmax(0,1fr)] md:gap-12 md:text-start">
          {project.logo ? (
            // Project logos are app icons with their own background and corners: shown as they are, not framed
            <Image
              src={project.logo}
              alt=""
              width={160}
              height={160}
              sizes="(min-width: 768px) 160px, 112px"
              className="mx-auto size-28 object-contain md:size-40"
            />
          ) : (
            <Glass className="mx-auto flex size-28 items-center justify-center rounded-rectangles border-white/50 bg-background-blur p-0 shadow-sm md:size-40">
              <GradientIcon icon={FiUploadCloud} className="size-12 md:size-16" />
            </Glass>
          )}
          <div className="flex min-w-0 flex-col gap-4">
            {project.category in categoryLabels && (
              <p className="typo-label-large text-blue-secondary">{categoryLabels[project.category]}</p>
            )}
            <h1 className="typo-headline-medium sm:typo-display-medium wrap-anywhere text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
              {project.title}
            </h1>
            <p className="typo-body-large sm:typo-headline-extrasmall wrap-anywhere max-w-200 text-pretty">
              {project.descriptionIt}
            </p>
          </div>
        </Glass>
      </section>

      {resources.length > 0 && (
        <section
          aria-labelledby="risorse-title"
          className="mx-auto flex w-full max-w-330 flex-col gap-10 px-6 md:gap-14"
        >
          <div className="flex flex-col gap-4 text-center md:text-start">
            <h2
              id="risorse-title"
              className="typo-headline-medium sm:typo-display-medium text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent"
            >
              Come usarlo
            </h2>
            <p className="typo-body-large sm:typo-headline-extrasmall text-pretty">
              {resources.length > 1
                ? "Scegli la versione più adatta a te."
                : "Apri il progetto e segui le istruzioni per iniziare."}
            </p>
          </div>
          <ul
            className={cn(
              "grid gap-6",
              resources.length > 1 && "md:grid-cols-2",
              resources.length > 2 && "xl:grid-cols-3"
            )}
          >
            {resources.map((resource) => {
              const details = resourceDetails[resource.kind]
              const external = resource.href.startsWith("http")
              return (
                <li key={`${resource.kind}-${resource.href}`} className="min-w-0">
                  <Card
                    className={cn(
                      "h-full w-full gap-6 border-white/50 p-6 md:p-8",
                      resources.length === 1 && "md:flex-row md:items-center md:justify-between md:gap-8"
                    )}
                  >
                    <div className="flex min-w-0 items-start gap-4">
                      <GradientIcon icon={details.icon} className="size-10 shrink-0" />
                      <div className="flex min-w-0 flex-col gap-2">
                        <CardTitle className="typo-headline-small text-balance">{details.title}</CardTitle>
                        <CardContent className="typo-body-large text-pretty">{details.description}</CardContent>
                      </div>
                    </div>
                    <Button
                      asChild
                      size="lg"
                      className={cn("mt-auto w-full shrink-0 sm:w-fit", resources.length === 1 && "md:mt-0")}
                    >
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

      <section className="mx-auto w-full max-w-330 px-6">
        <Glass className="flex flex-col items-center gap-6 rounded-rectangles border-white/50 bg-linear-to-br from-background-blur to-blue-tertiary/30 p-6 text-center sm:p-12">
          <h2 className="typo-headline-medium sm:typo-display-medium text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
            Scopri gli altri progetti
          </h2>
          <p className="typo-body-large sm:typo-headline-extrasmall max-w-200 text-balance">
            Strumenti e app realizzati dagli studenti del Politecnico, per gli studenti del Politecnico.
          </p>
          <Button asChild size="lg" className="w-full sm:w-fit">
            <Link href="/projects">
              Tutti i progetti <FiArrowUpRight aria-hidden />
            </Link>
          </Button>
        </Glass>
      </section>
    </main>
  )
}
