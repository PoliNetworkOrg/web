import { AboutUs } from "@/components/home/about-us"
import { Hero } from "@/components/home/hero"
import { Materials } from "@/components/home/materials"
import { Projects } from "@/components/home/projects"

export default function Home() {
  return (
    <main className="flex w-full flex-col gap-section pb-section">
      <Hero />
      <Materials />
      <Projects />
      <AboutUs />
    </main>
  )
}
