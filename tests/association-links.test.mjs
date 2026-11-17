import assert from "node:assert/strict"
import test from "node:test"
import {
  isHttpUrl,
  isOptimizableImageHost,
  parseExtraLinks,
  platformName,
  withVisibleLabels,
} from "../src/lib/association-links.ts"

const link = (platform, label, url = "https://example.com/x") => ({ platform, label, url })

test("missing extraLinks (older backend) yields undefined", () => {
  assert.equal(parseExtraLinks(undefined), undefined)
})

test("a malformed entry falls back instead of throwing", () => {
  const quiet = console.error
  console.error = () => {}
  try {
    assert.equal(parseExtraLinks([link("website", "Web"), link("x", "", "https://x.com")]), undefined)
    assert.equal(parseExtraLinks([link("website", "Web", "javascript:alert(1)")]), undefined)
  } finally {
    console.error = quiet
  }
})

test("valid links pass through", () => {
  assert.equal(parseExtraLinks([link("twitch", "Live")])?.length, 1)
})

test("labels are visible only for repeated platforms and twitch/other", () => {
  const out = withVisibleLabels([
    link("website", "website"),
    link("telegram", "Canale"),
    link("telegram", "Gruppo"),
    link("twitch", "Live"),
  ])
  assert.deepEqual(
    out.map((l) => l.visibleLabel),
    [false, true, true, true]
  )
})

test("platform names and image helpers", () => {
  assert.equal(platformName("twitch"), "Twitch")
  assert.equal(platformName("unknown"), "Link")
  assert.equal(isHttpUrl("javascript:alert(1)"), false)
  assert.equal(isOptimizableImageHost("https://acct.blob.core.windows.net/a.png"), true)
  assert.equal(isOptimizableImageHost("https://evil.example/a.png"), false)
})
