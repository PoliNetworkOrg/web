import { cache } from "react"
import type { DocumentCategory, DocumentItem } from "@/components/documents/types"
import { trpc } from "@/lib/backend"
import { memberPrivacyHref } from "@/lib/documents"

const RAW = "https://raw.githubusercontent.com/PoliNetworkOrg"

/**
 * Shown while the backend has no documents (they are uploaded from the admin dashboard) or can't be reached, like the
 * Guida della Matricola's fallback: the official PDFs published on PoliNetworkOrg's public repositories.
 * Not listed: the internal regulations (their repository is private) and the financial statements (not published).
 */
const FALLBACK_CATALOG: DocumentCategory[] = [
  {
    id: "associazione",
    title: "Associazione",
    description: "Chi siamo e su quali principi ci fondiamo.",
    documents: [
      {
        slug: "cos-e-polinetwork",
        title: "Cos’è PoliNetwork",
        description: "Una panoramica dell’associazione e delle sue attività.",
        source: `${RAW}/documents/main/exported/PoliNetwork.pdf`,
      },
      {
        slug: "statuto",
        title: "Statuto dell’associazione",
        description: "Finalità, organizzazione e principi associativi.",
        source: `${RAW}/Statuto/main/full.pdf`,
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy e Informative",
    description: "Come trattiamo e proteggiamo i dati personali.",
    documents: [
      {
        slug: "privacy-policy",
        title: "Privacy Policy",
        description: "Come PoliNetwork tratta i dati personali di chi usa i suoi servizi.",
        source: `${RAW}/documents/main/exported/privacy-policy-principale.pdf`,
      },
      {
        slug: "privacy-soci",
        title: "Associati e candidati soci",
        description: "Il trattamento dei dati personali di chi è socio o richiede di diventarlo.",
        source: memberPrivacyHref,
      },
      {
        slug: "privacy-volontari",
        title: "Admin e volontari",
        description: "Il trattamento dei dati personali di admin e volontari.",
        source: `${RAW}/documents/main/exported/PrivacyPolicy_Volontari.pdf`,
      },
      {
        slug: "privacy-recruitment",
        title: "Candidati al recruitment",
        description: "Il trattamento dei dati personali di chi si candida per entrare in un team.",
        source: `${RAW}/documents/main/exported/informativa-privacy-recruitment.pdf`,
      },
    ],
  },
]

type Catalog = { categories: DocumentCategory[]; backendUnavailable: boolean }

/**
 * Backend documents first; fallback entries fill in only the slugs the backend doesn't have yet, so publishing one
 * document from admin doesn't hide the others. Once every fallback document has been uploaded, delete the fallback.
 */
function withFallback(backend: DocumentCategory[]): DocumentCategory[] {
  const published = new Set(backend.flatMap((category) => category.documents.map((document) => document.slug)))
  const merged = backend.map((category) => ({ ...category, documents: [...category.documents] }))
  for (const fallback of FALLBACK_CATALOG) {
    const missing = fallback.documents.filter((document) => !published.has(document.slug))
    if (missing.length === 0) continue
    // Admin may give the same category another slug: match its title too, so it doesn't show up twice
    const target = merged.find(
      (category) => category.id === fallback.id || category.title.trim().toLowerCase() === fallback.title.toLowerCase()
    )
    if (target) target.documents.push(...missing)
    else merged.push({ ...fallback, documents: missing })
  }
  return merged
}

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
    return { categories: withFallback(categories), backendUnavailable: false }
  } catch (error) {
    console.error("Failed to fetch documents", error)
    return { categories: FALLBACK_CATALOG, backendUnavailable: true }
  }
})

export async function getDocumentCategories(): Promise<DocumentCategory[]> {
  return (await loadCatalog()).categories
}

/** `backendUnavailable` tells a missing document apart from one the backend couldn't be asked about. */
export async function findDocument(slug: string): Promise<{ document?: DocumentItem; backendUnavailable: boolean }> {
  const { categories, backendUnavailable } = await loadCatalog()
  const document = categories.flatMap((category) => category.documents).find((item) => item.slug === slug)
  return { document, backendUnavailable }
}
