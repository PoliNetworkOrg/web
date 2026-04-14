import { FiUploadCloud } from "react-icons/fi"
import { CardIcon } from "@/components/card-icon"

// TODO da sostituire con dati veri
const collectionCards = [
  {
    title: "Contatti",
    description: "@lorenzocorallo @toto04_1 info@polinetwork.org",
    icon: FiUploadCloud,
    size: "sm",
    href: "#",
  },
  {
    title: "Requisiti dei progetti",
    description: `opensource
      utile alla community
      senza scopro di lucro`,
    icon: FiUploadCloud,
    size: "sm",
    href: "#",
  },
] as const

export function Upload() {
  return (
    <section className="mx-auto flex min-h-screen max-w-300 flex-row items-center justify-center gap-48 px-4">
      <div className="flex max-w-xs flex-col items-start gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="typo-display-medium">Hai un'idea?</h2>
          <p className="typo-headline-medium text-blue-primary">Proponila qui!</p>
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

      <div className="flex flex-col gap-12">
        <div className="grid gap-6">
          {/* TODO sostituire la card con la versione corretta */}
          {collectionCards.map((card) => (
            <CardIcon key={card.title} {...card} className="h-full" />
          ))}
        </div>
      </div>
    </section>
  )
}
