import { CardIcon } from "@/components/card-icon"
import { resources } from "./constants"

export function MatricoleIntro() {
  return (
    <section className="flex w-full flex-col items-center px-6 pt-40 pb-32 sm:px-10 sm:pb-13">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        <div className="flex w-full max-w-200 flex-col items-center gap-6 text-center">
          <h1 className="typo-display-large md:typo-display-extralarge bg-linear-to-b from-text-primary to-text-secondary bg-clip-text py-8 text-transparent">
            Matricole
          </h1>
          <p className="typo-title-large md:typo-headline-small w-full text-text-primary">
            Ecco una raccolta curata di risorse utili, guide e strumenti per supportare il tuo percorso.
          </p>
        </div>

        <div className="mt-30 hidden w-full gap-6 sm:grid sm:grid-cols-2">
          {resources.map((resource) => (
            <CardIcon key={resource.title} {...resource} align="start" className="h-full min-h-50" size="compact" />
          ))}
        </div>
      </div>
    </section>
  )
}
