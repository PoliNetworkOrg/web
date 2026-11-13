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
    if (specifier === "@/lib/backend") return { url: backend, shortCircuit: true }
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

const { getDocumentCategories, findDocument } = await import("../src/queries/documents.ts")
const { GET } = await import("../src/app/documents/file/[slug]/route.ts")
const { getCategoryAnchor, getCategoryHeadingId, getPdfPixelRatio } = await import("../src/components/documents/utils.ts")
const category = (slug = "statuto") => [{
  slug: "associazione", title: "Associazione", description: "Documenti ufficiali",
  documents: [{ slug, title: "Statuto caricato", description: null,
    latest: { version: "2.0", date: "2026-11-13", file: "https://files.example/statuto.pdf" } }],
}]

function backendReturns(catalog) {
  globalThis.documentCatalogQuery = async () => catalog
}

function requestFile(slug, query = "") {
  return GET(new Request(`https://example.org/documents/file/${slug}${query}`), { params: Promise.resolve({ slug }) })
}

test("publishing the first document preserves other fallback documents without duplicating the uploaded slug", async () => {
  backendReturns(category())
  const documents = (await getDocumentCategories()).flatMap((item) => item.documents)
  assert.equal(documents.length, 6)
  assert.equal(documents.filter((item) => item.slug === "statuto").length, 1)
  assert.equal(documents.find((item) => item.slug === "statuto").title, "Statuto caricato")
  assert.ok(documents.find((item) => item.slug === "privacy-soci"))
})

test("backend outage differs from a missing document while official fallback PDFs remain available", async (t) => {
  t.mock.method(console, "error", () => {})
  backendReturns([])
  assert.equal((await requestFile("unknown")).status, 404)
  globalThis.documentCatalogQuery = async () => { throw new Error("offline") }
  assert.equal((await findDocument("statuto")).document.slug, "statuto")
  const response = await requestFile("uploaded-only")
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
