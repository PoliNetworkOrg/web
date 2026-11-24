import { createFileRoute } from "@tanstack/react-router"
import { FiArrowLeft, FiDownload } from "react-icons/fi"
import { CardSplit } from "@/components/card-split"
import { CONTAINER } from "@/components/layout/page"
import { Link } from "@/components/link"
import { Button } from "@/components/ui/button"
import { pageMeta } from "@/lib/seo"
import { cn } from "@/lib/utils"
import { fetchGuidaMatricolaView } from "@/queries/functions"

export const Route = createFileRoute("/matricole/guida")({
  loader: () => fetchGuidaMatricolaView(),
  head: () => ({
    meta: pageMeta({
      title: "Guida della Matricola",
      description: "Controlla l'ultima versione disponibile e scarica il PDF.",
    }),
  }),
  component: GuidaMatricolaPage,
})

function GuidaMatricolaPage() {
  const guida = Route.useLoaderData()

  return (
    // Standalone page (no header or footer, see `HIDDEN_ROUTES`): the content stays centered on screen, with the
    // shared gutters. The vertical padding keeps it off the edges on short landscape screens.
    <main className={cn(CONTAINER, "flex min-h-svh flex-col items-center justify-center gap-10 py-16 sm:gap-12")}>
      {/* Without header and footer, this is the only way back into the site */}
      <Link
        href="/matricole"
        className="typo-body-medium flex w-fit items-center gap-2 rounded-sm text-blue-secondary underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-blue-secondary"
      >
        <FiArrowLeft aria-hidden className="size-4 shrink-0" /> Matricole
      </Link>
      {/* Not Hero: this page has no header, and Hero's spacing would push the download below the fold on phones */}
      <div className="flex flex-col items-center gap-4 text-center sm:gap-6">
        <h1 className="typo-display-fluid-extralarge text-balance pb-2 text-gradient-grey">Guida della Matricola</h1>
        <p className="typo-title-medium sm:typo-headline-small max-w-2xl text-balance">
          Controlla l&apos;ultima versione disponibile e scarica il PDF aggiornato.
        </p>
      </div>
      <CardSplit
        textPrimary={guida.version}
        textSecondary="Versione Attuale"
        textSecondarySmall={`Rilasciata il: ${guida.releasedOn}`}
        action={
          <Button asChild size="icon-lg" aria-label="Scarica l'ultima versione (PDF)">
            <a href={guida.url} download>
              <FiDownload />
            </a>
          </Button>
        }
      />
    </main>
  )
}
