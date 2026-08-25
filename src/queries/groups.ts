"use server"

import { trpc } from "@/lib/backend"

export async function searchGroups(query: string, limit: number = 6) {
  const res = await trpc.tg.groups.search.query({ query, limit })
  return res
}
