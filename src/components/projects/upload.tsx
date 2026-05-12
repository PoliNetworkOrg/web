import { FiMail, FiSend } from "react-icons/fi"
import { CardCaption } from "../card-caption"

const cards = [
  {
    title: "Contatti",
    caption: (
      <div className="flex flex-col gap-2">
        <span className="flex items-center gap-2">
          <FiSend /> @lorenzocorallo
        </span>
        <span className="flex items-center gap-2">
          <FiSend /> @toto04_1
        </span>
        <span className="flex items-center gap-2">
          <FiMail /> info@polinetwork.org
        </span>
      </div>
    ),
  },
  {
    title: "Requisiti",
    caption: (
      <ul className="list-disc pl-4">
        <li>opensource</li>
        <li>utile alla community</li>
        <li>senza scopo di lucro</li>
      </ul>
    ),
  },
]

export function Upload() {
  return (
    <section className="mx-auto flex min-h-screen max-w-300 flex-col items-center justify-center gap-12 px-4 py-16 md:flex-row md:gap-24 md:px-12 lg:gap-48">
      <div className="flex max-w-xs flex-col items-start gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="typo-headline-medium md:typo-display-medium">Hai un'idea?</h2>
          <p className="typo-title-large md:typo-headline-medium text-blue-primary">Proponila qui!</p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="typo-body-large">
            Qui puoi proporre nuovi progetti o suggerire migliorie al sito. Il team di PoliNetwork può aiutarti a
            sviluppare la tua idea e, se rispetta i requisiti, pubblicarla qui.
          </p>
          <p className="typo-body-large">
            Dopo l'invio riceverai una risposta dai nostri admin con le istruzioni per proseguire.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="typo-body-medium text-text-secondary">
            I diritti dei progetti rimangono tutti dei rispettivi progettisti, PoliNetwork non si assume responsabilità.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {cards.map((card) => (
          <CardCaption key={card.title} {...card} className="h-auto" />
        ))}
      </div>
    </section>
  )
}
