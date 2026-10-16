import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FiArrowLeft, FiArrowUpRight, FiUploadCloud } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { GradientIcon } from "@/components/gradient-icon"
import { getProjectResources, resourceDetails } from "@/components/projects/resources"
import { Shape, ShapeLayer } from "@/components/shapes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
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
    <main className="flex w-full flex-col gap-12 pb-20 md:gap-20 md:pb-28">
      <div className="relative">
        <ShapeLayer>
          <Shape variant="big-teal" className="-top-32 right-0 h-auto w-160 opacity-50" />
        </ShapeLayer>
        <section className="mx-auto flex w-full max-w-280 flex-col gap-8 px-6 pt-36 md:gap-10 md:pt-44">
          <Link
            href="/projects"
            className="typo-body-medium flex w-fit items-center gap-2 text-blue-secondary underline-offset-4 hover:underline focus-visible:underline"
          >
            <FiArrowLeft aria-hidden className="size-4 shrink-0" /> Tutti i progetti
          </Link>
          <div className="flex min-w-0 flex-col items-center gap-6 text-center md:flex-row md:gap-10 md:text-start">
            <Glass className="flex size-36 shrink-0 items-center justify-center overflow-hidden rounded-rectangles border-white/50 bg-background-blur p-5 shadow-sm md:size-48 md:p-6">
              {project.logo ? (
                <Image
                  src={project.logo}
                  alt=""
                  width={192}
                  height={192}
                  sizes="(min-width: 768px) 144px, 104px"
                  className="size-full object-contain"
                />
              ) : (
                <GradientIcon icon={FiUploadCloud} className="size-16 md:size-20" />
              )}
            </Glass>
            <div className="flex min-w-0 flex-1 flex-col gap-4 md:gap-6">
              <h1 className="typo-display-small sm:typo-display-medium lg:typo-display-large wrap-anywhere text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
                {project.title}
              </h1>
              <p className="typo-body-large sm:typo-headline-extrasmall wrap-anywhere max-w-200 text-pretty">
                {project.descriptionIt}
              </p>
            </div>
          </div>
        </section>
      </div>

      {resources.length > 0 && (
        <section aria-labelledby="risorse-title" className="mx-auto flex w-full max-w-280 flex-col gap-6 px-6 md:gap-8">
          <div className="flex flex-col gap-3">
            <h2 id="risorse-title" className="typo-headline-medium sm:typo-display-small text-balance">
              Come usarlo
            </h2>
            <p className="typo-body-large text-pretty">
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
              return (
                <li key={`${resource.kind}-${resource.href}`} className="min-w-0">
                  <Card
                    className={cn(
                      "h-full w-full gap-6 border-white/50 p-6 md:p-8",
                      resources.length === 1 && "md:flex-row md:items-center md:gap-8"
                    )}
                  >
                    <div className="flex min-w-0 flex-1 items-start gap-4">
                      <GradientIcon icon={details.icon} className="size-10 shrink-0" />
                      <div className="flex min-w-0 flex-col gap-3">
                        <CardTitle className="typo-headline-small text-balance">{details.title}</CardTitle>
                        <CardContent className="typo-body-large text-pretty">{details.description}</CardContent>
                      </div>
                    </div>
                    <Button
                      asChild
                      size="lg"
                      className={cn(
                        "mt-auto h-auto min-h-10 w-full whitespace-normal py-3 text-center sm:w-fit",
                        resources.length === 1 && "md:mt-0"
                      )}
                    >
                      <a href={resource.href}>
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

      <section className="mx-auto w-full max-w-280 px-6">
        <Glass className="flex flex-col items-start gap-6 rounded-rectangles border-white/50 bg-background-blur p-6 md:flex-row md:items-center md:justify-between md:gap-10 md:p-8">
          <div className="flex min-w-0 flex-col gap-3">
            <h2 className="typo-headline-medium text-balance">Scopri gli altri progetti</h2>
            <p className="typo-body-large max-w-160 text-pretty">
              Strumenti e app realizzati dagli studenti del Politecnico, per gli studenti del Politecnico.
            </p>
          </div>
          <Button asChild size="lg" variant="glass" className="w-full sm:w-fit">
            <Link href="/projects">
              Tutti i progetti <FiArrowLeft aria-hidden />
            </Link>
          </Button>
        </Glass>
      </section>
    </main>
  )
}
