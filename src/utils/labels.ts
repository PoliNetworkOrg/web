export const EXTRA_LABEL = "extra"

const CATEGORY_ROOT = "didattica"

export function schoolLabel(school: string) {
  return `${CATEGORY_ROOT}.${school}`
}

export function levelLabel(school: string, level: string) {
  return `${CATEGORY_ROOT}.${school}.${level}`
}

export function courseLabel(school: string, level: string, course: string) {
  return `${CATEGORY_ROOT}.${school}.${level}.${course}`
}

/** A group matches a branch when one of its labels is exactly `path`, or nested under it (e.g. "a.b.c" under "a.b"). */
export function matchesLabelBranch(labels: string[], path: string): boolean {
  return labels.some((label) => label === path || label.startsWith(`${path}.`))
}

/** Category labels place a group in the school/level/course/year hierarchy; everything else is a facet (language, campus, ...). */
export function isCategoryLabel(label: string): boolean {
  return label === CATEGORY_ROOT || label.startsWith(`${CATEGORY_ROOT}.`)
}

/** Distinct facet labels (non-category) carried by groups whose category matches `branchPath`. */
export function facetsForBranch(groups: { labels: string[] }[], branchPath: string): string[] {
  const facets = new Set<string>()
  for (const g of groups) {
    if (!matchesLabelBranch(g.labels, branchPath)) continue
    for (const label of g.labels) {
      if (!isCategoryLabel(label)) facets.add(label)
    }
  }
  return [...facets].sort()
}

export const LANGUAGE_FACETS = ["ita", "eng"]
export const CAMPUS_FACETS = ["online", "bovisa", "cremona", "leonardo", "piacenza", "lecco", "mantova"]

const MIXED_FACET = "mixed"

function singleKnownFacet(facets: string[], known: string[]): string | null {
  const matches = facets.filter((facet) => known.includes(facet))
  if (matches.length === 0) return null
  return matches.length === 1 ? (matches[0] ?? null) : MIXED_FACET
}

/** The course's campus, if every one of its groups agrees on a single known campus (else "mixed", never both). */
export function campusFacet(facets: string[]): string | null {
  return singleKnownFacet(facets, CAMPUS_FACETS)
}

/** The course's language, if every one of its groups agrees on a single known language (else "mixed"). */
export function languageFacet(facets: string[]): string | null {
  return singleKnownFacet(facets, LANGUAGE_FACETS)
}

export function campusLabel(facet: string): string {
  return humanizeSlug(facet)
}

export function languageLabel(facet: string): string {
  return facet === MIXED_FACET ? "Mixed" : facet.toUpperCase()
}

const COHORT_PATTERN = /^\d{2}-\d{2}$/

/** Reads the `YY-YY` cohort suffix (e.g. "26-27") directly nested under `coursePath`, if any label has one. */
export function courseCohortFromLabels(labels: string[], coursePath: string): string | null {
  const prefix = `${coursePath}.`
  for (const label of labels) {
    if (!label.startsWith(prefix)) continue
    const segment = label.slice(prefix.length).split(".")[0]
    if (segment && COHORT_PATTERN.test(segment)) return segment
  }
  return null
}

export function cohortLabelText(cohort: string): string {
  return cohort.replace("-", "/")
}

export function humanizeSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

/** Distinct course slugs — the label segment right after `didattica.<school>.<level>.` — found across the given groups. */
export function courseSlugsForLevel(groups: { labels: string[] }[], school: string, level: string): string[] {
  const prefix = `${levelLabel(school, level)}.`
  const slugs = new Set<string>()
  for (const g of groups) {
    for (const label of g.labels) {
      if (!label.startsWith(prefix)) continue
      const courseSlug = label.slice(prefix.length).split(".")[0]
      if (courseSlug) slugs.add(courseSlug)
    }
  }
  return [...slugs].sort()
}
