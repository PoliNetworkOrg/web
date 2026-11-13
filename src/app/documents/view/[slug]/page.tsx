import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PdfViewerLoader } from "@/components/documents/pdf-viewer-loader"
import { CONTAINER } from "@/components/layout/page"
import { findDocument } from "@/queries/documents"

type Props = { params: Promise<{ slug: string }> }

// Uploaded from the admin dashboard: a new version or document shows up without a rebuild
export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const document = await findDocument((await params).slug)
  return { title: document?.title ?? "Documento non trovato" }
}

export default async function DocumentViewerPage({ params }: Props) {
  const document = await findDocument((await params).slug)
  if (!document) notFound()

  return (
    <main className={`${CONTAINER} pt-40 pb-6 sm:pb-10`}>
      <PdfViewerLoader document={document} />
    </main>
  )
}
