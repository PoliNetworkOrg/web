import { CONTAINER, PAGE_HERO, PAGE_MAIN } from "@/components/layout/page"
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
      <section className={`${CONTAINER} ${PAGE_HERO}`}>
        <Hero title="Projects" description="Esplora e contribuisci ai progetti degli studenti" />
      </section>
      <CommunityNews projects={news} />
      <Collection projects={general} />
      <Upload />
      <Deprecated projects={deprecated} />
    </main>
  )
}
