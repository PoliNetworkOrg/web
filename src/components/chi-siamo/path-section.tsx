import { FiBook, FiClipboard, FiFileText, FiGift, FiUser, FiUserCheck } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { GradientIcon } from "@/components/gradient-icon"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import { cn } from "@/lib/utils"

const steps = [
  { title: "TOL", description: "Simulazioni, guide e consigli per affrontarlo al meglio.", icon: FiBook },
  { title: "Ammissione", description: "Graduatorie, scadenze e tutto ciò che serve per iniziare.", icon: FiClipboard },
  { title: "Primo anno", description: "Orientamento, gruppi, risorse e supporto tra studenti.", icon: FiUser },
  { title: "Esami", description: "Appunti, temi, consigli e strumenti per prepararti meglio.", icon: FiFileText },
  {
    title: "Scelta del percorso",
    description: "Informazioni chiare per decidere il tuo futuro al PoliMi.",
    icon: FiUserCheck,
  },
  { title: "Laurea", description: "Fino al traguardo, insieme.", icon: FiGift },
] as const

export function PathSection() {
  return (
    <section className={`${CONTAINER} flex flex-col gap-10 md:gap-14`}>
      <h2 className={SECTION_TITLE}>Il tuo percorso, sempre al tuo fianco</h2>

      <ol className="grid gap-10 lg:grid-cols-6 lg:gap-6">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={cn(
              "relative flex items-start gap-4 lg:flex-col lg:items-center lg:text-center",
              index < steps.length - 1 &&
                "after:-bottom-10 after:absolute after:top-21 after:left-10.25 after:w-0.5 after:bg-blue-primary/40 after:content-[''] lg:after:top-10.25 lg:after:bottom-auto lg:after:left-[calc(50%+2.625rem)] lg:after:h-0.5 lg:after:w-[calc(100%-3.75rem)]"
            )}
          >
            <Glass className="flex size-21 shrink-0 items-center justify-center rounded-rectangles border-white/50 bg-background-blur p-0">
              <GradientIcon icon={step.icon} className="size-14" />
            </Glass>
            <div className="flex flex-col gap-2 pt-2 lg:pt-0">
              <h3 className="typo-title-large text-balance bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent">
                {step.title}
              </h3>
              <p className="typo-body-medium">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className={`${SECTION_LEAD} max-w-215 lg:mx-auto lg:text-balance lg:text-center`}>
        Dalla prima simulazione del TOL fino alla laurea, ogni studente ha sempre{" "}
        <span className="text-blue-secondary">una risposta</span> a portata di mano e{" "}
        <span className="text-blue-secondary">qualcuno</span> a cui chiederla.
      </p>
    </section>
  )
}
