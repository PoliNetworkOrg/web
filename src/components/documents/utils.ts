import type { DocumentItem } from "./types"

export function getDocumentSlug(document: DocumentItem) {
  return document.href.slice(document.href.lastIndexOf("/") + 1).replace(/\.pdf$/, "")
}

export function getDocumentViewerHref(document: DocumentItem) {
  return `/documents/view/${getDocumentSlug(document)}`
}
