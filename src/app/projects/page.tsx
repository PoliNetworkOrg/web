import { Collection } from "@/components/projects/collection"
import { CommunityNews } from "@/components/projects/community-news"
import { Deprecated } from "@/components/projects/deprecated"
import { Upload } from "@/components/projects/upload"
import { getAllProjects } from "@/queries/projects"

export const metadata = {
  title: "Progetti",
  description: "Esplora e contribuisci ai progetti degli studenti",
}

export const dynamic = "force-dynamic"

export default async function Home() {
  const projects = await getAllProjects()

  const news = projects.filter((project) => project.category === "news")
  const general = projects.filter((project) => project.category === "general")
  const deprecated = projects.filter((project) => project.category === "deprecated")

  return (
    <main className="w-full">
      <CommunityNews projects={news} />
      <Collection projects={general} />
      <Upload />
      <Deprecated projects={deprecated} />
    </main>
  )
}
