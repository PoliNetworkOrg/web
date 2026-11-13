import { findDocument } from "@/queries/documents"

type Context = { params: Promise<{ slug: string }> }

/**
 * Serves a catalog PDF from the site's own origin. PDF.js can only read cross-origin files the host allows (GitHub
 * release downloads don't), and browsers ignore `download` on cross-origin links. Only slugs in the catalog resolve,
 * so this never fetches an arbitrary URL.
 */
export async function GET(_request: Request, { params }: Context) {
  const { slug } = await params
  const document = await findDocument(slug)
  if (!document) return new Response("Documento non trovato", { status: 404 })

  const upstream = await fetch(document.source).catch(() => null)
  if (!upstream?.ok || !upstream.body) return new Response("Documento non disponibile", { status: 502 })

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${slug}.pdf"`,
      // The documents change rarely: browsers keep them an hour, shared caches a day
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
