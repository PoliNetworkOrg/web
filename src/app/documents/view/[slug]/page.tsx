import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { mockDocumentCategories } from "@/components/documents/mock-data"
import { PdfViewerLoader } from "@/components/documents/pdf-viewer-loader"
import { getDocumentSlug } from "@/components/documents/utils"

const documents = mockDocumentCategories.flatMap((category) => category.documents)

type Props = { params: Promise<{ slug: string }> }

function findDocument(slug: string) {
  return documents.find((document) => getDocumentSlug(document) === slug)
}

export function generateStaticParams() {
  return documents.map((document) => ({ slug: getDocumentSlug(document) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const document = findDocument((await params).slug)
  return { title: document?.title ?? "Documento non trovato" }
}

export default async function DocumentViewerPage({ params }: Props) {
  const document = findDocument((await params).slug)
  if (!document) notFound()

  return (
    <main className="mx-auto w-full max-w-360 px-4 pt-40 pb-6 text-text-primary sm:px-10 sm:pb-10">
      <PdfViewerLoader document={document} />
    </main>
  )
}
