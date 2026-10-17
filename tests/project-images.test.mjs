import assert from "node:assert/strict"
import { createRequire } from "node:module"
import test from "node:test"

// Load the image configuration without requiring unrelated application credentials.
process.env.SKIP_ENV_VALIDATION = "true"
const { default: nextConfig } = await import("../next.config.js")
const require = createRequire(import.meta.url)
const { default: imageLoader } = require("next/dist/shared/lib/image-loader.js")
const { imageConfigDefault } = require("next/dist/shared/lib/image-config.js")

function loadImage(src) {
  return imageLoader({ config: { ...imageConfigDefault, ...nextConfig.images }, src, width: 128, quality: 75 })
}

test("the reported Webeep Sync logo can be rendered by next/image", () => {
  const src = "https://raw.githubusercontent.com/toto04/webeep-sync/main/static/icons/icon-256x256.png"
  assert.equal(new URL(loadImage(src), "https://polinetwork.org").searchParams.get("url"), src)
})

test("the new image permission is limited to the intended HTTPS repository", () => {
  for (const src of [
    "https://unconfigured.example/logo.png",
    "https://raw.githubusercontent.com/other-owner/other-repo/main/logo.png",
    "http://raw.githubusercontent.com/toto04/webeep-sync/main/static/icons/icon-256x256.png",
  ]) {
    assert.throws(() => loadImage(src), /not configured/)
  }
})
