import type { Metadata } from "next"
import Image from "next/image"
import { BiCodeAlt, BiPalette } from "react-icons/bi"
import { FiSettings, FiSmile } from "react-icons/fi"
import { GoLaw } from "react-icons/go"
import groupPhoto from "@/assets/images/ringraziamenti.webp"
import { Glass } from "@/components/glass"
import { CONTAINER, SECTION_TITLE } from "@/components/layout/page"
import { PhotoShapes, type PhotoShapesLayout } from "@/components/shapes"
import { Hero } from "@/components/ui/hero"
import { cn } from "@/lib/utils"

const description =
  "PoliNetwork esiste grazie al tempo, alle idee e alle competenze di centinaia di persone che hanno scelto di contribuire"

export const metadata: Metadata = {
  title: "Ringraziamenti",
  description,
}

const content = cn(CONTAINER, "3xl:max-w-392")
const sectionTitle = cn(SECTION_TITLE, "max-sm:typo-headline-medium text-center sm:text-start")
const sectionCopy = "typo-body-large text-pretty lg:typo-headline-small"
const glassPanel = "rounded-rectangles border-white/50 bg-background-blur p-6 min-[400px]:p-10"
const accent = "text-blue-secondary dark:text-sky-300"
const introGradient = "bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent"

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

// Both Figma frames use this sample name. Replace the entries with confirmed credits before publishing.
const sampleName = "Mario Rossi"
const websiteCredits = [
  [
    { title: "Project manager", icon: FiSettings, credits: [{}] },
    { title: "Designer", icon: BiPalette, credits: [{ detail: "Design system" }, {}, {}, {}, {}, {}, {}, {}] },
  ],
  [
    {
      title: "Developer",
      icon: BiCodeAlt,
      credits: [{ detail: "Responsabile" }, { detail: "Backend" }, {}, {}, {}, {}],
    },
    { title: "Altri contributi", icon: FiSmile, credits: [{}, {}, {}, {}, {}, {}] },
  ],
] as const

const projectCredits = [
  "PoliAule",
  "Orario",
  "MyPoliFile",
  "MyPoliFile",
  "Design system",
  "PoliMi Schedule",
  "PoliMi Schedule",
  "PoliAuth & PoliDL",
  "Graduatorie",
  "Graduatorie",
  "The TOL Project",
  "The TOL Project",
  "Webex Downloader",
  "Design system",
  "Design system",
].map((detail) => ({ detail }))

