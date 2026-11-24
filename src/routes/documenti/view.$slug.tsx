import { createFileRoute } from "@tanstack/react-router"
import { PdfViewerLoader } from "@/components/documents/pdf-viewer-loader"
import { Glass } from "@/components/glass"
import { CONTAINER } from "@/components/layout/page"
import { Link } from "@/components/link"
import { Button } from "@/components/ui/button"
import { missingPage, pageMeta } from "@/lib/seo"
import { fetchDocument } from "@/queries/functions"

export const Route = createFileRoute("/documenti/view/$slug")({
  // Uploaded from the admin dashboard: a new version or document shows up without a rebuild
  loader: async ({ params }) => {
    const { document, backendUnavailable } = await fetchDocument({ data: { slug: params.slug } })
    // A backend outage is not a missing document: the page says so and offers a retry instead of a 404
    if (!document && !backendUnavailable) throw missingPage({ title: "Documenti" })
    return { document }
  },
  // The outage page answers 200: keep it out of search results
  head: ({ loaderData }) => ({
    meta: loaderData
      ? pageMeta({ title: loaderData.document?.title ?? "Documenti", noindex: !loaderData.document })
      : [],
  }),
  component: DocumentViewerPage,
})

function DocumentViewerPage() {
  const { slug } = Route.useParams()
  const { document } = Route.useLoaderData()
  if (!document) return <DocumentsUnavailable slug={slug} />

  return (
    // On phones the viewer takes nearly the whole screen: 12px gutters and less room above, so the page is readable
    <main className={`${CONTAINER} pt-28 pb-6 max-sm:px-3 sm:pt-40 sm:pb-10`}>
      <PdfViewerLoader document={document} />
    </main>
  )
}

function DocumentsUnavailable({ slug }: { slug: string }) {
  return (
    <main className={`${CONTAINER} pt-40 pb-6 sm:pb-10`}>
      <Glass className="flex flex-col items-start gap-6 rounded-rectangles border-white/50 bg-background-blur p-6 sm:p-10">
        <h1 className="typo-headline-small sm:typo-headline-medium hyphens-auto break-words text-text-primary">
          Documento temporaneamente non disponibile
        </h1>
        <p className="typo-body-large text-text-secondary">
          Non riusciamo a raggiungere l’archivio dei documenti in questo momento. Riprova tra qualche minuto.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="primary">
            <a href={`/documenti/view/${encodeURIComponent(slug)}`}>Riprova</a>
          </Button>
          <Button asChild variant="glass">
            <Link href="/documenti">Torna ai documenti</Link>
          </Button>
        </div>
      </Glass>
    </main>
  )
}
