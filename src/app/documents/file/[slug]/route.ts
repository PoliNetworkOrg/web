import { findDocument } from "@/queries/documents"

type Context = { params: Promise<{ slug: string }> }

const UPSTREAM_TIMEOUT_MS = 15_000
const FORWARDED_HEADERS = ["etag", "last-modified"]

/**
 * Serves a catalog PDF from the site's own origin. PDF.js can only read cross-origin files the host allows (GitHub
 * release downloads don't), and browsers ignore `download` on cross-origin links. Only slugs in the catalog resolve,
 * so this never fetches an arbitrary URL.
 */
export async function GET(request: Request, { params }: Context) {
  const { slug } = await params
  const { document, backendUnavailable } = await findDocument(slug)
  if (!document) {
    return backendUnavailable
      ? new Response("Documenti temporaneamente non disponibili", {
          status: 503,
          headers: { "Retry-After": "60", "Cache-Control": "no-store" },
        })
      : new Response("Documento non trovato", { status: 404, headers: { "Cache-Control": "no-store" } })
  }

  // The timeout bounds only the wait for the upstream headers: the body then streams at the client's pace, and a
  // deadline on the whole transfer would truncate large PDFs on slow connections. A client that leaves cancels it.
  const timeout = new AbortController()
  const timer = setTimeout(
    () => timeout.abort(new DOMException("Upstream timeout", "TimeoutError")),
    UPSTREAM_TIMEOUT_MS
  )
  const upstream = await fetch(document.source, {
    cache: "no-store",
    signal: AbortSignal.any([timeout.signal, request.signal]),
  })
    .catch((error) => {
      console.error(`Failed to fetch document ${slug}`, error)
      return null
    })
    .finally(() => clearTimeout(timer))
  if (!upstream?.ok || !upstream.body) {
    if (upstream) console.error(`Document ${slug} answered ${upstream.status}`)
    return new Response("Documento non disponibile", { status: 502, headers: { "Cache-Control": "no-store" } })
  }

  // The latest file and even its version label can change after an admin deletes or replaces an upload.
  const headers = new Headers({
    "Content-Type": "application/pdf",
    "Content-Disposition": `inline; filename="${slug}.pdf"`,
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  })
  for (const name of FORWARDED_HEADERS) {
    const value = upstream.headers.get(name)
    if (value) headers.set(name, value)
  }
  // fetch decompresses encoded bodies: their original Content-Length no longer describes the streamed bytes.
  const length = upstream.headers.get("content-length")
  if (length && !upstream.headers.has("content-encoding")) headers.set("Content-Length", length)
  return new Response(upstream.body, { headers })
}
