import type { Metadata } from "next"
import Image from "next/image"
import type { IconType } from "react-icons"
import { BiCodeAlt, BiPalette } from "react-icons/bi"
import { FiSettings, FiSmile, FiUsers } from "react-icons/fi"
import { GoLaw } from "react-icons/go"
import { LuMegaphone } from "react-icons/lu"
import groupPhoto from "@/assets/images/ringraziamenti.webp"
import { Glass } from "@/components/glass"
import { CONTAINER, PAGE_HERO, PAGE_MAIN, SECTION_LEAD, SECTION_STACK, SECTION_TITLE } from "@/components/layout/page"
import { PhotoShapes, type PhotoShapesLayout } from "@/components/shapes"
import { Hero } from "@/components/ui/hero"
import { cn } from "@/lib/utils"
import { getAcknowledgements } from "@/queries/acknowledgements"
import type { ApiOutput } from "@/types"

const description =
  "PoliNetwork esiste grazie al tempo, alle idee e alle competenze di centinaia di persone che hanno scelto di contribuire"

export const metadata: Metadata = {
  title: "Ringraziamenti",
  description,
}

// The credits are edited from the admin dashboard (Web › Riconoscimenti), so each request reads the latest ones.
export const dynamic = "force-dynamic"

const sectionTitle = cn(SECTION_TITLE, "text-center sm:text-start")
const sectionLead = cn(SECTION_LEAD, "text-center max-sm:mx-auto sm:text-start")
const glassPanel = "rounded-rectangles border-white/50 bg-background-blur p-6 min-[400px]:p-10"
const accent = "text-blue-secondary dark:text-sky-300"

const photoShapes: PhotoShapesLayout = {
  width: 663,
  height: 351,
  shapes: [
    { variant: "small-blue", x: 606, y: 289, w: 354, h: 354 },
    {
      variant: "looper",
      x: 341,
      y: 282,
      w: 778,
      h: 754,
      matrix: [Math.SQRT1_2, -Math.SQRT1_2, Math.SQRT1_2, Math.SQRT1_2],
    },
  ],
}

type Acknowledgements = ApiOutput["web"]["acknowledgements"]["getAll"]
type Credit = Acknowledgements["projects"][number]

/** The backend's role group icons, drawn as in the Figma frames. */
const groupIcons = {
  settings: FiSettings,
  palette: BiPalette,
  code: BiCodeAlt,
  smile: FiSmile,
  users: FiUsers,
  megaphone: LuMegaphone,
} satisfies Record<Acknowledgements["website"][number]["icon"], IconType>

/** Splits the groups into the two columns of the panel, the first one taking the extra group. */
function inColumns<T>(groups: T[]) {
  const half = Math.ceil(groups.length / 2)
  return [groups.slice(0, half), groups.slice(half)].filter((column) => column.length > 0)
}

function CreditList({ credits, className }: { credits: readonly Credit[]; className: string }) {
  return (
    <ul className={cn("grid list-disc gap-x-6 gap-y-4 pl-4", className)}>
      {credits.map(({ id, name, detail }) => (
        <li key={id} className="min-w-0 pl-0.5 marker:text-blue-secondary dark:marker:text-sky-300">
          <span className="typo-title-medium wrap-break-word block">{name}</span>
          {detail && (
            <span className={cn("typo-label-medium wrap-break-word mt-0.5 block uppercase", accent)}>{detail}</span>
          )}
        </li>
      ))}
    </ul>
  )
}

