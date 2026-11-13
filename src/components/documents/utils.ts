import type { DocumentItem } from "./types"

export function getDocumentViewerHref(document: DocumentItem) {
  return `/documents/view/${document.slug}`
}

/** Same-origin URL of the PDF: the viewer can read it without CORS and `download` saves it instead of navigating. */
export function getDocumentFileHref(document: DocumentItem) {
  return `/documents/file/${document.slug}`
}

export function getDocumentFileName(document: DocumentItem) {
  return `${document.slug}.pdf`
}
