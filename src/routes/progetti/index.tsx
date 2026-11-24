import { createFileRoute } from "@tanstack/react-router"
import { CONTAINER, PAGE_HERO, PAGE_MAIN } from "@/components/layout/page"
import { Collection } from "@/components/projects/collection"
import { CommunityNews } from "@/components/projects/community-news"
import { Deprecated } from "@/components/projects/deprecated"
import { Upload } from "@/components/projects/upload"
import { Hero } from "@/components/ui/hero"
import { pageMeta } from "@/lib/seo"
import { fetchProjects } from "@/queries/functions"

export const Route = createFileRoute("/progetti/")({
  loader: () => fetchProjects(),
  head: () => ({
    meta: pageMeta({ title: "Progetti", description: "Esplora e contribuisci ai progetti degli studenti" }),
  }),
  component: ProjectsPage,
})

function ProjectsPage() {
  const projects = Route.useLoaderData()

  const news = projects.filter((project) => project.category === "news")
  const general = projects.filter((project) => project.category === "general")
  const deprecated = projects.filter((project) => project.category === "deprecated")

  return (
    <main className={PAGE_MAIN}>
      <section className={`${CONTAINER} ${PAGE_HERO}`}>
        <Hero title="Progetti" description="Esplora e contribuisci ai progetti degli studenti" />
      </section>
      <CommunityNews projects={news} />
      <Collection projects={general} searchable={projects} />
      <Upload />
      <Deprecated projects={deprecated} />
    </main>
  )
}
