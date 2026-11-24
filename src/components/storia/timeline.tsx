import type { ReactNode } from "react"
import { FiCheck, FiClipboard, FiClock, FiUser, FiUserCheck, FiUsers } from "react-icons/fi"
import telegram from "@/assets/icons/telegram-gradient.svg?img"
import { FillLine, ScrollFillLine } from "@/components/fill-line"
import { Glass } from "@/components/glass"
import { GradientIcon, type GradientIconType } from "@/components/gradient-icon"
import { Image } from "@/components/image"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import { cn } from "@/lib/utils"
import { chapters, milestones } from "./constants"

/** The glass icon tile of the timelines, the same as the steps of "Il tuo percorso" on /chi-siamo. */
function IconTile({ icon, className }: { icon: GradientIconType | string; className?: string }) {
  return (
    <Glass aria-hidden className={cn("flex shrink-0 items-center justify-center rounded-rectangles p-0", className)}>
      {typeof icon === "string" ? (
        <Image src={icon} alt="" width={56} height={56} className="size-2/3" />
      ) : (
        <GradientIcon icon={icon} className="size-2/3" />
      )}
    </Glass>
  )
}

/** The timelines' lines are 4px `FillLine`s, light blue until they fill with blue from start to end. */

export function Timeline() {
  return (
    <section className={`${CONTAINER} flex flex-col gap-8 md:gap-10`}>
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className={SECTION_TITLE}>Il nostro percorso</h2>
        <p className={cn(SECTION_LEAD, "max-w-200 text-balance")}>
          Da un semplice gruppo a una rete costruita dagli studenti, per gli studenti.
        </p>
      </div>

      {/* Nodes on a line, as on /chi-siamo: down on phones, across from lg */}
      <ol className="mx-auto grid w-full max-w-105 gap-10 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-6">
        {milestones.map((milestone, index) => (
          <li
            key={milestone.year}
            className="relative flex items-start gap-4 lg:flex-col lg:items-center lg:text-center"
          >
            {index < milestones.length - 1 && (
              // Fills toward the next milestone, one line after the other across the row
              <FillLine
                direction="down-then-across"
                step={index}
                steps={milestones.length - 1}
                className="-bottom-10 absolute top-21 left-10 w-1 lg:top-10 lg:bottom-auto lg:left-[calc(50%+2.625rem)] lg:h-1 lg:w-[calc(100%-3.75rem)]"
              />
            )}
            <IconTile icon={milestone.icon} className="size-21" />
            <div className="flex flex-col gap-2 pt-2 lg:pt-0">
              <h3 className="typo-title-large bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent">
                {milestone.year}
              </h3>
              <p className="typo-body-medium max-w-80 text-pretty lg:max-w-60">{milestone.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

/** The card beside each chapter: the same glass as the site's other cards. */
function VisualCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Glass className={cn("flex w-full max-w-130 items-center justify-center rounded-rectangles p-6 sm:p-8", className)}>
      {children}
    </Glass>
  )
}

/** A left-to-right sequence of steps, joined by lines. A step shows an icon or a figure, both on a glass tile. */
function Steps({ items }: { items: { label: string; icon?: GradientIconType | string; value?: string }[] }) {
  return (
    // Down on phones, each label beside its tile (four ~55px columns would break the words); across from sm. On phones
    // the tiles are all 56px wide, figures included, so the labels line up
    <ol className="flex w-full flex-col gap-6 sm:flex-row sm:items-start sm:gap-0">
      {items.map((item, index) => (
        <li key={item.label} className="relative flex min-w-0 items-center gap-4 sm:flex-1 sm:flex-col sm:gap-2">
          {index > 0 && (
            // From the previous tile to this one, between them rather than taking room from the labels: down the
            // tiles' middle on phones, across their middle from sm
            <FillLine
              direction="down-then-across-sm"
              step={index - 1}
              steps={items.length - 1}
              className="absolute bottom-[calc(100%+0.25rem)] left-[calc(1.75rem-2px)] h-4 w-1 sm:top-7 sm:right-[calc(50%+2.5rem)] sm:bottom-auto sm:left-[calc(-50%+2.5rem)] sm:h-1 sm:w-auto"
            />
          )}
          {item.icon ? (
            <IconTile icon={item.icon} className="size-14 sm:size-15" />
          ) : (
            <Glass className="typo-title-large sm:typo-headline-small flex size-14 shrink-0 items-center justify-center rounded-rectangles bg-white/60 px-3 py-0 text-blue-secondary sm:h-15 sm:w-auto sm:min-w-15">
              {item.value}
            </Glass>
          )}
          {/* max-w-full keeps a long word ("rappresentanti") inside its column, where it can hyphenate */}
          <span className="typo-body-medium min-w-0 max-w-full hyphens-auto text-pretty break-words sm:px-1 sm:text-center">
            {item.label}
          </span>
        </li>
      ))}
    </ol>
  )
}

/** Two columns read as "before → after", split by a line. */
function BeforeAfter({ before, after }: { before: { title: string; items: string[] }; after: typeof before }) {
  return (
    <div className="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-x-4 sm:gap-x-6">
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
      <FillLine direction="down" className="col-start-2 row-start-1 h-full w-1" />
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
    // The teams as they are named on /team
    after={{ title: "I team di oggi", items: ["IT", "Design & Marketing", "HR", "Events & Partnership"] }}
  />,
  <BeforeAfter
    key="associazione"
    before={{ title: "Prima", items: ["Consiglio degli Admin", "Garanti", "Coordinamento"] }}
    after={{ title: "Dal 2022", items: ["Consiglio Direttivo", "Collegio dei Probiviri", "Statuto e regolamenti"] }}
  />,
  <ul key="albo" className="grid w-full grid-cols-[auto_auto_minmax(0,1fr)] items-center gap-x-3 gap-y-3">
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
            className="relative grid scroll-mt-36 grid-cols-[3.5rem_minmax(0,1fr)] gap-x-6 pb-16 last:pb-0 sm:gap-x-10 sm:pb-24 xl:grid-cols-[3.5rem_minmax(0,7fr)_minmax(0,5fr)] xl:gap-x-16"
          >
            {/* The line runs down from this chapter's number to the next one's */}
            {index < chapters.length - 1 && (
              <ScrollFillLine className="absolute top-16 bottom-2 left-[calc(1.75rem-2px)] w-1" />
            )}
            {/* The chapter's number in a round glass badge, sitting on the line */}
            <Glass
              aria-hidden
              className="typo-title-large flex size-14 items-center justify-center rounded-full border-white bg-white/70 p-0 text-blue-secondary tabular-nums"
            >
              {String(index + 1).padStart(2, "0")}
            </Glass>
            <div className="flex min-w-0 flex-col gap-3 pt-2.5">
              <h2 className="typo-headline-medium lg:typo-display-small text-balance">{chapter.title}</h2>
              <p className={cn(SECTION_LEAD, "text-blue-secondary")}>{chapter.subtitle}</p>
              <p className={cn(SECTION_LEAD, "mt-2 max-w-170")}>{chapter.description}</p>
            </div>
            <div className="col-start-2 mt-10 flex min-w-0 xl:col-start-3 xl:mt-0 xl:items-center xl:justify-center">
              <VisualCard>{chapterVisuals[index]}</VisualCard>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
