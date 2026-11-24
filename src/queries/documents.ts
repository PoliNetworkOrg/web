import { cache } from "react"
import type { DocumentCategory, DocumentItem } from "@/components/documents/types"
import { trpc } from "@/lib/backend"
/**
 * Only the documents published from the admin dashboard: nothing is hard-coded, so the page never lists a document
 * the association hasn't uploaded. `backendUnavailable` tells "nothing published" apart from "couldn't ask".
 */
export type Catalog = { categories: DocumentCategory[]; backendUnavailable: boolean }

// Share the catalog between the viewer's metadata and page during a server render. The file route is a separate request.
const loadCatalog = cache(async (): Promise<Catalog> => {
  try {
    const catalog = await trpc.web.documents.getCatalog.query()
    const categories = catalog.map((category) => ({
      id: category.slug,
      title: category.title,
      description: category.description,
      documents: category.documents.map((document) => ({
        slug: document.slug,
        title: document.title,
        description: document.description,
        source: document.latest.file,
        version: document.latest.version,
        date: document.latest.date,
      })),
    }))
    return { categories, backendUnavailable: false }
  } catch (error) {
    console.error("Failed to fetch documents", error)
    return { categories: [], backendUnavailable: true }
  }
})

export async function getDocumentCatalog(): Promise<Catalog> {
  return loadCatalog()
}

/** `backendUnavailable` tells a missing document apart from one the backend couldn't be asked about. */
export async function findDocument(slug: string): Promise<{ document?: DocumentItem; backendUnavailable: boolean }> {
  const { categories, backendUnavailable } = await loadCatalog()
  const document = categories.flatMap((category) => category.documents).find((item) => item.slug === slug)
  return { document, backendUnavailable }
}
