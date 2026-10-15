import Image from "next/image"
import Link from "next/link"
import { FiArrowDown, FiArrowRight, FiClipboard, FiUser, FiUserCheck, FiUsers } from "react-icons/fi"
import telegram from "@/assets/icons/telegram-gradient.svg"
import { CardMultipleIcons } from "@/components/card-multiple-icons"
import { Glass } from "@/components/glass"
import { GradientIcon } from "@/components/gradient-icon"
import { Button } from "@/components/ui/button"
import { chapters, milestones } from "./constants"

const milestoneIcons = [FiUser, FiUsers, FiUserCheck, FiUsers]

export function Timeline() {
  return (
    <section className="mx-auto flex w-full max-w-330 flex-col gap-12 px-6">
      <h2 className="typo-display-small 2xl:typo-display-large max-w-240 bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent 2xl:mb-6">
        Da un semplice gruppo
        <br className="hidden 2xl:block" /> a una rete costruita dagli studenti,
        <br className="hidden 2xl:block" /> <span className="text-blue-secondary">per gli studenti.</span>
      </h2>
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        {milestones.map((milestone, index) => (
          <li key={milestone.year} className="relative flex flex-col items-center gap-4 text-center">
            <Glass className="flex size-21 items-center justify-center rounded-rectangles">
              {milestone.year === "2017" ? (
                <Image src={telegram} alt="" width={55} height={50} />
              ) : (
                <GradientIcon icon={milestoneIcons[index] ?? FiUsers} className="size-14" />
              )}
            </Glass>
            {index < milestones.length - 1 && (
              <span
                aria-hidden
                className="absolute top-10 left-[calc(50%+42px)] hidden h-px w-[calc(100%-36px)] bg-blue-primary lg:block"
              />
            )}
            <h3 className="typo-headline-small bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent">
              {milestone.year}
            </h3>
            <p className={`typo-body-medium ${index === 0 ? "max-w-50" : "max-w-58"}`}>{milestone.description}</p>
          </li>
        ))}
      </ol>
      <div className="flex flex-col items-center gap-8 text-center">
        <p className="typo-headline-small max-w-125">
          Dieci anni di crescita, persone e progetti.
          <br />
          La nostra storia <span className="text-blue-secondary">continua, insieme a te.</span>
        </p>
        <Button asChild variant="primary">
          <Link href="#capitoli">
            Leggi la nostra storia completa <FiArrowDown aria-hidden />
          </Link>
        </Button>
      </div>
    </section>
  )
}

