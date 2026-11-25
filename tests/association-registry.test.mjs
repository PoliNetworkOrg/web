import assert from "node:assert/strict"
import test from "node:test"

import { filterOptions, matchesFilters, parseRegistryFields } from "../src/lib/association-registry.ts"

const informatica = { slug: "didattica.x.triennale.informatica", nameIt: "Informatica", nameEn: "Computer Science" }
const bovisa = { slug: "bovisa", nameIt: "Milano Bovisa", nameEn: "Milan Bovisa" }

void test("a response from the current backend, without the new fields, parses to nothing", () => {
  assert.deepEqual(parseRegistryFields({ id: 1, name: "A" }), {
    programmes: undefined,
    campuses: undefined,
    crossProgramme: undefined,
    contacts: undefined,
  })
})

void test("a malformed field is dropped on its own", () => {
  const fields = parseRegistryFields({
    programmes: [informatica],
    campuses: "bovisa",
    contacts: [{ function: "events", label: "Eventi", email: "not-an-email" }],
  })
  assert.deepEqual(fields.programmes, [informatica])
  assert.equal(fields.campuses, undefined)
  assert.equal(fields.contacts, undefined)
})

void test("contacts keep only public fields, with empty personal data by default", () => {
  const [contact] = parseRegistryFields({
    contacts: [{ function: "events", label: "Eventi", email: "eventi@example.org", holderSub: "secret" }],
  }).contacts
  assert.deepEqual(contact, { function: "events", label: "Eventi", email: "eventi@example.org", name: "", phone: "" })
})

void test("cross-programme associations match every programme filter", () => {
  const cross = { crossProgramme: true, campuses: [bovisa] }
  const listed = { programmes: [informatica], campuses: [] }
  const legacy = {}
  assert.equal(matchesFilters(cross, { programme: "other" }), true)
  assert.equal(matchesFilters(listed, { programme: informatica.slug }), true)
  assert.equal(matchesFilters(listed, { programme: "other" }), false)
  assert.equal(matchesFilters(legacy, { programme: informatica.slug }), false)
  assert.equal(matchesFilters(legacy, {}), true)
  assert.equal(matchesFilters(cross, { programme: "x", campus: "bovisa" }), true)
  assert.equal(matchesFilters(listed, { campus: "bovisa" }), false)
})

void test("filter options come from the published associations, once each, sorted by name", () => {
  const options = filterOptions([{ programmes: [informatica], campuses: [bovisa] }, { campuses: [bovisa] }, {}])
  assert.deepEqual(options, {
    programmes: [{ value: informatica.slug, label: "Informatica" }],
    campuses: [{ value: "bovisa", label: "Milano Bovisa" }],
  })
  assert.deepEqual(filterOptions([{}]), { programmes: [], campuses: [] })
})
