import { ClientOnly } from "@tanstack/react-router"
import { lazy, Suspense } from "react"
import type { DocumentItem } from "./types"

// PDF.js needs the browser: the viewer is neither rendered on the server nor part of the page's first script
const PdfViewer = lazy(() => import("./pdf-viewer"))

const loading = <output className="typo-body-large p-6">Caricamento del visualizzatore…</output>

export function PdfViewerLoader({ document }: { document: DocumentItem }) {
  return (
    <ClientOnly fallback={loading}>
      <Suspense fallback={loading}>
        <PdfViewer key={`${document.slug}:${document.version ?? ""}`} document={document} />
      </Suspense>
    </ClientOnly>
  )
}
