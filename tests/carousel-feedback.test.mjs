import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { runInNewContext } from "node:vm"
import test from "node:test"

const require = createRequire(import.meta.url)
const { transform, loadBindings } = require("next/dist/build/swc")
await loadBindings()

// Run the real component handlers/effects with deterministic hooks and browser APIs.
async function mount(file, name, props = {}) {
  const slots = [], effects = [], timers = new Map(), listeners = new Set(), events = new Map()
  let cursor = 0, dirty = false, tree, timerId = 0, advances = 0, rejectClipboard = false
  const same = (a, b) => a && a.length === b.length && a.every((value, i) => Object.is(value, b[i]))
  const react = {
    createElement: (type, props, ...children) => ({ type, props: { ...props, children } }),
    Fragment: "fragment", createContext: () => ({ Provider: "provider" }),
    useState(initial) {
      const id = cursor++
      slots[id] ??= { value: initial }
      return [slots[id].value, (value) => {
        const next = typeof value === "function" ? value(slots[id].value) : value
        if (!Object.is(next, slots[id].value)) { slots[id].value = next; dirty = true }
      }]
    },
    useCallback(fn, deps) {
      const id = cursor++
      if (!same(slots[id]?.deps, deps)) slots[id] = { value: fn, deps }
      return slots[id].value
    },
    useEffect(fn, deps) {
      const id = cursor++
      if (!same(slots[id]?.deps, deps)) effects.push(() => {
        slots[id]?.cleanup?.()
        slots[id] = { deps, cleanup: fn() }
      })
    },
  }
  const media = { matches: false,
    addEventListener: (_event, fn) => listeners.add(fn),
    removeEventListener: (_event, fn) => listeners.delete(fn),
  }
  const api = { canScrollPrev: () => false, canScrollNext: () => true,
    selectedScrollSnap: () => 0, scrollSnapList: () => [0, 1],
    scrollNext: () => advances++, scrollPrev() {}, scrollTo: () => advances++,
    on(event, fn) { events.set(event, fn) }, off(event) { events.delete(event) },
  }
  const { code } = await transform(readFileSync(new URL(file, import.meta.url), "utf8"), {
    filename: file, jsc: { parser: { syntax: "typescript", tsx: true },
      transform: { react: { runtime: "classic" } }, target: "es2022" }, module: { type: "commonjs" },
  })
  const exports = {}
  runInNewContext(code, {
    exports, React: react,
    require(id) {
      if (id === "react") return react
      if (id === "embla-carousel-react") return { __esModule: true, default: () => [() => {}, api] }
      if (id === "react-icons/fi") return { FiCheck: "check", FiCopy: "copy" }
      if (id === "@/components/card-icon") return { CardIcon: "card" }
      if (id === "@/components/peek-carousel") return { PeekCarousel: "peek" }
      if (id === "@/components/layout/page") return { CONTAINER: "", SECTION_TITLE: "" }
      if (id === "../card-group") return { CardGroup: "group" }
      if (id === "./cards") return { FEATURED_CARD: {}, freshmanCardProps: (card) => ({ title: card.title }) }
      if (id === "./constants") return { hub: {}, techTools: {} }
      if (id === "@/lib/utils") return { cn: (...classes) => classes.filter(Boolean).join(" ") }
      throw new Error(`Unexpected import: ${id}`)
    },
    window: { matchMedia: () => media },
    navigator: { clipboard: { async writeText() { if (rejectClipboard) throw new Error("denied") } } },
    setInterval: (fn) => { timers.set(++timerId, fn); return timerId },
    clearInterval: (id) => timers.delete(id), setTimeout: () => ++timerId, clearTimeout() {},
  })
  function render() {
    let attempts = 0
    do {
      assert.ok(attempts++ < 20, "component render did not settle")
      dirty = false; cursor = 0; tree = exports[name](props)
      while (effects.length) effects.shift()()
    } while (dirty)
  }
  function find(node, type) {
    if (!node || typeof node !== "object") return null
    if (node.type === type) return node
    for (const child of node.props?.children?.flat(Infinity) ?? []) {
      const match = find(child, type); if (match) return match
    }
    return null
  }
  render()
  return {
    node: (type) => find(tree, type), text: () => JSON.stringify(tree),
    event(handler, event = {}) { find(tree, "section").props[handler](event); render() },
    tick() { for (const fn of [...timers.values()]) fn(); render(); return advances },
    motion(matches) { media.matches = matches; for (const fn of listeners) fn(media); render() },
    drag() { events.get("pointerDown")(); render() },
    async copy(reject) { rejectClipboard = reject; await find(tree, "button").props.onClick(); render() },
    unmount() { for (const slot of slots) slot?.cleanup?.() },
    listenerCount: () => listeners.size, timerCount: () => timers.size,
  }
}

const carousel = () => mount("../src/components/ui/carousel.tsx", "Carousel")
const focusEvent = (inside = false) => ({ currentTarget: { contains: () => inside }, relatedTarget: inside ? {} : null })

test("autoplay reacts to reduced motion and cleans up its listener", async () => {
  const view = await carousel()
  assert.equal(view.tick(), 1)
  view.motion(true)
  assert.equal(view.tick(), 1)
  view.motion(false)
  assert.equal(view.tick(), 2)
  view.drag(); view.motion(true); view.motion(false)
  assert.equal(view.tick(), 2)
  view.unmount()
  assert.equal(view.listenerCount(), 0)
  assert.equal(view.timerCount(), 0)
})

test("hover and keyboard focus independently pause autoplay", async () => {
  const view = await carousel()
  view.event("onFocusCapture", focusEvent())
  view.motion(true); view.motion(false)
  assert.equal(view.tick(), 0)
  view.event("onMouseEnter"); view.event("onMouseLeave")
  assert.equal(view.tick(), 0)
  view.event("onBlurCapture", focusEvent(true))
  assert.equal(view.tick(), 0)
  view.event("onMouseEnter"); view.event("onBlurCapture", focusEvent())
  assert.equal(view.tick(), 0)
  view.event("onMouseLeave")
  assert.equal(view.tick(), 1)
  view.unmount()
})

test("clipboard rejection announces recovery and never claims success", async () => {
  const view = await mount("../src/components/chi-siamo/copy-tax-code.tsx", "CopyTaxCode", { value: "97927490157" })
  await view.copy(true)
  assert.ok(view.node("output"), "clipboard recovery must have an accessible status output")
  assert.match(view.text(), /manualmente/)
  assert.doesNotMatch(view.text(), /Copiato/)
  await view.copy(false)
  assert.match(view.text(), /Copiato/)
  assert.doesNotMatch(view.text(), /manualmente/)
  view.unmount()
})


test("the mobile guides carousel keeps the first featured resource after merging main", async () => {
  const guides = [1, 2, 3, 4].map((id) => ({ id, group: "guides", title: `Guide ${id}` }))
  const view = await mount("../src/components/matricole/guides.tsx", "MatricoleGuides", {
    content: { resources: guides, telegram: [] },
  })
  assert.deepEqual(view.node("peek").props.items.map((guide) => guide.id), [1, 2, 3, 4])
  view.unmount()
})
