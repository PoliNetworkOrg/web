import { createRouter } from "@tanstack/react-router"
import { NotFound } from "@/components/not-found"
import { routeTree } from "./routeTree.gen"

export function getRouter() {
  return createRouter({
    routeTree,
    // Start loading a page when the pointer reaches its link, so it is usually ready by the click
    defaultPreload: "intent",
    scrollRestoration: true,
    // A missing page is always the same full-page 404, wherever in the tree it was found missing
    notFoundMode: "root",
    defaultNotFoundComponent: NotFound,
    trailingSlash: "never",
    // /TEAM is not /team: a URL in another case is a missing page, as it always was
    caseSensitive: true,
  })
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
