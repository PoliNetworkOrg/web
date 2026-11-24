import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { registerHooks, stripTypeScriptTypes } from "node:module"
import test from "node:test"

registerHooks({
  resolve(specifier, context, nextResolve) {
    // Images are imported through the build (`?img`): here any image will do
    if (specifier.endsWith("?img")) {
      return { url: "data:text/javascript,export default { src: '', width: 1, height: 1 }", shortCircuit: true }
    }
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

const { missingLinkTargetFromPath } = await import("../src/utils/missing-link-target.ts")
const { SCHOOLS } = await import("../src/components/wizard/constants.ts")

test("the extra groups page targets the extra category", () => {
  assert.equal(missingLinkTargetFromPath("/gruppi/extra")?.category, "extra")
})

test("a school page under /gruppi/didattica targets that school", () => {
  const school = SCHOOLS[0]
  const target = missingLinkTargetFromPath(`/gruppi/didattica/${school.slug}`)
  assert.equal(target?.category, "didattica")
  assert.equal(target?.path, school.name)
})

test("the old English path and unknown pages have no target", () => {
  assert.equal(missingLinkTargetFromPath(`/groups/didattica/${SCHOOLS[0].slug}`), undefined)
  assert.equal(missingLinkTargetFromPath("/gruppi"), undefined)
  assert.equal(missingLinkTargetFromPath("/gruppi/didattica/not-a-school"), undefined)
})
