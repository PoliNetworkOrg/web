/**
 * Matches `pathname` against `prefix` at a path-segment boundary — `"/groups"` matches `"/groups"` and
 * `"/groups/x"`, but not `"/groupsettings"`.
 */
export function matchesRoutePrefix(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`)
}

export function matchesAnyRoutePrefix(pathname: string, prefixes: string[]): boolean {
  return prefixes.some((prefix) => matchesRoutePrefix(pathname, prefix))
}
