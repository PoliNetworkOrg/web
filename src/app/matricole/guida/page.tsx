import type { Metadata } from "next"
import { FiDownload } from "react-icons/fi"
import { CardSplit } from "@/components/card-split"
import { Button } from "@/components/ui/button"
import { getLatestGuidaMatricola } from "@/queries/guida-matricola"

export const metadata: Metadata = {
  title: "Guida della Matricola",
  description: "Controlla l'ultima versione disponibile e scarica il PDF.",
}

const FALLBACK_GUIDA = {
  version: "1.0",
  date: "2025-09-13",
  url: "/guida-della-matricola.pdf",
}

export default async function GuidaMatricolaPage() {
  const guida = (await getLatestGuidaMatricola()) ?? FALLBACK_GUIDA
  const formattedDate = new Intl.DateTimeFormat("it-IT", { dateStyle: "long" }).format(
    new Date(guida.date),
  )

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-500 flex-col items-center justify-center gap-10 px-4 py-49">
      <div className="mx-12 flex flex-col items-center gap-6">
        <h2 className="typo-display-large lg:typo-display-extralarge w-fit bg-linear-to-b from-text-primary to-text-secondary bg-clip-text py-4 text-center text-transparent lg:leading-33">
          Guida della Matricola
        </h2>
        <p className="typo-title-large lg:typo-headline-small max-w-4xl text-center">
          Controlla l&apos;ultima versione disponibile e scarica il PDF aggiornato.
        </p>
      </div>
      <CardSplit
        textPrimary={guida.version}
        textSecondary="Versione Attuale"
        textSecondarySmall={`Rilasciata il: ${formattedDate}`}
        action={
          <Button asChild size="icon-lg" aria-label="Scarica l'Ultima Versione">
            <a href={guida.url} download>
              <FiDownload />
            </a>
          </Button>
        }
      />
    </main>
  )
}
