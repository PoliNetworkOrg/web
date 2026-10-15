import Link from "next/link"
import {
  FiArrowDown,
  FiCheckCircle,
  FiClipboard,
  FiClock,
  FiLayers,
  FiUser,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi"
import telegram from "@/assets/icons/telegram-gradient.svg"
import { CardCaption } from "@/components/card-caption"
import { CardIcon } from "@/components/card-icon"
import { Glass } from "@/components/glass"
import { Button } from "@/components/ui/button"
import { chapters, milestones } from "./constants"

const milestoneLinks = ["#capitolo-1", "#capitolo-1", "#capitolo-5", "#direttivi"]

const milestoneIcons = [FiUser, telegram.src, FiUserCheck, FiUsers]

const staggeredCards =
  "grid w-full grid-cols-12 gap-4 [&>div]:col-span-10 sm:[&>div]:col-span-8 [&>div:nth-child(2)]:col-start-2 sm:[&>div:nth-child(2)]:col-start-3 [&>div:nth-child(3)]:col-start-3 sm:[&>div:nth-child(3)]:col-start-5"

export function Timeline() {
  return (
    <section className="mx-auto flex w-full max-w-330 flex-col gap-10 px-6 sm:gap-12">
      <h2 className="typo-headline-medium sm:typo-display-medium max-w-240 text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
        Da un semplice gruppo a una rete costruita dagli studenti,{" "}
        <span className="text-blue-secondary">per gli studenti.</span>
      </h2>
      <ol className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {milestones.map((milestone, index) => (
          <li key={milestone.year} className="min-w-0">
            <CardIcon
              title={milestone.year}
              description={milestone.description}
              icon={milestoneIcons[index] ?? FiUsers}
              size="compact"
              align="start"
              href={milestoneLinks[index]}
              hoverEffect
              className="motion-safe:hover:-translate-y-1 h-full transition-transform"
            />
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

const chapterVisuals = [
  <div key="rete" className="grid w-full grid-cols-2 gap-4">
    {[
      { icon: telegram.src, title: "Il primo gruppo" },
      { icon: FiUser, title: "I primi admin e volontari" },
      { icon: FiUserCheck, title: "Test su Informatica" },
      { icon: FiUsers, title: "Tutti i corsi" },
    ].map((item) => (
      <CardIcon key={item.title} {...item} size="xs" className="h-full [&_h3]:text-balance" />
    ))}
  </div>,
  <div key="spazio" className={staggeredCards}>
    {[
      { icon: FiClipboard, title: "Regole interne" },
      { icon: FiUserCheck, title: "Comunicazioni selezionate" },
      { icon: FiUsers, title: "Una community indipendente" },
    ].map((item) => (
      <CardIcon key={item.title} {...item} size="inline-sm" align="inline" className="[&_h3]:text-balance" />
    ))}
  </div>,
  <div key="consiglio" className={staggeredCards}>
    {[
      { title: "5", caption: "persone", icon: FiUser },
      { title: "~25", caption: "rappresentanti", icon: FiUsers },
      { title: "4", caption: "composizioni", icon: FiLayers },
    ].map((item) => (
      <CardCaption key={item.title} {...item} className="h-full w-full p-4 sm:p-6" />
    ))}
  </div>,
  <div key="team" className={staggeredCards}>
    <CardIcon
      title="I primi dipartimenti"
      description="Eventi · HR · IT · Social · Gestione"
      icon={FiLayers}
      size="inline-sm"
      align="inline"
      className="[&_h3]:text-balance"
    />
    <CardIcon
      title="I team di oggi"
      description="Tech · Design · People · Events · Communication · …"
      icon={FiUsers}
      size="inline-sm"
      align="inline"
      className="[&_h3]:text-balance"
    />
  </div>,
  <div key="associazione" className={staggeredCards}>
    <CardIcon
      title="Prima"
      description="Consiglio degli Admin · Garanti · Coordinamento"
      icon={FiUsers}
      size="inline-sm"
      align="inline"
    />
    <CardIcon
      title="Dal 2022"
      description="Consiglio Direttivo · Collegio dei Probiviri · Statuto e regolamenti"
      icon={FiUserCheck}
      size="inline-sm"
      align="inline"
    />
  </div>,
  <div key="albo" className={staggeredCards}>
    <CardIcon
      title="APS-ETS"
      description="Riconosciuto dallo Stato"
      icon={FiCheckCircle}
      size="inline-sm"
      align="inline"
    />
    <CardIcon title="RUNTS" description="Iscritta come ETS" icon={FiCheckCircle} size="inline-sm" align="inline" />
    <CardIcon title="Albo PoliMi" description="Ancora da raggiungere" icon={FiClock} size="inline-sm" align="inline" />
  </div>,
]

export function Chapters() {
  return (
    <section
      id="capitoli"
      aria-label="La nostra storia completa"
      className="mx-auto w-full max-w-330 scroll-mt-36 px-6"
    >
      <ol className="relative flex flex-col gap-16 before:pointer-events-none before:absolute before:inset-y-5 before:left-5 before:hidden before:w-px before:bg-blue-primary/20 sm:gap-24 xl:before:block">
        {chapters.map((chapter, index) => (
          <li
            id={`capitolo-${index + 1}`}
            key={chapter.title}
            className="grid scroll-mt-36 gap-8 xl:grid-cols-2 xl:items-center xl:gap-16"
          >
            <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-start gap-4 sm:gap-x-6">
              <Glass
                aria-hidden
                className="typo-label-large relative z-10 flex size-10 shrink-0 items-center justify-center rounded-rectangles border-white/50 bg-background p-0 text-blue-secondary"
              >
                {String(index + 1).padStart(2, "0")}
              </Glass>
              <h2 className="typo-title-large sm:typo-headline-medium lg:typo-display-small text-balance">
                {chapter.title}
              </h2>
              <p className="typo-body-large sm:typo-headline-extrasmall col-span-2 text-pretty text-blue-secondary sm:col-span-1 sm:col-start-2">
                {chapter.subtitle}
              </p>
              <p className="typo-body-large sm:typo-headline-extrasmall col-span-2 text-pretty sm:col-span-1 sm:col-start-2">
                {chapter.description}
              </p>
            </div>
            <div className="flex min-w-0 items-center justify-center">{chapterVisuals[index]}</div>
          </li>
        ))}
      </ol>
    </section>
  )
}
