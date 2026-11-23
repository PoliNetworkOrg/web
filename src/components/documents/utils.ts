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

/**
 * Index of the category being read, from the sections' top edges in viewport order: the last one whose top has passed
 * the reading line, or the last category once the page can't scroll further (a short last section never reaches the
 * line). -1 before the first category.
 */
export function getActiveCategory(tops: number[], readingLine: number, atBottom: boolean) {
  if (tops.length === 0) return -1
  if (atBottom) return tops.length - 1
  let active = -1
  for (const [index, top] of tops.entries()) if (top <= readingLine) active = index
  return active
}

/** Bound both canvas dimensions to keep large or unusually tall pages within mobile canvas budgets. */
export function getPdfPixelRatio(width: number, height: number, devicePixelRatio: number) {
  return Math.min(devicePixelRatio, 2, 4096 / Math.max(width, height))
}

export function getDocumentFileName(document: DocumentItem) {
  return `${document.slug}.pdf`
}
