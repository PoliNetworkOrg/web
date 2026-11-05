export type DocumentItem = {
  title: string
  description?: string
  href: string
}

export type DocumentCategory = {
  id: string
  title: string
  description: string
  documents: DocumentItem[]
}
