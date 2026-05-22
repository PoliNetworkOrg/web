import { FiBarChart2, FiMonitor } from "react-icons/fi"
import { CardIcon } from "@/components/card-icon"

const resources = [
  {
    title: "Graduatorie",
    description: "Risultati storici e soglie di accesso per i vari corsi di laurea.",
    icon: FiBarChart2,
  },
  {
    title: "Progetto TOL",
    description: "Informazioni sul test di ingresso (TOL) e su come prepararsi al meglio.",
    icon: FiMonitor,
  },
] as const

export function MatricoleIntro() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center px-6 pt-40 pb-16 sm:px-10">
      <div className="mx-auto flex w-full max-w-275 flex-col items-center">
        <div className="flex w-full max-w-200 flex-col items-center gap-6 text-center">
          <h1 className="typo-display-large md:typo-display-extralarge bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
            Matricole
          </h1>
          <p className="typo-title-large md:typo-headline-small w-full max-w-135 text-text-primary">
            Ecco una raccolta curata di risorse utili, guide e strumenti per supportare il tuo percorso.
          </p>
        </div>

        <div className="mt-30 grid w-full max-w-205 gap-6 md:grid-cols-2">
          {resources.map((resource) => (
            <CardIcon key={resource.title} {...resource} align="start" className="h-full min-h-50" size="compact" />
          ))}
        </div>
      </div>
    </section>
  )
}
