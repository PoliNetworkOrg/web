import type { Metadata } from "next"
import { FiArrowRight } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Hero } from "@/components/ui/hero"

export const metadata: Metadata = {
  title: "Collabora con Noi",
  description:
    "Mettiamo la nostra infrastruttura e i nostri talenti a disposizione di chi ha buone idee per gli studenti del PoliMi",
}

export default function CollaboraPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-400 flex-col items-center justify-center gap-20 px-4 py-49 md:gap-39">
      <Hero
        title="Collabora con Noi"
        description="Mettiamo la nostra infrastruttura e i nostri talenti a disposizione di chi ha buone idee per gli studenti del PoliMi"
        gradientDescription
      />

      <div className="flex w-full flex-col gap-8 px-36 py-19">
        <div className="flex max-w-3xl flex-col gap-6">
          <h2 className="typo-display-large sm:typo-display-medium text-start">Chi siamo?</h2>

          <div className="flex flex-col gap-3 text-start">
            <p className="typo-title-large sm:typo-headline-small">
              PoliNetwork è l'infrastruttura di comunicazione studentesca del Politecnico di Milano.
            </p>
            <p className="typo-title-large sm:typo-headline-small">
              Gestiamo oltre 500 gruppi Telegram e WhatsApp, una presenza social in crescita e strumenti digitali usati
              ogni anno da decine di migliaia di studenti di ingegneria, architettura e design.
            </p>
            <p className="typo-title-large sm:typo-headline-small text-blue-secondary">
              Chi entra al PoliMi, prima o poi, incontra PoliNetwork.
            </p>
            <p className="typo-title-large sm:typo-headline-extrasmall">(e persino studenti di liceo o altri atenei)</p>
          </div>

          <Button variant="primary" size="lg" className="w-fit gap-2">
            Scopri la nostra storia
            <FiArrowRight />
          </Button>

        </div>

        <div></div>
      </div>
    </main>
  )
}
