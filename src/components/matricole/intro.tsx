import Image from "next/image"
import { FiBarChart2, FiMonitor } from "react-icons/fi"
import bigTealSvg from "@/assets/shapes/big-teal.svg"
import looperSvg from "@/assets/shapes/looper.svg"
import { Glass } from "@/components/glass"
import { GradientIcon, type GradientIconType } from "@/components/gradient-icon"
import { cn } from "@/lib/utils"

const resources = [
  {
    title: "Graduatorie",
    description: "Controlla i risultati storici e le soglie di accesso per i vari corsi di laurea",
    icon: FiBarChart2,
  },
  {
    title: "Progetto TOL",
    description: "Tutte le informazioni sul test di ingresso (TOL) e come prepararsi al meglio.",
    icon: FiMonitor,
  },
] as const

type ResourceCardProps = {
  title: string
  description: string
  icon: GradientIconType
  className?: string
}

function ResourceCard({ title, description, icon, className }: ResourceCardProps) {
  return (
    <Glass
      className={cn(
        "h-full overflow-hidden rounded-rectangles border-white/50 bg-background-blur p-0 text-card-foreground",
        className
      )}
    >
      <div className="flex min-h-50 flex-col items-start px-6 py-8 sm:px-8 sm:py-10 md:px-10">
        <GradientIcon icon={icon} className="h-8 w-8" />
        <h2 className="typo-headline-small mt-4 bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="typo-body-small mt-5 max-w-60 text-text-primary">{description}</p>
      </div>
    </Glass>
  )
}

function MatricoleBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute top-0 left-0 h-[248.3218vw] w-full">
        <Image
          src={bigTealSvg}
          alt=""
          aria-hidden
          priority
          className="absolute max-w-none select-none"
          style={{
            top: 0,
            left: "-26.0417%",
            width: "56.3657%",
            height: "22.6987%",
          }}
        />
        <Image
          src={bigTealSvg}
          alt=""
          aria-hidden
          priority
          className="absolute max-w-none select-none"
          style={{
            top: "-0.1165%",
            left: "66.7244%",
            width: "56.3657%",
            height: "22.6987%",
          }}
        />
        <div
          className="absolute flex items-center justify-center"
          style={{
            top: "-10.1142%",
            left: "-32.6389%",
            width: "111.0005%",
            height: "43.8377%",
          }}
        >
          <Image
            src={looperSvg}
            alt=""
            aria-hidden
            priority
            className="max-w-none rotate-[-12.93deg] select-none"
            style={{
              width: "83.9224%",
              height: "82.954%",
            }}
          />
        </div>
        <div
          className="absolute flex items-center justify-center"
          style={{
            top: "-12.6544%",
            left: "17.5347%",
            width: "125.2498%",
            height: "49.9899%",
          }}
        >
          <Image
            src={looperSvg}
            alt=""
            aria-hidden
            priority
            className="max-w-none rotate-[-151.01deg] select-none"
            style={{
              width: "74.3748%",
              height: "72.7469%",
            }}
          />
        </div>
      </div>
    </div>
  )
}

export function MatricoleIntro() {
  return (
    <section className="relative isolate flex min-h-screen w-full flex-col items-center overflow-hidden bg-background px-6 pt-40 pb-16 sm:px-10">
      <MatricoleBackground />
      <div className="relative z-10 mx-auto flex w-full max-w-275 flex-col items-center">
        <div className="flex w-full max-w-200 flex-col items-center gap-7 text-center">
          <h1 className="typo-display-small sm:typo-display-medium md:typo-display-large bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
            Matricole
          </h1>
          <p className="typo-title-medium w-full max-w-135 text-text-primary">
            Ecco una raccolta curata di risorse utili, guide e strumenti per supportare il tuo percorso.
          </p>
        </div>

        <div className="mt-16 grid w-full max-w-205 gap-4 md:grid-cols-2">
          {resources.map((resource) => (
            <ResourceCard key={resource.title} {...resource} />
          ))}
        </div>
      </div>
    </section>
  )
}