function CreditList({
  credits,
  className,
  compact = false,
}: {
  credits: readonly { name?: string; detail?: string }[]
  className: string
  compact?: boolean
}) {
  return (
    <ul className={cn("grid list-disc gap-x-6 gap-y-3 pl-4", className)}>
      {credits.map(({ name = sampleName, detail }, index) => (
        <li
          // The mockup repeats the same name and projects across distinct slots.
          // biome-ignore lint/suspicious/noArrayIndexKey: the list is static
          key={index}
          className="min-w-0 pl-0.5 marker:text-blue-secondary dark:marker:text-sky-300"
        >
          <span className={cn("typo-title-large wrap-break-word block", compact && "max-lg:typo-label-extralarge")}>
            {name}
          </span>
          {detail && (
            <span
              className={cn(
                "typo-label-large wrap-break-word mt-0.5 block uppercase",
                compact && "max-lg:typo-label-medium",
                accent
              )}
            >
              {detail}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

export default function AcknowledgementsPage() {
  return (
    <main className="flex w-full flex-col 3xl:gap-75 gap-32 pb-24 md:gap-40 md:pb-32 xl:gap-60 xl:pb-37.5">
      <div className={cn(content, "pt-61.5 3xl:pb-8 pb-20 sm:pt-52 sm:pb-12 md:pt-57.5")}>
        <Hero
          title="A chi siamo grati"
          description={description}
          className={cn(
            "max-sm:[&>h1>span]:box-decoration-slice max-sm:[&>h1]:text-wrap",
            "max-[360px]:[&>h1]:typo-display-fluid-extralarge max-[360px]:[&>h1>span]:typo-display-fluid-extralarge",
            "sm:max-xl:[&>h1]:typo-display-fluid-extralarge sm:max-xl:[&>h1>span]:typo-display-fluid-extralarge"
          )}
          descriptionClassName="sm:bg-none sm:text-text-primary dark:text-text-primary"
        />
      </div>

      <section
        aria-label="Introduzione"
        className={cn(content, "grid items-center gap-6 lg:grid-cols-[720fr_663fr] lg:gap-14")}
      >
        <div className="typo-headline-small lg:typo-display-small flex flex-col gap-6 text-center lg:gap-8 lg:text-start">
          <p className={introGradient}>
            Dal 2016 a oggi, sono moltissime le persone che, in diversi modi, hanno fatto crescere PoliNetwork e reso la
            vita universitaria più semplice per gli studenti del PoliMi.
          </p>
          <p className={introGradient}>
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

      <section aria-labelledby="nuovo-sito" className={cn(content, "flex flex-col gap-6 max-sm:mt-28 lg:gap-12")}>
        <div className="flex flex-col gap-6">
          <h2 id="nuovo-sito" className={sectionTitle}>
            Realizzazione del nuovo sito web
          </h2>
          <p className={cn(sectionCopy, "max-w-220")}>
            Pubblicato a dicembre 2026, è frutto del lavoro di designer e sviluppatori che hanno reso le informazioni su
            PoliNetwork più accessibili
          </p>
        </div>
        <Glass className={cn(glassPanel, "grid gap-9 3xl:gap-x-24 md:grid-cols-2 md:gap-x-12")}>
          {websiteCredits.map((column) => (
            <div key={column[0].title} className="flex min-w-0 flex-col gap-9">
              {column.map(({ title, icon: Icon, credits }) => (
                <div key={title} className="flex flex-col gap-6">
                  <h3
                    className={cn(
                      "typo-headline-extrasmall lg:typo-headline-small flex items-center gap-2.5 uppercase",
                      accent
                    )}
                  >
                    <Icon className="size-5 shrink-0 lg:size-6" aria-hidden />
                    {title}
                  </h3>
                  <CreditList credits={credits} className="lg:grid-cols-2 xl:grid-cols-3" compact />
                </div>
              ))}
            </div>
          ))}
        </Glass>
      </section>

      <section aria-labelledby="progetti" className={cn(content, "flex flex-col gap-6 max-sm:mt-28 lg:gap-12")}>
        <div className="flex flex-col gap-6">
          <h2 id="progetti" className={sectionTitle}>
            I progetti di PoliNetwork
          </h2>
          <p className={cn(sectionCopy, "max-w-255")}>
            Siamo grati ai molti studenti che negli anni hanno dedicato il loro tempo libero alla realizzazione di
            strumenti open source utili a tutta la comunità
          </p>
        </div>
        <Glass className={glassPanel}>
          <CreditList
            credits={projectCredits}
            className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          />
        </Glass>
      </section>

      <section
        aria-labelledby="consulenza"
        className={cn(content, "grid items-center 3xl:gap-36 gap-6 lg:grid-cols-[46%_1fr] lg:gap-16")}
      >
        <div className="flex flex-col gap-6">
          <h2 id="consulenza" className={sectionTitle}>
            Consulenza aziendale
          </h2>
          <p className={sectionCopy}>
            Abbiamo il supporto di professionisti che ci offrono consulenza fiscale, contabile, societaria e del lavoro
          </p>
        </div>
        <Glass className={cn(glassPanel, "mx-auto w-fit lg:mx-0 lg:justify-self-end")}>
          <p className={cn("typo-title-large lg:typo-headline-medium flex items-center gap-5", accent)}>
            <GoLaw className="size-8 shrink-0 lg:size-11" aria-hidden />
            Studio Cappa-Pometto
          </p>
        </Glass>
      </section>
    </main>
  )
}
