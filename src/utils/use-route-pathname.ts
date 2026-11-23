"use client"

import { useSelectedLayoutSegments } from "next/navigation"

/**
 * The path of the route being rendered, for UI in the root layout that changes by section.
 *
 * Unlike `usePathname`, it comes from the route tree rather than the browser URL, so it is the same on the server and
 * during hydration. That matters for the 404: it is prerendered once for every missing URL, and reading the URL would
 * make, for example, `/groups/x` hydrate a logo-only header over the full one in the HTML. There it is `/_not-found`,
 * which matches no section.
 *
 * Call it only from components rendered by the root layout: the segments are relative to the nearest layout.
 */
export function useRoutePathname(): string {
  const segments = useSelectedLayoutSegments()
  return `/${segments.join("/")}`
}
