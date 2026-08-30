import type { VisibleGroup } from "@/queries/groups"

export type MergedGroup = {
  title: string
  waLink?: string
  tgLink?: string
}

/** Merges a Telegram and a WhatsApp group that share the same title into one row with both links. */
export function mergeGroupsByTitle(groups: VisibleGroup[]): MergedGroup[] {
  const byTitle = new Map<string, MergedGroup>()
  for (const g of groups) {
    const merged: MergedGroup = byTitle.get(g.title) ?? { title: g.title }
    if (g.type === "wa") merged.waLink = g.link
    else merged.tgLink = g.link
    byTitle.set(g.title, merged)
  }
  return [...byTitle.values()]
}
