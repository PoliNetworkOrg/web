import { CommunityNews } from "@/components/projects/community-news"
import { Upload } from "@/components/projects/upload"

export default function Home() {
  return (
    <main className="w-full">
      <CommunityNews />
      <Upload />
    </main>
  )
}
