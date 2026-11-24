import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { registerHooks, stripTypeScriptTypes } from "node:module"
import test from "node:test"

// Exercise the real query and route without contacting the IdP or a database.
const backend = "data:text/javascript," + encodeURIComponent(
  "export const trpc = { web: { documents: { getCatalog: { query: () => globalThis.documentCatalogQuery() } } } }"
)
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "@/lib/backend.server") return { url: backend, shortCircuit: true }
    if (specifier.startsWith("@/")) {
      return { url: new URL(`../src/${specifier.slice(2)}.ts`, import.meta.url).href, shortCircuit: true }
    }
    return nextResolve(specifier, context)
  },
  load(url, context, nextLoad) {
    if (url.endsWith(".ts")) {
      return { format: "module", source: stripTypeScriptTypes(readFileSync(new URL(url), "utf8")), shortCircuit: true }
    }
    return nextLoad(url, context)
  },
})

const { getDocumentCatalog, findDocument } = await import("../src/queries/documents.server.ts")
const { serveDocumentFile } = await import("../src/queries/document-file.server.ts")
const { getActiveCategory, getCategoryAnchor, getCategoryHeadingId, getPdfPixelRatio } = await import("../src/components/documents/utils.ts")
const category = (slug = "statuto") => [{
  slug: "associazione", title: "Associazione", description: "Documenti ufficiali",
  documents: [{ slug, title: "Statuto caricato", description: null,
    latest: { version: "2.0", date: "2026-11-13", file: "https://files.example/statuto.pdf" } }],
}]

function backendReturns(catalog) {
  globalThis.documentCatalogQuery = async () => catalog
}

function requestFile(slug, query = "") {
  return serveDocumentFile(new Request(`https://example.org/documenti/file/${slug}${query}`), slug)
}

test("only the documents published from admin are listed", async () => {
  backendReturns(category())
  const { categories, backendUnavailable } = await getDocumentCatalog()
  const documents = categories.flatMap((item) => item.documents)
  assert.equal(backendUnavailable, false)
  assert.deepEqual(documents.map((item) => item.title), ["Statuto caricato"])
})

test("with nothing published the catalog is empty, not filled with stand-ins", async () => {
  backendReturns([])
  assert.deepEqual(await getDocumentCatalog(), { categories: [], backendUnavailable: false })
  assert.equal((await requestFile("unknown")).status, 404)
})

test("a backend outage lists nothing and tells a missing document apart from an unreachable one", async (t) => {
  t.mock.method(console, "error", () => {})
  globalThis.documentCatalogQuery = async () => { throw new Error("offline") }
  assert.deepEqual(await getDocumentCatalog(), { categories: [], backendUnavailable: true })
  assert.deepEqual(await findDocument("statuto"), { document: undefined, backendUnavailable: true })
  const response = await requestFile("statuto")
  assert.equal(response.status, 503)
  assert.equal(response.headers.get("retry-after"), "60")
  assert.equal(response.headers.get("cache-control"), "no-store")
})

test("PDFs recheck storage and cannot remain cached after replacement or deletion", async (t) => {
  backendReturns(category())
  let fetchOptions
  t.mock.method(globalThis, "fetch", async (_url, options) => {
    fetchOptions = options
    return new Response("%PDF-latest", { headers: { "content-type": "application/pdf", "etag": '"latest"' } })
  })
  // Version labels may be deleted and reused, so even a matching label is mutable.
  const response = await requestFile("statuto", "?v=2.0")
  assert.equal(response.status, 200)
  assert.equal(response.headers.get("cache-control"), "no-store")
  assert.equal(fetchOptions.cache, "no-store")
  assert.ok(fetchOptions.signal instanceof AbortSignal)
  assert.equal(await response.text(), "%PDF-latest")
})

test("upstream failures produce a retryable, uncached error", async (t) => {
  backendReturns(category())
  t.mock.method(console, "error", () => {})
  t.mock.method(globalThis, "fetch", async () => { throw new Error("timeout") })
  const response = await requestFile("statuto")
  assert.equal(response.status, 502)
  assert.equal(response.headers.get("cache-control"), "no-store")
})

test("the upstream timeout bounds the wait for headers, not the streamed body", async (t) => {
  backendReturns(category())
  t.mock.method(console, "error", () => {})
  t.mock.timers.enable({ apis: ["setTimeout"] })
  let signal
  t.mock.method(globalThis, "fetch", async (_url, options) => {
    signal = options.signal
    return new Response("%PDF-slow", { headers: { "content-type": "application/pdf" } })
  })
  const response = await requestFile("statuto")
  t.mock.timers.tick(60_000)
  assert.equal(signal.aborted, false)
  assert.equal(await response.text(), "%PDF-slow")

  t.mock.method(globalThis, "fetch", (_url, options) => new Promise((_resolve, reject) => {
    options.signal.addEventListener("abort", () => reject(options.signal.reason))
  }))
  const pending = requestFile("statuto")
  await new Promise((resolve) => setImmediate(resolve))
  t.mock.timers.tick(15_000)
  assert.equal((await pending).status, 502)
})

test("a client that disconnects cancels the upstream download", async (t) => {
  backendReturns(category())
  let signal
  t.mock.method(globalThis, "fetch", async (_url, options) => {
    signal = options.signal
    return new Response("%PDF")
  })
  const client = new AbortController()
  await serveDocumentFile(new Request("https://example.org/documenti/file/statuto", { signal: client.signal }), "statuto")
  client.abort()
  assert.equal(signal.aborted, true)
})

test("a category slug cannot collide with another category's heading", () => {
  const slugs = ["privacy", "privacy-title", "titolo-privacy", "categoria-privacy"]
  const ids = slugs.flatMap((slug) => [getCategoryAnchor(slug), getCategoryHeadingId(slug)])
  assert.equal(new Set(ids).size, ids.length)
})

test("canvas resolution respects both dimensions at high zoom on retina displays", () => {
  for (const [width, height] of [[900, 1273], [2700, 3819], [2700, 12000], [12000, 2700]]) {
    const ratio = getPdfPixelRatio(width, height, 3)
    assert.ok(width * ratio <= 4096)
    assert.ok(height * ratio <= 4096)
    assert.ok(ratio > 0 && ratio <= 2)
  }
  assert.equal(getPdfPixelRatio(300, 424, 1), 1)
})

test("the category tab follows the section being read", () => {
  // Before the first section reaches the reading line no tab is selected
  assert.equal(getActiveCategory([400, 900, 1400], 160, false), -1)
  assert.equal(getActiveCategory([160, 700, 1200], 160, false), 0)
  assert.equal(getActiveCategory([-600, 120, 640], 160, false), 1)
  // A short last section never reaches the line: at the bottom of the page it is the one being read
  assert.equal(getActiveCategory([-900, -300, 500], 160, true), 2)
  assert.equal(getActiveCategory([], 160, true), -1)
})
