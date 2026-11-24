import assert from "node:assert/strict"
import test from "node:test"

import { formatEventStart, parseUpcomingEvents } from "../src/lib/association-events.ts"

const event = {
  id: "00000000-0000-4000-8000-000000000001",
  associationId: 3,
  associationName: "Associazione Alfa",
  title: "Torneo di scacchi",
  descriptionIt: "Aperto a tutti",
  descriptionEn: "Open to all",
  startsAt: "2026-12-03T17:30:00.000Z",
  endsAt: null,
  online: false,
  venue: "Aula studio",
  campus: { slug: "leonardo", nameIt: "Milano Leonardo", nameEn: "Milan Leonardo" },
  link: "https://example.org",
  poster: null,
}

void test("an older backend without events, or an error, yields no events", () => {
  assert.deepEqual(parseUpcomingEvents(undefined), [])
  assert.deepEqual(parseUpcomingEvents({ error: "NOT_FOUND" }), [])
})

void test("malformed events are dropped one by one", () => {
  const events = parseUpcomingEvents([event, { ...event, id: "x", startsAt: "soon" }, { ...event, link: "javascript:x" }])
  assert.deepEqual(
    events.map((e) => e.id),
    [event.id]
  )
})

void test("event times are shown in Rome", () => {
  assert.match(formatEventStart(event.startsAt), /3 dic.*18:30/)
})
