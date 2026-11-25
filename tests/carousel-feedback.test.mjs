import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { runInNewContext } from "node:vm"
import test from "node:test"

import { transformWithOxc } from "vite"

/** Compiles a component for `mount`: TypeScript and JSX away, then its imports and exports as CommonJS. */
async function compile(file) {
  const source = readFileSync(new URL(file, import.meta.url), "utf8")
  const { code } = await transformWithOxc(source, file, { lang: "tsx", jsx: { runtime: "classic" }, target: "es2022" })
  const names = (list) => list.replace(/\s+as\s+/g, ": ")
  return code
    .replace(/^import\s+(\w+)\s*,\s*\{([^}]*)\}\s*from\s*"([^"]+)";?/gm, (_, name, list, id) =>
      `const ${name} = require("${id}").default; const {${names(list)}} = require("${id}");`)
    .replace(/^import\s+\*\s+as\s+(\w+)\s+from\s*"([^"]+)";?/gm, (_, name, id) => `const ${name} = require("${id}");`)
    .replace(/^import\s+\{([^}]*)\}\s*from\s*"([^"]+)";?/gm, (_, list, id) => `const {${names(list)}} = require("${id}");`)
    .replace(/^import\s+(\w+)\s+from\s*"([^"]+)";?/gm, (_, name, id) => `const ${name} = require("${id}").default;`)
    .replace(/^export\s+(?:async\s+)?function\s+(\w+)/gm, (match, name) => `exports.${name} = ${name};\n${match.replace(/^export\s+/, "")}`)
    .replace(/^export\s+const\s+(\w+)\s*=/gm, "const $1 = exports.$1 =")
    .replace(/^export\s+\{([^}]*)\};?/gm, (_, list) => `Object.assign(exports, {${list}});`)
}

// Run the real component handlers/effects with deterministic hooks and browser APIs.
async function mount(file, name, props = {}) {
  const slots = [], effects = [], timers = new Map(), listeners = new Set(), events = new Map()
  let cursor = 0, dirty = false, tree, timerId = 0, advances = 0, rejectClipboard = false, progress = 0
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
    useRef(initial) {
      const id = cursor++
      slots[id] ??= { current: initial }
      return slots[id]
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
  let intersection
  const api = { rootNode: () => ({}), canScrollPrev: () => false, canScrollNext: () => true,
    selectedScrollSnap: () => 0, scrollSnapList: () => [0, 1], scrollProgress: () => progress,
    scrollNext: () => advances++, scrollPrev() {}, scrollTo: () => advances++,
    on(event, fn) { if (!events.has(event)) events.set(event, new Set()); events.get(event).add(fn) },
    off(event, fn) { events.get(event)?.delete(fn) },
  }
  const emit = (event) => { for (const fn of [...(events.get(event) ?? [])]) fn() }
  const code = await compile(file)
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
    IntersectionObserver: class {
      constructor(callback) { intersection = callback }
      observe() { intersection([{ isIntersecting: true }]) }
      disconnect() { intersection = null }
    },
    document: { hidden: false, addEventListener() {}, removeEventListener() {} },
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
    // Embla emits `scroll` on every animation frame, whether or not the slides moved
    visible(value) { intersection?.([{ isIntersecting: value }]) },
    drag() { emit("pointerDown"); progress += 0.1; emit("scroll"); emit("pointerUp"); render() },
    tap() { emit("pointerDown"); emit("scroll"); emit("pointerUp"); render() },
    // Released before the first frame: Embla picks the next slide in `pointerUp`, emitting `select` first
    shortDrag() { emit("pointerDown"); emit("select"); emit("pointerUp"); render() },
    press() { emit("pointerDown"); render() },
    release() { emit("pointerUp"); render() },
    toggleAutoplay() { tree.props.value.toggleAutoplay(); render() },
    navigateNext() { tree.props.value.scrollNext(); render() },
    async copy(reject) { rejectClipboard = reject; await find(tree, "button").props.onClick(); render() },
    unmount() { for (const slot of slots) slot?.cleanup?.() },
    listenerCount: () => listeners.size, timerCount: () => timers.size,
  }
}

const carousel = () => mount("../src/components/ui/carousel.tsx", "Carousel")
const focusEvent = (inside = false, toggle = false) => ({
  currentTarget: { contains: () => inside },
  relatedTarget: inside ? {} : null,
  target: { closest: () => toggle ? {} : null },
})

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
  view.event("onPointerEnter", { pointerType: "mouse" }); view.event("onPointerLeave", { pointerType: "mouse" })
  assert.equal(view.tick(), 0)
  view.event("onBlurCapture", focusEvent(true))
  assert.equal(view.tick(), 0)
  view.event("onPointerEnter", { pointerType: "mouse" }); view.event("onBlurCapture", focusEvent())
  assert.equal(view.tick(), 0)
  view.event("onPointerLeave", { pointerType: "mouse" })
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


test("a stationary tap keeps autoplay running while a drag stops it", async () => {
  const view = await carousel()
  view.tap()
  assert.equal(view.tick(), 1)
  view.drag()
  assert.equal(view.tick(), 1)
  view.unmount()
})

test("touch pointer entry does not leave autoplay hover-paused", async () => {
  const view = await carousel()
  view.event("onPointerEnter", { pointerType: "touch" })
  assert.equal(view.tick(), 1)
  view.event("onPointerLeave", { pointerType: "touch" })
  assert.equal(view.tick(), 2)
  view.unmount()
})

test("Pause persists after focus leaves, allows navigation, and Play resumes from toggle focus", async () => {
  const view = await carousel()
  view.event("onFocusCapture", focusEvent(false, true))
  view.toggleAutoplay()
  view.event("onBlurCapture", focusEvent())
  assert.equal(view.tick(), 0)
  view.navigateNext()
  assert.equal(view.tick(), 1)
  view.event("onFocusCapture", focusEvent())
  assert.equal(view.tick(), 1)
  view.event("onFocusCapture", focusEvent(true, true))
  view.toggleAutoplay()
  assert.equal(view.tick(), 2)
  view.unmount()
})

test("a short drag released before its first frame still stops autoplay", async () => {
  const view = await carousel()
  view.shortDrag()
  assert.equal(view.tick(), 0)
  view.unmount()
})

test("autoplay waits while a finger rests on the slides, then carries on", async () => {
  const view = await carousel()
  view.press()
  assert.equal(view.tick(), 0)
  view.release()
  assert.equal(view.tick(), 1)
  view.unmount()
})


test("an offscreen carousel releases its timer until it returns to view", async () => {
  const view = await carousel()
  view.visible(false)
  assert.equal(view.timerCount(), 0)
  assert.equal(view.tick(), 0)
  view.visible(true)
  assert.equal(view.tick(), 1)
  view.unmount()
})
