import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { GradientIcon } from "@/components/gradient-icon"
import { ClosingCta } from "@/components/layout/closing-cta"
import { CONTAINER, PAGE_HERO, PAGE_MAIN, SECTION_LEAD, SECTION_STACK, SECTION_TITLE } from "@/components/layout/page"
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
    <main className={PAGE_MAIN}>
      <section className={`${CONTAINER} ${PAGE_HERO} flex flex-col gap-6`}>
        <Link
          href="/projects"
          className="typo-body-medium flex w-fit items-center gap-2 rounded-sm text-blue-secondary underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-blue-secondary"
        >
          <FiArrowLeft aria-hidden className="size-4 shrink-0" /> Tutti i progetti
        </Link>
        <Glass
          className={cn(
            "grid items-center gap-8 rounded-rectangles border-white/50 bg-background-blur p-6 text-center sm:p-12 md:gap-12 md:text-start",
            project.logo && "md:grid-cols-[auto_minmax(0,1fr)]"
          )}
        >
          {project.logo && (
            // Project logos are app icons with their own background and corners: shown as they are, not framed
            <Image
              src={project.logo}
              alt=""
              width={160}
              height={160}
              sizes="(min-width: 768px) 160px, 112px"
              className="mx-auto size-28 object-contain md:size-40"
            />
          )}
          <div className="flex min-w-0 flex-col gap-4">
            {project.category in categoryLabels && (
              <p className="typo-label-large text-blue-secondary">{categoryLabels[project.category]}</p>
            )}
            <h1 className={cn(SECTION_TITLE, "wrap-anywhere")}>{project.title}</h1>
            <p className={cn(SECTION_LEAD, "wrap-anywhere max-w-200")}>{project.descriptionIt}</p>
          </div>
        </Glass>
      </section>

      {resources.length > 0 && (
        <section aria-labelledby="risorse-title" className={SECTION_STACK}>
          <div className="flex flex-col gap-4 text-center md:text-start">
            <h2 id="risorse-title" className={SECTION_TITLE}>
              Come usarlo
            </h2>
            <p className={SECTION_LEAD}>
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

      <ClosingCta
        title="Scopri gli altri progetti"
        lead="Strumenti e app realizzati dagli studenti del Politecnico, per gli studenti del Politecnico."
        action={
          <Button asChild size="lg" className="w-full sm:w-fit">
            <Link href="/projects">
              Tutti i progetti <FiArrowUpRight aria-hidden />
            </Link>
          </Button>
        }
      />
    </main>
  )
}
