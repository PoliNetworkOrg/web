import { Collection } from "@/components/projects/collection"
import { CommunityNews } from "@/components/projects/community-news"
import { Deprecated } from "@/components/projects/deprecated"
import { Upload } from "@/components/projects/upload"

export const metadata = {
  title: "Progetti",
  description: "Esplora e contribuisci ai progetti degli studenti",
}

export default function Home() {
  return (
    <main className="w-full">
      <CommunityNews />
      <Collection />
      <Upload />
      <Deprecated />
    </main>
  )
}
