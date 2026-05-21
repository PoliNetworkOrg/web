import { Collection } from "@/components/projects/collection"
import { CommunityNews } from "@/components/projects/community-news"
import { Upload } from "@/components/projects/upload"

export default function Home() {
  return (
    <main className="w-full">
      <Collection />
      <CommunityNews />
      <Upload />
    </main>
  )
}
