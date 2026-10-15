import { AboutUs } from "@/components/home/about-us"
import { Hero } from "@/components/home/hero"
import { Materials } from "@/components/home/materials"
import { Projects } from "@/components/home/projects"
import { HomeMaterialsShapes, HomeProjectsShapes } from "@/components/home/shapes"

export default function Home() {
  return (
    <main className="flex w-full flex-col gap-section pb-section">
      <Hero />
      <div className="relative">
        <HomeMaterialsShapes />
        <Materials />
      </div>
      <div className="relative">
        <HomeProjectsShapes />
        <Projects />
      </div>
      <AboutUs />
    </main>
  )
}
