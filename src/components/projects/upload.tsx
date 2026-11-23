import { FiMail } from "react-icons/fi"
import { CardCaption } from "../card-caption"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "../layout/page"

const EMAIL = "it@polinetwork.org"

const cards = [
  {
    title: "Contatti",
    caption: (
      <a
        href={`mailto:${EMAIL}`}
        className="typo-body-large flex w-fit items-center gap-2 whitespace-nowrap underline-offset-4 hover:underline focus-visible:underline"
      >
        <FiMail aria-hidden className="shrink-0" /> {EMAIL}
      </a>
    ),
  },
  {
    title: "Requisiti",
    caption: (
      <p className="typo-body-large text-pretty">
        Il progetto deve essere open source, utile alla community e senza scopo di lucro.
      </p>
    ),
  },
]

export function Upload() {
  return (
    <section id="proponi" aria-labelledby="proponi-title" className={`${CONTAINER} scroll-mt-32`}>
      {/* The text above, the two cards side by side below it from sm */}
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <h2 id="proponi-title" className={SECTION_TITLE}>
            Hai un'idea?
          </h2>
          <p className={`${SECTION_LEAD} max-w-2xl`}>
            Proponi un nuovo progetto o un miglioramento al sito: il team di PoliNetwork ti aiuta a svilupparlo e, se
            rispetta i requisiti, lo pubblica qui.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {cards.map((card) => (
            <CardCaption key={card.title} {...card} className="h-auto w-full p-6" />
          ))}
        </div>
      </div>
    </section>
  )
}
