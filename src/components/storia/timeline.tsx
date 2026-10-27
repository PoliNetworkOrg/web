import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { FiArrowDown, FiArrowRight, FiCheck, FiClipboard, FiClock, FiUser, FiUserCheck, FiUsers } from "react-icons/fi"
import telegram from "@/assets/icons/telegram-gradient.svg"
import { GradientIcon, type GradientIconType } from "@/components/gradient-icon"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CONTAINER, chapters, milestones } from "./constants"

const milestoneLinks = ["#capitolo-1", "#capitolo-1", "#capitolo-5", "#direttivi"]

const milestoneIcons = [FiUser, telegram.src, FiUserCheck, FiUsers]

/** The small icon tile Figma uses for timeline nodes and diagram steps. */
function IconTile({ icon, className }: { icon: GradientIconType | string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-rectangles border border-white/50 bg-background-blur backdrop-blur-md",
        className
      )}
    >
      {typeof icon === "string" ? (
        <Image src={icon} alt="" width={28} height={28} className="size-1/2" />
      ) : (
        <GradientIcon icon={icon} className="size-1/2" />
      )}
    </span>
  )
}

export function Timeline() {
  return (
    <section className={`${CONTAINER} flex flex-col gap-12 sm:gap-16`}>
      <h2 className="typo-headline-medium sm:typo-display-medium max-w-240 text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
        Da un semplice gruppo a una rete costruita dagli studenti,{" "}
        <span className="text-blue-secondary">per gli studenti.</span>
      </h2>

      {/* Nodes on a line: vertical below lg, horizontal from lg (Figma) */}
      <ol className="grid lg:grid-cols-4">
        {milestones.map((milestone, index) => (
          <li
            key={milestone.year}
            className={cn(
              "relative grid min-w-0 grid-cols-[3.5rem_minmax(0,1fr)] gap-x-5 pb-10 last:pb-0 lg:flex lg:flex-col lg:items-center lg:gap-4 lg:px-4 lg:pb-0 lg:text-center",
              // Connector to the next node
              "not-last:before:absolute not-last:before:top-16 not-last:before:bottom-2 not-last:before:left-7 not-last:before:w-px not-last:before:bg-blue-primary/30",
              "lg:not-last:before:top-7 lg:not-last:before:bottom-auto lg:not-last:before:left-[calc(50%+2.25rem)] lg:not-last:before:h-px lg:not-last:before:w-[calc(100%-4.5rem)]"
            )}
          >
            <IconTile icon={milestoneIcons[index] ?? FiUsers} className="row-span-2 size-14" />
            <Link
              href={milestoneLinks[index] ?? "#capitoli"}
              className="typo-headline-small w-fit self-center text-blue-secondary underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none lg:self-auto"
            >
              {milestone.year}
            </Link>
            <p className="typo-body-medium col-start-2 mt-1 max-w-80 text-pretty lg:mt-0 lg:max-w-60">
              {milestone.description}
            </p>
          </li>
        ))}
      </ol>

      <div className="flex flex-col items-center gap-6 text-center">
        <p className="typo-body-large sm:typo-headline-extrasmall max-w-145 text-balance">
          Dieci anni di crescita, persone e progetti. La nostra storia{" "}
          <span className="text-blue-secondary">continua, insieme a te.</span>
        </p>
        <Button asChild variant="primary" size="lg">
          <Link href="#capitoli">
            Leggi la nostra storia completa <FiArrowDown aria-hidden />
          </Link>
        </Button>
      </div>
    </section>
  )
}

function Arrow({ className }: { className?: string }) {
  return <FiArrowRight aria-hidden className={cn("size-4 shrink-0 text-blue-primary", className)} />
}

/** A left-to-right sequence of steps, joined by arrows. */
function Steps({ items }: { items: { label: string; icon?: GradientIconType | string; value?: string }[] }) {
  return (
    <ol className="flex w-full max-w-120 items-start">
      {items.map((item, index) => (
        <li key={item.label} className="flex min-w-0 flex-1 items-start">
          {index > 0 && <Arrow className="mt-5 sm:mt-6" />}
          <div className="flex min-w-0 flex-1 flex-col items-center gap-2 px-1 text-center">
            {item.icon && <IconTile icon={item.icon} className="size-11 sm:size-14" />}
            {item.value && <span className="typo-headline-medium text-blue-secondary">{item.value}</span>}
            <span className="typo-body-small sm:typo-body-medium text-balance">{item.label}</span>
          </div>
        </li>
      ))}
    </ol>
  )
}

