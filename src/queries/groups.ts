"use server"

import { trpc } from "@/lib/backend"
import type { GroupLinkReportInput, GroupLinkReportResult, VisibleGroup } from "@/queries/types"
import { courseFacetsForLevel } from "@/utils/labels"

export async function searchGroups(query: string, limit: number = 6) {
  const res = await trpc.groups.search.search.query({ query, limit })
  return res
}

export async function getVisibleGroups(): Promise<VisibleGroup[]> {
  const groups = await trpc.groups.search.getAll.query()
  return groups.filter((g): g is VisibleGroup => !g.hide && !!g.link)
}

export async function getCoursesForLevel(school: string, level: string) {
  return [...courseFacetsForLevel(await getVisibleGroups(), school, level).keys()].sort()
}

export async function reportGroupLink(input: GroupLinkReportInput): Promise<GroupLinkReportResult> {
  try {
    await trpc.web.reports.create.mutate(input)
    return { ok: true }
  } catch (error) {
    console.error(error)
    return { ok: false, error: "UNKNOWN" }
  }
}
