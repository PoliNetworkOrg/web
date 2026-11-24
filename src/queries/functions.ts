import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"
import type { Project } from "@/components/projects/resources"
import type { GroupLinkReportInput } from "@/queries/types"
import {
  courseCohortFromLabels,
  courseFacetsForLevel,
  courseLabel,
  EXTRA_LABEL,
  levelLabel,
  matchesLabelBranch,
  SITE_LABEL,
  schoolLabel,
} from "@/utils/labels"
import { mergeGroupsByTitle } from "@/utils/merge-groups"
import { getAcknowledgements } from "./acknowledgements.server"
import { getAllAssociations } from "./associations.server"
import { findDocument, getDocumentCatalog } from "./documents.server"
import { getAllFaqs } from "./faqs.server"
import { getFreshmanContent } from "./freshman.server"
import { getCoursesForLevel, getVisibleGroups, reportGroupLink, searchGroups } from "./groups.server"
import { getLatestGuidaMatricola } from "./guida-matricola.server"
import { getAllProjects, getProject } from "./projects.server"

/**
 * What the pages read from the backend. Each function runs on the server only, with the website's service token; the
 * browser calls them while navigating. They return what the page shows and nothing more: the whole list of groups, for
 * example, never leaves the server.
 */

export const fetchProjects = createServerFn().handler(() => getAllProjects())

/** The first four live projects, in the order set from the admin dashboard */
export const fetchFeaturedProjects = createServerFn().handler(async () =>
  (await getAllProjects()).filter((project) => project.category !== "deprecated").slice(0, 4)
)

/** The four tools shown on /storia, matched by name against the projects from the backend */
const HISTORY_PROJECTS = [/graduatori/i, /\btol\b/i, /aule/i, /webeep/i]

/** For each of `HISTORY_PROJECTS`, its project or `null`; a project matched once isn't matched twice */
export const fetchHistoryProjects = createServerFn().handler(async () => {
  // Deprecated projects are left out, like on the home page
  const projects = (await getAllProjects()).filter((project) => project.category !== "deprecated")
  const used = new Set<Project["id"]>()
  return HISTORY_PROJECTS.map((match) => {
    const project = projects.find((candidate) => !used.has(candidate.id) && match.test(candidate.title))
    if (project) used.add(project.id)
    return project ?? null
  })
})

export const fetchProject = createServerFn()
  .validator(z.object({ id: z.number().int() }))
  .handler(({ data }) => getProject(data.id))

export const fetchFaqs = createServerFn().handler(() => getAllFaqs())
export const fetchAssociations = createServerFn().handler(() => getAllAssociations())
export const fetchAcknowledgements = createServerFn().handler(() => getAcknowledgements())
export const fetchFreshmanContent = createServerFn().handler(() => getFreshmanContent())
export const fetchDocumentCatalog = createServerFn().handler(() => getDocumentCatalog())
export const fetchDocument = createServerFn()
  .validator(z.object({ slug: z.string() }))
  .handler(({ data }) => findDocument(data.slug))

const levelInput = z.object({ school: z.string(), level: z.string() })
const courseInput = levelInput.extend({ course: z.string() })

/** The courses of a level that have groups, each with the facets (campus, language…) of its groups */
export const fetchCourses = createServerFn()
  .validator(levelInput)
  .handler(async ({ data }) => {
    const facetsByCourse = courseFacetsForLevel(await getVisibleGroups(), data.school, data.level)
    return [...facetsByCourse].map(([slug, facets]) => ({ slug, facets })).sort((a, b) => (a.slug < b.slug ? -1 : 1))
  })

/** The slugs of the courses of a level that have groups, sorted */
export const fetchCourseSlugs = createServerFn()
  .validator(levelInput)
  .handler(({ data }) => getCoursesForLevel(data.school, data.level))

/** Whether the course has groups, which is what makes it exist on the site */
export const fetchCourseExists = createServerFn()
  .validator(courseInput)
  .handler(async ({ data }) => courseFacetsForLevel(await getVisibleGroups(), data.school, data.level).has(data.course))

/** The groups of a course as its page lists them, or `null` when the course has none */
export const fetchCourseGroups = createServerFn()
  .validator(courseInput)
  .handler(async ({ data: { school, level, course } }) => {
    const groups = await getVisibleGroups()
    if (!courseFacetsForLevel(groups, school, level).has(course)) return null

    const site = mergeGroupsByTitle(groups.filter((g) => g.labels.includes(SITE_LABEL)))
    const ofSchool = mergeGroupsByTitle(groups.filter((g) => g.labels.includes(schoolLabel(school))))
    const ofLevel = mergeGroupsByTitle(groups.filter((g) => g.labels.includes(levelLabel(school, level))))

    const coursePath = courseLabel(school, level, course)
    const courseGroups = groups.filter((g) => matchesLabelBranch(g.labels, coursePath))
    const general = mergeGroupsByTitle(
      courseGroups.filter((g) => courseCohortFromLabels(g.labels, coursePath) === null)
    )

    const byCohort = new Map<string, typeof courseGroups>()
    for (const g of courseGroups) {
      const cohort = courseCohortFromLabels(g.labels, coursePath)
      if (cohort === null) continue
      byCohort.set(cohort, [...(byCohort.get(cohort) ?? []), g])
    }

    return {
      // The site, school, level and course groups
      general: [
        ...site.map((group) => ({ group, secondary: false })),
        ...ofSchool.map((group) => ({ group, secondary: false })),
        ...ofLevel.map((group) => ({ group, secondary: true })),
        ...general.map((group) => ({ group, secondary: true })),
      ],
      cohorts: [...byCohort.keys()].sort().map((cohort) => ({
        cohort,
        groups: mergeGroupsByTitle(byCohort.get(cohort) ?? []),
      })),
      hasAnyGroup: site.length > 0 || ofSchool.length > 0 || ofLevel.length > 0 || courseGroups.length > 0,
    }
  })

export const fetchExtraGroups = createServerFn().handler(async () =>
  mergeGroupsByTitle((await getVisibleGroups()).filter((g) => matchesLabelBranch(g.labels, EXTRA_LABEL))).sort((a, b) =>
    a.title.localeCompare(b.title)
  )
)

export const searchGroupsFn = createServerFn()
  .validator(z.object({ query: z.string(), limit: z.number().int().positive().max(50) }))
  .handler(({ data }) => searchGroups(data.query, data.limit))

/** The backend validates the report: this only forwards it with the website's token */
export const reportGroupLinkFn = createServerFn({ method: "POST" })
  .validator((input: GroupLinkReportInput) => input)
  .handler(({ data }) => reportGroupLink(data))

/** The site's public origin, which only the server knows: absolute URLs in the metadata are built from it */
export const fetchSiteOrigin = createServerFn().handler(async () => {
  const { SITE_URL } = await import("@/lib/site.server")
  return SITE_URL.origin
})

/** Shown while the backend has no guide: the copy shipped with the site */
const FALLBACK_GUIDA = {
  version: "1.0",
  date: "2026-07-14",
  url: "/guida-della-matricola.pdf",
}

/** The latest Guida della Matricola, with its date written out on the server so it reads the same for everyone */
export const fetchGuidaMatricolaView = createServerFn().handler(async () => {
  const guida = (await getLatestGuidaMatricola()) ?? FALLBACK_GUIDA
  return {
    version: guida.version,
    url: guida.url,
    releasedOn: new Intl.DateTimeFormat("it-IT", { dateStyle: "long" }).format(new Date(guida.date)),
  }
})
