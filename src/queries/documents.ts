"use server"

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

export async function getDocumentCategories(): Promise<DocumentCategory[]> {
  try {
    const catalog = await trpc.web.documents.getCatalog.query()
    if (catalog.length === 0) return FALLBACK_CATALOG

    return catalog.map((category) => ({
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
  } catch (error) {
    console.error("Failed to fetch documents", error)
    return FALLBACK_CATALOG
  }
}

export async function findDocument(slug: string): Promise<DocumentItem | undefined> {
  const categories = await getDocumentCategories()
  return categories.flatMap((category) => category.documents).find((document) => document.slug === slug)
}
