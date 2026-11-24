import assert from "node:assert/strict"
import { test } from "node:test"
import { highlightPdfText } from "./pdf-search.ts"

test("PDF content is escaped even without a search term", () => {
  assert.equal(
    highlightPdfText('<img src=x onerror="alert(1)"> &', ""),
    "&lt;img src=x onerror=&quot;alert(1)&quot;&gt; &amp;"
  )
})
test("search highlights literal, case-insensitive matches safely", () => {
  assert.equal(highlightPdfText("A+B a+b <script>", "a+b"), "<mark>A+B</mark> <mark>a+b</mark> &lt;script&gt;")
  assert.equal(highlightPdfText("<script>", "<script>"), "<mark>&lt;script&gt;</mark>")
  assert.equal(highlightPdfText("[a].*", "[a].*"), "<mark>[a].*</mark>")
})