export default async function AcknowledgementsPage() {
  const acknowledgements = await getAcknowledgements()
  // A group or a section without people is not shown.
  const websiteGroups = acknowledgements.website.filter((group) => group.entries.length > 0)
  const projectCredits = acknowledgements.projects

  return (
    <main className={cn(PAGE_MAIN, "md:gap-40 xl:gap-60")}>
      <section className={cn(CONTAINER, PAGE_HERO)}>
        <Hero title="Ringraziamenti" description={description} />
      </section>

      <section
        aria-label="Introduzione"
        className={cn(CONTAINER, "grid items-center gap-10 lg:grid-cols-[720fr_663fr] lg:gap-16")}
      >
        <div className={cn(SECTION_LEAD, "flex flex-col gap-4 text-center lg:text-start")}>
          <p>
            Dal 2016 a oggi, sono moltissime le persone che, in diversi modi, hanno fatto crescere PoliNetwork e reso la
            vita universitaria più semplice per gli studenti del PoliMi.
          </p>
          <p>
            Qui trovi i loro nomi e ciò che hanno fatto,
            <span className={cn("block", accent)}>
              è il nostro modo <br className="sm:hidden" />
              di dire grazie
            </span>
          </p>
        </div>
        <div className="relative isolate mx-auto aspect-[663/351] w-full max-w-83 sm:max-w-166 lg:max-w-none">
          <Image
            src={groupPhoto}
            alt="Foto di gruppo di PoliNetwork"
            fill
            sizes="(min-width: 1440px) 663px, (min-width: 1024px) 45vw, (min-width: 640px) 664px, 332px"
            className="rounded-images lg:rounded-rectangles"
          />
          <PhotoShapes mobile={photoShapes} desktop={photoShapes} />
        </div>
      </section>

      {websiteGroups.length > 0 && (
        <section aria-labelledby="nuovo-sito" className={SECTION_STACK}>
          <div className="flex flex-col gap-6">
            <h2 id="nuovo-sito" className={sectionTitle}>
              Realizzazione del nuovo sito web
            </h2>
            <p className={cn(sectionLead, "max-w-200")}>
              Pubblicato a dicembre 2026, è frutto del lavoro di designer e sviluppatori che hanno reso le informazioni
              su PoliNetwork più accessibili
            </p>
          </div>
          <Glass className={cn(glassPanel, "grid gap-8 md:grid-cols-2 md:gap-x-12")}>
            {inColumns(websiteGroups).map((column) => (
              <div key={column[0]?.id} className="flex min-w-0 flex-col gap-8">
                {column.map(({ id, title, icon, entries }) => {
                  const Icon = groupIcons[icon] ?? FiSmile
                  return (
                    <div key={id} className="flex flex-col gap-4">
                      <h3 className={cn("typo-title-large flex items-center gap-2.5 uppercase", accent)}>
                        <Icon className="size-5 shrink-0" aria-hidden />
                        {title}
                      </h3>
                      <CreditList credits={entries} className="grid-cols-2 xl:grid-cols-3" />
                    </div>
                  )
                })}
              </div>
            ))}
          </Glass>
        </section>
      )}

      {projectCredits.length > 0 && (
        <section aria-labelledby="progetti" className={SECTION_STACK}>
          <div className="flex flex-col gap-6">
            <h2 id="progetti" className={sectionTitle}>
              I progetti di PoliNetwork
            </h2>
            <p className={cn(sectionLead, "max-w-200")}>
              Siamo grati ai molti studenti che negli anni hanno dedicato il loro tempo libero alla realizzazione di
              strumenti open source utili a tutta la comunità
            </p>
          </div>
          <Glass className={glassPanel}>
            <CreditList credits={projectCredits} className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" />
          </Glass>
        </section>
      )}

      <section
        aria-labelledby="consulenza"
        className={cn(CONTAINER, "grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16")}
      >
        <div className="flex flex-col gap-6">
          <h2 id="consulenza" className={sectionTitle}>
            Consulenza aziendale
          </h2>
          <p className={cn(sectionLead, "max-w-150")}>
            Abbiamo il supporto di professionisti che ci offrono consulenza fiscale, contabile, societaria e del lavoro
          </p>
        </div>
        <Glass className={cn(glassPanel, "mx-auto w-fit lg:mx-0 lg:justify-self-end")}>
          <p className={cn("typo-title-large flex items-center gap-4", accent)}>
            <GoLaw className="size-8 shrink-0" aria-hidden />
            Studio Cappa-Pometto
          </p>
        </Glass>
      </section>
    </main>
  )
}
