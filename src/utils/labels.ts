export const EXTRA_LABEL = "extra"

const CATEGORY_ROOT = "didattica"

export const SITE_LABEL = CATEGORY_ROOT

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

/**
 * For every course under `didattica.<school>.<level>.<course>`, the distinct facet labels (language, campus, ...)
 * carried by its groups. The key set is exactly the set of course slugs that exist at this level — one pass over
 * `groups` instead of re-scanning them once per course.
 */
export function courseFacetsForLevel(
  groups: { labels: string[] }[],
  school: string,
  level: string
): Map<string, string[]> {
  const prefix = `${levelLabel(school, level)}.`
  const facetsByCourse = new Map<string, Set<string>>()
  for (const g of groups) {
    const courseSlugs = new Set<string>()
    for (const label of g.labels) {
      if (!label.startsWith(prefix)) continue
      const courseSlug = label.slice(prefix.length).split(".")[0]
      if (courseSlug) courseSlugs.add(courseSlug)
    }
    if (courseSlugs.size === 0) continue
    for (const courseSlug of courseSlugs) {
      const set = facetsByCourse.get(courseSlug) ?? new Set<string>()
      for (const label of g.labels) {
        if (!isCategoryLabel(label)) set.add(label)
      }
      facetsByCourse.set(courseSlug, set)
    }
  }
  return new Map([...facetsByCourse].map(([course, set]) => [course, [...set].sort()]))
}
