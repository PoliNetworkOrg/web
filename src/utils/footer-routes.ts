import { matchesAnyRoutePrefix } from "@/utils/route-match"

const HIDDEN_EXACT = ["/matricole/guida"]
const HIDDEN_PREFIXES = ["/groups", "/documents/view"]

/** Whether the page at `pathname` shows the footer: full-screen routes don't */
export function hasFooter(pathname: string): boolean {
  return !HIDDEN_EXACT.includes(pathname) && !matchesAnyRoutePrefix(pathname, HIDDEN_PREFIXES)
}
