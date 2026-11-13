import type { DocumentItem } from "./types"

export function getDocumentViewerHref(document: DocumentItem) {
  return `/documents/view/${document.slug}`
}

/** Same-origin URL of the PDF: the viewer can read it without CORS and `download` saves it instead of navigating. */
export function getDocumentFileHref(document: DocumentItem) {
  const path = `/documents/file/${document.slug}`
  // A different version also makes PDF.js reload when navigating to an updated document.
  return document.version ? `${path}?v=${encodeURIComponent(document.version)}` : path
}

/** HTML id of a category's section: prefixed so a category slug can't collide with other ids on the page. */
export function getCategoryAnchor(id: string) {
  return `documenti-categoria-${id}`
}

export function getCategoryHeadingId(id: string) {
  return `documenti-titolo-${id}`
}

/** Bound both canvas dimensions to keep large or unusually tall pages within mobile canvas budgets. */
export function getPdfPixelRatio(width: number, height: number, devicePixelRatio: number) {
  return Math.min(devicePixelRatio, 2, 4096 / Math.max(width, height))
}

export function getDocumentFileName(document: DocumentItem) {
  return `${document.slug}.pdf`
}
