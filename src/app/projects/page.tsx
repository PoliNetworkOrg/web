import { Collection } from "@/components/projects/collection"
import { CommunityNews } from "@/components/projects/community-news"
import { Deprecated } from "@/components/projects/deprecated"
import { Upload } from "@/components/projects/upload"
import { getAllProjects } from "@/queries/projects"
import { CollectionShapes, CommunityNewsShapes, DeprecatedShapes, UploadShapes } from "./shapes"

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
      <div className="relative">
        <CommunityNewsShapes />
        <CommunityNews projects={news} />
      </div>
      <div className="relative">
        <CollectionShapes />
        <Collection projects={general} />
      </div>
      <div className="relative">
        <UploadShapes />
        <Upload />
      </div>
      <div className="relative">
        <DeprecatedShapes />
        <Deprecated projects={deprecated} />
      </div>
    </main>
  )
}
