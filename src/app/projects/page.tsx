import { CONTAINER, PAGE_MAIN } from "@/components/layout/page"
import { Collection } from "@/components/projects/collection"
import { CommunityNews } from "@/components/projects/community-news"
import { Deprecated } from "@/components/projects/deprecated"
import { Upload } from "@/components/projects/upload"
import { Hero } from "@/components/ui/hero"
import { getAllProjects } from "@/queries/projects"

export const metadata = {
  title: "Progetti",
  description: "Esplora e contribuisci ai progetti degli studenti",
}

export const dynamic = "force-dynamic"

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  const news = projects.filter((project) => project.category === "news")
  const general = projects.filter((project) => project.category === "general")
  const deprecated = projects.filter((project) => project.category === "deprecated")

  return (
    <main className={PAGE_MAIN}>
      {/* 3/4 of PAGE_HERO's air: above, between the fixed header and the title; below, padding plus PAGE_MAIN's gap */}
      <section className={`${CONTAINER} pt-44 pb-0 md:pt-45.5 md:pb-1 lg:pt-47 xl:pb-7`}>
        <Hero title="Progetti" description="Esplora e contribuisci ai progetti degli studenti" />
      </section>
      <CommunityNews projects={news} />
      <Collection projects={general} searchable={projects} />
      <Upload />
      <Deprecated projects={deprecated} />
    </main>
  )
}
