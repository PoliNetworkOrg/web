import { FiCalendar, FiMapPin } from "react-icons/fi"
import type { UpcomingEvent } from "@/lib/association-events"

/**
 * Approved events of the associations, soonest first; each links to its association's profile below. `startsAtText` is
 * the start written out on the server (`formatEventStart`), so every browser shows the server's wording.
 */
export function UpcomingEvents({ events }: { events: (UpcomingEvent & { startsAtText: string })[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {events.map((event) => (
        <li key={event.id} className="flex flex-col gap-2 rounded-rectangles bg-white/60 p-5">
          <span className="flex items-center gap-2 text-sm text-text-secondary">
            <FiCalendar aria-hidden className="size-4 shrink-0" />
            <time dateTime={event.startsAt}>{event.startsAtText}</time>
          </span>
          <span className="typo-title-small text-text-primary">
            {event.link ? (
              <a className="underline underline-offset-4" href={event.link} target="_blank" rel="noopener noreferrer">
                {event.title}
              </a>
            ) : (
              event.title
            )}
          </span>
          {event.descriptionIt && <p className="line-clamp-3 text-pretty">{event.descriptionIt}</p>}
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-secondary">
            <span className="flex items-center gap-1">
              <FiMapPin aria-hidden className="size-4 shrink-0" />
              {[event.online ? "Online" : event.venue, event.campus?.nameIt].filter(Boolean).join(" · ") ||
                "Luogo da definire"}
            </span>
            <a
              className="underline underline-offset-4"
              href={`/associazioni?associazione=${event.associationId}#associazione-${event.associationId}`}
            >
              {event.associationName}
            </a>
          </span>
        </li>
      ))}
    </ul>
  )
}
