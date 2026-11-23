import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PdfViewerLoader } from "@/components/documents/pdf-viewer-loader"
import { Glass } from "@/components/glass"
import { CONTAINER } from "@/components/layout/page"
import { Button } from "@/components/ui/button"
import { findDocument } from "@/queries/documents"

type Props = { params: Promise<{ slug: string }> }

// Uploaded from the admin dashboard: a new version or document shows up without a rebuild
export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { document } = await findDocument((await params).slug)
  // The outage page answers 200: keep it out of search results
  return { title: document?.title ?? "Documenti", robots: document ? undefined : { index: false } }
}

export default async function DocumentViewerPage({ params }: Props) {
  const { slug } = await params
  const { document, backendUnavailable } = await findDocument(slug)
  // A backend outage is not a missing document: say so and offer a retry instead of a 404
  if (!document && backendUnavailable) return <DocumentsUnavailable slug={slug} />
  if (!document) notFound()

  return (
    <main className={`${CONTAINER} pt-40 pb-6 sm:pb-10`}>
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
            <a href={`/documents/view/${encodeURIComponent(slug)}`}>Riprova</a>
          </Button>
          <Button asChild variant="glass">
            <Link href="/documents">Torna ai documenti</Link>
          </Button>
        </div>
      </Glass>
    </main>
  )
}