/** Two columns read as "before → after". */
function BeforeAfter({ before, after }: { before: { title: string; items: string[] }; after: typeof before }) {
  return (
    <div className="grid w-full max-w-120 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-x-4 sm:gap-x-6">
      {[before, after].map((column, index) => (
        <div key={column.title} className={cn("flex min-w-0 flex-col gap-2", index === 1 && "col-start-3")}>
          <p className="typo-title-medium text-blue-secondary">{column.title}</p>
          <ul className="typo-body-medium sm:typo-body-large flex flex-col gap-1">
            {column.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
      <Arrow className="col-start-2 row-start-1 mt-1" />
    </div>
  )
}

const chapterVisuals: ReactNode[] = [
  <Steps
    key="rete"
    items={[
      { icon: telegram.src, label: "Il primo gruppo" },
      { icon: FiUser, label: "I primi admin e volontari" },
      { icon: FiUserCheck, label: "Test su Informatica" },
      { icon: FiUsers, label: "Tutti i corsi" },
    ]}
  />,
  <Steps
    key="spazio"
    items={[
      { icon: FiClipboard, label: "Regole interne" },
      { icon: FiUserCheck, label: "Comunicazioni selezionate" },
      { icon: FiUsers, label: "Una community indipendente" },
    ]}
  />,
  <Steps
    key="consiglio"
    items={[
      { value: "5", label: "persone" },
      { value: "~25", label: "rappresentanti" },
      { value: "4", label: "composizioni" },
    ]}
  />,
  <BeforeAfter
    key="team"
    before={{ title: "I primi dipartimenti", items: ["Eventi", "HR", "IT", "Social", "Gestione"] }}
    after={{ title: "I team di oggi", items: ["Tech", "Design", "People", "Events", "Communication", "…"] }}
  />,
  <BeforeAfter
    key="associazione"
    before={{ title: "Prima", items: ["Consiglio degli Admin", "Garanti", "Coordinamento"] }}
    after={{ title: "Dal 2022", items: ["Consiglio Direttivo", "Collegio dei Probiviri", "Statuto e regolamenti"] }}
  />,
  <ul key="albo" className="grid w-full max-w-120 grid-cols-[auto_auto_minmax(0,1fr)] items-center gap-x-3 gap-y-3">
    {[
      { title: "APS-ETS", status: "Riconosciuto dallo Stato", done: true },
      { title: "RUNTS", status: "Iscritta come ETS", done: true },
      { title: "Albo PoliMi", status: "Ancora da raggiungere", done: false },
    ].map((item) => (
      <li key={item.title} className="contents">
        {item.done ? (
          <FiCheck aria-label="Raggiunto" className="size-5 text-blue-secondary" />
        ) : (
          <FiClock aria-label="Non ancora raggiunto" className="size-5 text-text-secondary" />
        )}
        <span className="typo-title-medium">{item.title}</span>
        <span className="typo-body-medium sm:typo-body-large text-text-secondary">{item.status}</span>
      </li>
    ))}
  </ul>,
]

export function Chapters() {
  return (
    <section id="capitoli" aria-label="La nostra storia completa" className={`${CONTAINER} scroll-mt-36`}>
      <ol>
        {chapters.map((chapter, index) => (
          <li
            id={`capitolo-${index + 1}`}
            key={chapter.title}
            // A single vertical rule runs between the numerals and the text, across every chapter (Figma)
            className="relative grid scroll-mt-36 grid-cols-[2.5rem_minmax(0,1fr)] gap-x-6 pb-16 before:absolute before:inset-y-0 before:left-[calc(2.5rem+0.75rem)] before:w-px before:bg-blue-primary/30 last:pb-0 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-10 sm:pb-24 sm:before:left-[calc(3.5rem+1.25rem)] xl:grid-cols-[3.5rem_minmax(0,7fr)_minmax(0,5fr)] xl:gap-x-16 xl:before:left-[calc(3.5rem+2rem)]"
          >
            <span aria-hidden className="typo-display-small text-blue-secondary tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex min-w-0 flex-col gap-3">
              <h2 className="typo-headline-medium lg:typo-display-small text-balance">{chapter.title}</h2>
              <p className="typo-body-large sm:typo-headline-extrasmall text-pretty text-blue-secondary">
                {chapter.subtitle}
              </p>
              <p className="typo-body-large sm:typo-headline-extrasmall mt-2 max-w-170 text-pretty">
                {chapter.description}
              </p>
            </div>
            <div className="col-start-2 mt-10 flex min-w-0 xl:col-start-3 xl:mt-0 xl:items-center xl:justify-center">
              {chapterVisuals[index]}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
