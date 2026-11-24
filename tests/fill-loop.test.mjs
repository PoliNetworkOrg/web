import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { registerHooks, stripTypeScriptTypes } from "node:module"
import test from "node:test"

registerHooks({
  load(url, context, nextLoad) {
    if (url.endsWith(".ts")) {
      return { format: "module", source: stripTypeScriptTypes(readFileSync(new URL(url), "utf8")), shortCircuit: true }
    }
    return nextLoad(url, context)
  },
})

const { fillAt, fillOnceAt } = await import("../src/utils/fill-loop.ts")

test("a one-time sequence starts empty and never resets after completion", () => {
  const once = (seconds) => [0, 1, 2].map((step) => fillOnceAt(seconds, step))
  assert.deepEqual(once(0), [0, 0, 0])
  assert.deepEqual(once(1.5), [1, 0.5, 0])
  assert.deepEqual(once(1000), [1, 1, 1])
})

// A timeline of three lines: each fills in 1s, then it holds 1.5s and empties in 0.5s, so the loop is 5s long
const lines = (seconds) => [0, 1, 2].map((step) => fillAt(seconds, step, 3))

test("a timeline fills from its start to its end, one line after the other", () => {
  assert.deepEqual(lines(0), [0, 0, 0])
  assert.deepEqual(lines(0.5), [0.5, 0, 0])
  assert.deepEqual(lines(1.5), [1, 0.5, 0])
  assert.deepEqual(lines(2.5), [1, 1, 0.5])
  assert.deepEqual(lines(4), [1, 1, 1])
})

test("the full timeline empties all at once, then starts again", () => {
  assert.deepEqual(lines(4.75), [0.5, 0.5, 0.5])
  assert.deepEqual(lines(5.5), lines(0.5))
  assert.deepEqual(lines(1000.5), lines(0.5))
})
