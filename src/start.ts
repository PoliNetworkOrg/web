import { createHash } from "node:crypto"
import { Readable } from "node:stream"
import { constants, createGzip, gzipSync } from "node:zlib"
import { createMiddleware, createStart } from "@tanstack/react-start"
import { STATIC_PAGE_HEADERS } from "@/lib/seo"

// The pages were renamed in Italian: the old English URLs (shared links, bookmarks) go to the new ones
const RENAMED: Record<string, string> = {
  about: "struttura",
  associations: "associazioni",
  contact: "contatti",
  documents: "documenti",
  faqs: "faq",
  groups: "gruppi",
  guides: "guide",
  join: "unisciti",
  projects: "progetti",
}

/**
 * One URL per page. `/team/` and `//team` are `/team`, and a page's old English name is its Italian one, with whatever
 * follows it (`/projects/3?x=1` is `/progetti/3?x=1`): each answers with a permanent redirect, so links and search
 * engines settle on a single address.
 */
const canonicalPath = createMiddleware().server(({ request, next }) => {
  const url = new URL(request.url)
  const segments = url.pathname.split("/").filter(Boolean)
  const renamed = RENAMED[segments[0]?.toLowerCase() ?? ""]
  if (renamed) segments[0] = renamed
  const path = `/${segments.join("/")}`
  if (path === url.pathname) return next()
  const location = `${path}${url.search}`
  // `Refresh` and the body are for clients that don't follow a 308
  return new Response(location, { status: 308, headers: { Location: location, Refresh: `0;url=${location}` } })
})

/**
 * Pages are read with GET. The only requests that send something are the calls to server functions and the
 * problem report form posted without JavaScript; any other method is refused instead of being answered with a page.
 */
const pageMethods = createMiddleware().server(({ request, pathname, next }) => {
  if (request.method === "GET" || request.method === "HEAD") return next()
  if (request.method === "POST" && (pathname.startsWith("/_serverFn/") || pathname === "/segnala-problema"))
    return next()
  return new Response("Method Not Allowed", { status: 405, headers: { Allow: "GET, HEAD" } })
})

const COMPRESSIBLE = /^(text\/html|application\/(json|x-ndjson)|text\/x-)/

/**
 * Compresses what the server renders: pages, and the data for navigations between them. The files in
 * `.output/public` are compressed once at build time instead. Each chunk is flushed as it is written, so a page that
 * streams still reaches the browser piece by piece.
 */
function compressed(request: Request, response: Response) {
  if (
    !response.body ||
    request.method === "HEAD" ||
    response.headers.has("Content-Encoding") ||
    !COMPRESSIBLE.test(response.headers.get("Content-Type") ?? "") ||
    !acceptsGzip(request)
  )
    return response

  const headers = new Headers(response.headers)
  headers.set("Content-Encoding", "gzip")
  headers.append("Vary", "Accept-Encoding")
  headers.delete("Content-Length")
  const gzip = Readable.fromWeb(response.body as import("node:stream/web").ReadableStream).pipe(
    createGzip({ flush: constants.Z_SYNC_FLUSH })
  )
  return new Response(Readable.toWeb(gzip) as ReadableStream, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

const acceptsGzip = (request: Request) => /\bgzip\b/.test(request.headers.get("Accept-Encoding") ?? "")

type StaticPage = { html: Uint8Array<ArrayBuffer>; gzip: Uint8Array<ArrayBuffer>; etag: string; headers: Headers }

/**
 * The pages that are the same for everyone until the next deploy (see `STATIC_PAGE_HEADERS`), by path. Each is
 * rendered once, on its first request, and kept with its `ETag`: later requests cost no rendering, and a browser that
 * already has the page is told so with a 304 instead of receiving it again.
 */
const staticPages = new Map<string, StaticPage>()

function serveStatic(request: Request, page: StaticPage) {
  const headers = new Headers(page.headers)
  headers.set("ETag", page.etag)
  headers.append("Vary", "Accept-Encoding")
  if (request.headers.get("If-None-Match") === page.etag) return new Response(null, { status: 304, headers })
  const gzip = acceptsGzip(request)
  if (gzip) headers.set("Content-Encoding", "gzip")
  const body = gzip ? page.gzip : page.html
  headers.set("Content-Length", String(body.byteLength))
  return new Response(request.method === "HEAD" ? null : body, { headers })
}

const delivery = createMiddleware().server(async ({ request, pathname, next }) => {
  const readOnly = request.method === "GET" || request.method === "HEAD"
  const known = readOnly ? staticPages.get(pathname) : undefined
  if (known) return serveStatic(request, known)

  const result = await next()
  const { response } = result
  if (
    readOnly &&
    response.status === 200 &&
    response.body &&
    response.headers.get("Cache-Control") === STATIC_PAGE_HEADERS["Cache-Control"]
  ) {
    const html = new Uint8Array(await response.arrayBuffer())
    const headers = new Headers(response.headers)
    headers.delete("Content-Length")
    const page: StaticPage = {
      html,
      gzip: new Uint8Array(gzipSync(html)),
      etag: `"${createHash("sha1").update(html).digest("base64url")}"`,
      headers,
    }
    staticPages.set(pathname, page)
    return { ...result, response: serveStatic(request, page) }
  }
  return { ...result, response: compressed(request, response) }
})

export const startInstance = createStart(() => ({ requestMiddleware: [canonicalPath, pageMethods, delivery] }))