const chapterVisuals = [
  <div key="rete" className="flex w-full flex-wrap items-start justify-between gap-4">
    {[
      { icon: null, label: "Il primo gruppo" },
      { icon: FiUser, label: "I primi admin e volontari" },
      { icon: FiUserCheck, label: "Test su Informatica" },
      { icon: FiUsers, label: "Tutti i corsi" },
    ].map(({ icon, label }) => (
      <div key={label} className="flex max-w-25 flex-col items-center gap-4 text-center">
        <Glass className="flex size-18 items-center justify-center rounded-rectangles md:size-21">
          {icon ? (
            <GradientIcon icon={icon} className="size-12" />
          ) : (
            <Image src={telegram} alt="" width={55} height={50} />
          )}
        </Glass>
        <span className="typo-body-medium">{label}</span>
      </div>
    ))}
  </div>,
  <div
    key="spazio"
    className="grid w-full grid-cols-1 justify-items-center gap-6 min-[360px]:grid-cols-3 min-[360px]:gap-4"
  >
    {[
      { icon: FiClipboard, label: "Regole interne" },
      { icon: FiUserCheck, label: "Comunicazioni selezionate" },
      { icon: FiUsers, label: "Una community indipendente" },
    ].map(({ icon, label }) => (
      <div key={label} className="flex max-w-30 flex-col items-center gap-4 text-center">
        <Glass className="flex size-21 items-center justify-center rounded-rectangles">
          <GradientIcon icon={icon} className="size-14" />
        </Glass>
        <span className="typo-body-medium">{label}</span>
      </div>
    ))}
  </div>,
  <CardMultipleIcons
    key="consiglio"
    className="w-full justify-center rounded-rectangles [&>div>span]:text-base sm:[&>div>span]:text-2xl [&>div]:gap-2 [&>div]:px-4"
    icons={[
      <span key="persone" className="typo-body-small sm:typo-headline-small text-center">
        5<br />
        persone
      </span>,
      <FiArrowRight key="arrow1" aria-hidden />,
      <span key="rappresentanti" className="typo-body-small sm:typo-headline-small text-center">
        ~25
        <br />
        rappresentanti
      </span>,
      <FiArrowRight key="arrow2" aria-hidden />,
      <span key="composizioni" className="typo-body-small sm:typo-headline-small text-center">
        4<br />
        composizioni
      </span>,
    ]}
  />,
  <Glass
    key="team"
    className="grid w-full grid-cols-1 items-center gap-4 rounded-rectangles p-6 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:p-8"
  >
    <div>
      <h3 className="typo-body-large md:typo-headline-extrasmall mb-4">I primi dipartimenti</h3>
      <p className="typo-body-large md:typo-headline-extrasmall xl:typo-headline-small wrap-anywhere">
        Eventi
        <br />
        HR
        <br />
        IT
        <br />
        Social
        <br />
        Gestione
      </p>
    </div>
    <FiArrowRight aria-hidden className="rotate-90 justify-self-center sm:rotate-0" />
    <div>
      <h3 className="typo-body-large md:typo-headline-extrasmall mb-4">I team di oggi</h3>
      <p className="typo-body-large md:typo-headline-extrasmall xl:typo-headline-small wrap-anywhere">
        Tech
        <br />
        Design
        <br />
        People
        <br />
        Events
        <br />
        Communication
        <br />…
      </p>
    </div>
  </Glass>,
  <Glass
    key="associazione"
    className="grid w-full grid-cols-1 items-center gap-4 rounded-rectangles p-6 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:p-8"
  >
    <p className="typo-body-large md:typo-headline-extrasmall">
      Consiglio degli Admin
      <br />
      Garanti
      <br />
      Coordinamento
    </p>
    <FiArrowRight aria-hidden className="rotate-90 justify-self-center sm:rotate-0" />
    <p className="typo-body-large md:typo-headline-extrasmall">
      Consiglio Direttivo
      <br />
      Collegio dei Probiviri
      <br />
      Statuto e regolamenti
    </p>
  </Glass>,
  <Glass key="albo" className="w-full rounded-rectangles p-6 md:p-8">
    <dl className="typo-body-large md:typo-headline-extrasmall xl:typo-headline-small grid grid-cols-[auto_1fr] gap-x-5 gap-y-2">
      <dt>✓ APS-ETS</dt>
      <dd>Riconosciuto dallo Stato</dd>
      <dt>✓ RUNTS</dt>
      <dd>Iscritta come ETS</dd>
      <dt>Albo PoliMi</dt>
      <dd>Ancora da raggiungere</dd>
    </dl>
  </Glass>,
]

export function Chapters() {
  return (
    <section
      id="capitoli"
      aria-label="La nostra storia completa"
      className="mx-auto w-full max-w-330 scroll-mt-32 px-6"
    >
      <ol className="flex flex-col gap-20">
        {chapters.map((chapter, index) => (
          <li key={chapter.title} className="grid gap-10 xl:grid-cols-2 xl:items-center xl:gap-16">
            <div className="relative border-blue-primary/40 border-l pl-6 sm:pl-11">
              <span
                aria-hidden
                className="typo-headline-small md:typo-display-medium xl:-left-22 mb-4 block text-text-primary xl:absolute xl:top-0"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="typo-headline-medium md:typo-display-medium">{chapter.title}</h2>
              <h3 className="typo-headline-extrasmall md:typo-headline-small mt-3">{chapter.subtitle}</h3>
              <p className="typo-body-large md:typo-headline-extrasmall xl:typo-headline-small mt-5">
                {chapter.description}
              </p>
            </div>
            <div className="flex min-w-0 items-center justify-center xl:pl-12">{chapterVisuals[index]}</div>
          </li>
        ))}
      </ol>
    </section>
  )
}
