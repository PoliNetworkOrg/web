import type { VisibleGroup } from "@/queries/groups"

export type MergedGroup = {
  /** Stable React key — `type:id`, since numeric ids aren't guaranteed unique across the tg/wa namespaces. */
  key: string
  title: string
  waLink?: string
  tgLink?: string
}

/**
 * Merges a Telegram and a WhatsApp group that share the same title into one row with both links.
 * Two groups on the *same* platform that happen to share a title are kept as separate rows instead of one
 * silently overwriting the other's link.
 */
export function mergeGroupsByTitle(groups: VisibleGroup[]): MergedGroup[] {
  const openByTitle = new Map<string, MergedGroup[]>()
  const result: MergedGroup[] = []
  for (const g of groups) {
    const linkField = g.type === "wa" ? "waLink" : "tgLink"
    const candidates = openByTitle.get(g.title) ?? []
    const openEntry = candidates.find((m) => !m[linkField])
    if (openEntry) {
      openEntry[linkField] = g.link
    } else {
      const merged: MergedGroup = { key: `${g.type}:${g.id}`, title: g.title, [linkField]: g.link }
      candidates.push(merged)
      openByTitle.set(g.title, candidates)
      result.push(merged)
    }
  }
  return result
}
