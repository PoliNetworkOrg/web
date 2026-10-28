import type { Metadata } from "next"
import { FiDownload } from "react-icons/fi"
import { CardSplit } from "@/components/card-split"
import { CONTAINER } from "@/components/layout/page"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getLatestGuidaMatricola } from "@/queries/guida-matricola"

export const metadata: Metadata = {
  title: "Guida della Matricola",
  description: "Controlla l'ultima versione disponibile e scarica il PDF.",
}

export const dynamic = "force-dynamic"

const FALLBACK_GUIDA = {
  version: "1.0",
  date: "2026-07-14",
  url: "/guida-della-matricola.pdf",
}

export default async function GuidaMatricolaPage() {
  const guida = (await getLatestGuidaMatricola()) ?? FALLBACK_GUIDA
  const formattedDate = new Intl.DateTimeFormat("it-IT", { dateStyle: "long" }).format(new Date(guida.date))

  return (
    // Standalone page (no header or footer, see `HIDDEN_ROUTES`): the content stays centered on screen, with the
    // shared gutters. The vertical padding keeps it off the edges on short landscape screens.
    <main className={cn(CONTAINER, "flex min-h-svh flex-col items-center justify-center gap-10 py-16 sm:gap-12")}>
      <div className="flex flex-col items-center gap-4 text-center sm:gap-6">
        {/* Fluid size: the title used to jump from 45px to 120px at 1024px, leaving tablets with a small title */}
        <h1 className="typo-display-fluid-extralarge text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text pb-2 text-transparent">
          Guida della Matricola
        </h1>
        <p className="typo-title-medium sm:typo-headline-small max-w-2xl text-balance">
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
