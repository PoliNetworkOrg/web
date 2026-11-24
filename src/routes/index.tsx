import { createFileRoute } from "@tanstack/react-router"
import { AboutUs } from "@/components/home/about-us"
import { Hero } from "@/components/home/hero"
import { Materials } from "@/components/home/materials"
import { Projects } from "@/components/home/projects"
import { fetchFeaturedProjects } from "@/queries/functions"

export const Route = createFileRoute("/")({
  // The featured projects come from the backend at request time, like /progetti
  loader: () => fetchFeaturedProjects(),
  component: Home,
})

function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Materials />
      <Projects featured={Route.useLoaderData()} />
      <AboutUs />
    </main>
  )
}
