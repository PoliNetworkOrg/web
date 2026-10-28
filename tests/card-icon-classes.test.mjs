import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8")

test("every CardIcon size class has its responsive variants generated", () => {
  const classes = read("../src/components/card-icon/classes.ts")
  const used = new Set([...classes.matchAll(/:\s*"([^"]+)"/g)].flatMap((match) => match[1].split(/\s+/)))

  const css = read("../src/styles/globals.css")
  const inline = css.match(/@source inline\("\{sm:,md:,lg:\}\{([^}]+)\}"\)/)
  assert.ok(inline, "the CardIcon @source inline() list is missing from globals.css")
  const generated = new Set(inline[1].split(","))

  const missing = [...used].filter((name) => !generated.has(name))
  assert.deepEqual(missing, [], `add these classes to the @source inline() list in globals.css: ${missing.join(", ")}`)
})
