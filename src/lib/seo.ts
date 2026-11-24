import { isNotFound, notFound } from "@tanstack/react-router"

const SITE_NAME = "PoliNetwork APS"

export const DEFAULT_DESCRIPTION =
  "La community online del Politecnico di Milano, gestita dagli studenti per gli studenti"

type PageMeta = {
  /** Shown as "<title> | PoliNetwork APS"; without it the page keeps the site's name alone */
  title?: string
  description?: string
  /** Keeps the page out of search results */
  noindex?: boolean
}

/**
 * The `meta` of a route's `head`: the title and description, repeated for link previews (Open Graph, Twitter). The tags
 * every page shares (site name, image, card type) are set once by the root route; a tag set here replaces the root's.
 */
export function pageMeta({ title, description, noindex }: PageMeta = {}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  return [
    { title: fullTitle },
    { property: "og:title", content: fullTitle },
    { name: "twitter:title", content: fullTitle },
    ...(description
      ? [
          { name: "description", content: description },
          { property: "og:description", content: description },
          { name: "twitter:description", content: description },
        ]
      : []),
    ...(noindex ? [{ name: "robots", content: "noindex" }] : []),
  ]
}

/**
 * Thrown from a loader when the page exists but what it shows doesn't (an unknown course, a deleted project). The
 * site answers 404 with the "not found" page; `meta` is the title and description that page keeps in its `<head>`.
 */
export function missingPage(meta: Pick<PageMeta, "title" | "description"> = {}) {
  return notFound({ data: meta })
}

/** The `meta` given to `missingPage` by the loader that threw `error`, if that is what `error` is */
export function missingPageMeta(error: unknown): Pick<PageMeta, "title" | "description"> | undefined {
  return isNotFound(error) ? ((error.data as Pick<PageMeta, "title" | "description"> | undefined) ?? {}) : undefined
}

/**
 * Response headers of a page that is the same for everyone and changes only with a deploy: a shared cache in front of
 * the site may keep it. Every other page is rendered from the backend's data on each request and must not be stored.
 */
export const STATIC_PAGE_HEADERS = { "Cache-Control": "s-maxage=31536000" }
export const DYNAMIC_PAGE_HEADERS = { "Cache-Control": "private, no-cache, no-store, max-age=0, must-revalidate" }
