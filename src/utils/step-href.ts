export function stepHref(params: { school?: string; level?: string; course?: string }) {
  const segments = [params.school, params.level, params.course].filter(Boolean)
  return ["/groups/didattica", ...segments].join("/")
}
