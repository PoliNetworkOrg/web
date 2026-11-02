import { AboutUs } from "@/components/home/about-us"
import { Hero } from "@/components/home/hero"
import { Materials } from "@/components/home/materials"
import { Projects } from "@/components/home/projects"

// The featured projects come from the backend at request time, like /projects
export const dynamic = "force-dynamic"

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Materials />
      <Projects />
      <AboutUs />
    </main>
  )
}
