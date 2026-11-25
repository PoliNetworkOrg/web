import { z } from "zod"

const named = z.object({ slug: z.string(), nameIt: z.string().min(1), nameEn: z.string() })
const httpUrl = z.url().refine((url) => /^https?:\/\//i.test(url))

export const upcomingEventSchema = z.object({
  id: z.string().min(1),
  associationId: z.number(),
  associationName: z.string().min(1),
  title: z.string().min(1),
  descriptionIt: z.string(),
  descriptionEn: z.string(),
  startsAt: z.iso.datetime({ offset: true }),
  endsAt: z.iso.datetime({ offset: true }).nullable(),
  online: z.boolean(),
  venue: z.string(),
  campus: named.nullable(),
  link: httpUrl.nullable(),
  poster: httpUrl.nullable(),
})
export type UpcomingEvent = z.infer<typeof upcomingEventSchema>

/**
 * Validates the backend's upcoming events one by one: a malformed entry is dropped, never the whole calendar, and
 * anything that is not a list (an older backend without the procedure) means no events.
 */
export function parseUpcomingEvents(value: unknown): UpcomingEvent[] {
  if (!Array.isArray(value)) return []
  return value.flatMap((entry) => {
    const result = upcomingEventSchema.safeParse(entry)
    if (!result.success) console.error("Ignoring invalid association event", result.error.message)
    return result.success ? [result.data] : []
  })
}

const dayFormat = new Intl.DateTimeFormat("it-IT", {
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Rome",
})
/** "gio 3 dic, 18:30", always in Rome so server and browser agree. */
export const formatEventStart = (iso: string) => dayFormat.format(new Date(iso))
