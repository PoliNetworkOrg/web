"use server"

import { trpc } from "@/lib/backend"
import type { ApiOutput } from "@/types"

export async function searchGroups(query: string, limit: number = 6) {
  const res = await trpc.groups.search.search.query({ query, limit })
  return res
}

export type VisibleGroup = ApiOutput["groups"]["search"]["getAll"][number] & { link: string }

/** All Telegram/WhatsApp groups (tagged by `groups.labels`) that are neither hidden nor missing an invite link. */
export async function getVisibleGroups(): Promise<VisibleGroup[]> {
  const groups = await trpc.groups.search.getAll.query()
  return groups.filter((g): g is VisibleGroup => !g.hide && !!g.link)
}
