import { FiMail } from "react-icons/fi"
import { CardCaption } from "../card-caption"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "../layout/page"

const cards = [
  {
    title: "Contatti",
    caption: (
      <a
        href="mailto:info@polinetwork.org"
        className="typo-body-large flex w-fit items-center gap-2 underline-offset-4 hover:underline focus-visible:underline"
      >
        <FiMail aria-hidden className="shrink-0" /> info@polinetwork.org
      </a>
    ),
  },
  {
    title: "Requisiti",
    caption: (
      <ul className="typo-body-large list-disc pl-5">
        <li>open source</li>
        <li>utile alla community</li>
        <li>senza scopo di lucro</li>
      </ul>
    ),
  },
]

export function Upload() {
  return (
    <section id="proponi" aria-labelledby="proponi-title" className={`${CONTAINER} scroll-mt-32`}>
      {/* Figma keeps this block narrow and centred: the text and its two reference cards side by side */}
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-center lg:gap-16">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 id="proponi-title" className={SECTION_TITLE}>
              Hai un'idea?
            </h2>
            <p className="typo-headline-small text-blue-secondary">Proponila qui!</p>
          </div>
          <p className={SECTION_LEAD}>
            Qui puoi proporre nuovi progetti o suggerire migliorie al sito. Il team di PoliNetwork può aiutarti a
            sviluppare la tua idea e, se rispetta i requisiti, pubblicarla qui.
          </p>
          <p className="typo-body-large">
            Dopo l'invio riceverai una risposta dai nostri admin con le istruzioni per proseguire.
          </p>
          <p className="typo-body-small text-slate-600">
            I diritti dei progetti rimangono tutti dei rispettivi progettisti, PoliNetwork non si assume responsabilità.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          {cards.map((card) => (
            <CardCaption key={card.title} {...card} className="h-auto w-full p-6" />
          ))}
        </div>
      </div>
    </section>
  )
}
