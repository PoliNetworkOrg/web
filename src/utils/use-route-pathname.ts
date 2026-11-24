import { isNotFound, useRouterState } from "@tanstack/react-router"

/** The path given to a URL that matches no page: it matches no section either */
const NOT_FOUND = "/_not-found"

/**
 * The path of the page being shown, for UI in the root layout that changes by section.
 *
 * It comes from the matched routes, not from the address bar: while the next page loads the URL has already changed,
 * and the header, footer and background must keep describing the page still on screen. A URL that matches no page
 * gives `/_not-found`; a page that exists but found its content missing (an unknown course, a deleted project) keeps
 * its own path.
 */
export function useRoutePathname(): string {
  return useRouterState({
    select: (state) => {
      // A loader that found its content missing leaves only the root, holding what was thrown
      if (state.matches.some((match) => isNotFound(match.error))) return state.location.pathname
      const leaf = state.matches.at(-1)
      if (!leaf || state.matches.some((match) => match._notFound)) return NOT_FOUND
      return leaf.pathname.length > 1 ? leaf.pathname.replace(/\/$/, "") : leaf.pathname
    },
  })
}
