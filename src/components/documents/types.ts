export type DocumentItem = {
  /** Stable id in the site's URLs: `/documents/view/<slug>` and `/documents/file/<slug>`. */
  slug: string
  title: string
  description?: string | null
  /** Where the latest PDF lives: the backend's blob storage, or GitHub for the fallback catalog. */
  source: string
  /** Latest version, when the document comes from the backend. */
  version?: string
  /** ISO date (YYYY-MM-DD) of the latest version. */
  date?: string
}

export type DocumentCategory = {
  id: string
  title: string
  description: string
  documents: DocumentItem[]
}
