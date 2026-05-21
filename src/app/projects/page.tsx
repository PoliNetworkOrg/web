import { Deprecated } from "@/components/projects/deprecated"
import { Upload } from "@/components/projects/upload"

export default function Home() {
  return (
    <main className="w-full">
      <Deprecated />
      <Upload />
    </main>
  )
}
