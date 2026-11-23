/**
 * Matches `pathname` against `prefix` at a path-segment boundary — `"/gruppi"` matches `"/gruppi"` and
 * `"/gruppi/x"`, but not `"/gruppisettings"`.
 */
export function matchesRoutePrefix(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`)
}

export function matchesAnyRoutePrefix(pathname: string, prefixes: string[]): boolean {
  return prefixes.some((prefix) => matchesRoutePrefix(pathname, prefix))
}
