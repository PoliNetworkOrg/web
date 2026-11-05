"use client"

import dynamic from "next/dynamic"
import type { DocumentItem } from "./types"

const PdfViewer = dynamic(() => import("./pdf-viewer"), {
  ssr: false,
  loading: () => <output className="typo-body-large p-6">Caricamento del visualizzatore…</output>,
})

export function PdfViewerLoader({ document }: { document: DocumentItem }) {
  return <PdfViewer key={document.href} document={document} />
}
