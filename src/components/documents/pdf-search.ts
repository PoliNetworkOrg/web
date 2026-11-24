function escapeHtml(text: string) {
  return text.replace(
    /[&<>"']/g,
    (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character
  )
}

// React-PDF inserts this string as HTML, so PDF text and search terms must be escaped.
export function highlightPdfText(text: string, query: string) {
  if (!query) return escapeHtml(text)
  const expression = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi")
  let result = ""
  let offset = 0
  for (const match of text.matchAll(expression)) {
    result += `${escapeHtml(text.slice(offset, match.index))}<mark>${escapeHtml(match[0])}</mark>`
    offset = match.index + match[0].length
  }
  return result + escapeHtml(text.slice(offset))
}
