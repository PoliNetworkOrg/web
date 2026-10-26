import { CardIcon } from "@/components/card-icon"
import { Hero } from "@/components/ui/hero"
import { resources } from "./constants"

export function MatricoleIntro() {
  return (
    <section className="page-container flex flex-col items-center gap-section pt-page-top">
      <Hero
        title="Matricole"
        description="Ecco una raccolta curata di risorse utili, guide e strumenti per supportare il tuo percorso."
      />

      <div className="hidden w-full gap-6 sm:grid sm:grid-cols-2">
        {resources.map((resource) => (
          <CardIcon key={resource.title} {...resource} align="start" className="h-full min-h-50" size="compact" />
        ))}
      </div>
    </section>
  )
}
