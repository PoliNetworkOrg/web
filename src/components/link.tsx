import { useLinkProps } from "@tanstack/react-router"
import type { ComponentProps } from "react"

type LinkProps = Omit<ComponentProps<"a">, "href"> & {
  /** Where the link leads: a path of the site, with its `#hash` if any, or a full URL to somewhere else */
  href: string
  /** Replaces the current history entry instead of adding one, so "back" skips the page being left */
  replace?: boolean
}

/**
 * A link given by its URL, as the site's data has it (menus, cards, the wizard's steps). Inside the site it navigates
 * without reloading the page and starts loading the destination as soon as the pointer reaches it; a full URL is a
 * plain link.
 */
export function Link({ href, replace, ...props }: LinkProps) {
  if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return <a href={href} {...props} />
  return <RouteLink href={href} replace={replace} {...props} />
}

function RouteLink({ href, replace, ...props }: LinkProps) {
  const [path, hash] = href.split("#")
  // The router marks a link to the page being shown (a class, `aria-current`, a data attribute). The site decides that
  // itself where it matters (the header's menus), so the link is left as its caller wrote it.
  const {
    "aria-current": _current,
    "data-status": _status,
    ...link
  } = useLinkProps({ to: path, hash, replace, activeProps: {}, ...props }) as ComponentProps<"a"> & {
    "data-status"?: string
  }
  return <a {...link} aria-current={props["aria-current"]} />
}
