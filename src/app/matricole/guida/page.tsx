import type { Metadata } from "next"
import { FiDownload } from "react-icons/fi"
import { CardSplit } from "@/components/card-split"
import { CONTAINER } from "@/components/layout/page"
import { Button } from "@/components/ui/button"
import { Hero } from "@/components/ui/hero"
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
      <Hero
        title="Guida della Matricola"
        description="Controlla l'ultima versione disponibile e scarica il PDF aggiornato."
        descriptionClassName="text-balance"
      />
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
