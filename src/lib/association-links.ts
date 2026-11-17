import { z } from "zod"

const httpUrl = z.url().refine((url) => /^https?:\/\//i.test(url))

const extraLinksSchema = z.array(
  z.object({
    platform: z.string(),
    label: z.string().trim().min(1),
    url: httpUrl,
  })
)

export type ExtraLink = z.infer<typeof extraLinksSchema>[number]

/** Platforms without a default name in the legacy link list: the label is the only meaningful text. */
const PLATFORM_NAMES: Record<string, string> = {
  website: "Web",
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  x: "X",
  youtube: "Youtube",
  telegram: "Telegram",
  linkedin: "LinkedIn",
  spotify: "Spotify",
  twitch: "Twitch",
  other: "Link",
}

export function platformName(platform: string) {
  return PLATFORM_NAMES[platform] ?? "Link"
}

/**
 * Validates the additive `extraLinks` field of an association. Returns `undefined` when it is absent
 * (older backend) or when any entry is malformed, so the caller falls back to the legacy `links`
 * instead of failing the whole listing.
 */
export function parseExtraLinks(value: unknown): ExtraLink[] | undefined {
  if (value === undefined || value === null) return undefined
  const result = extraLinksSchema.safeParse(value)
  if (!result.success) {
    console.error("Ignoring invalid association extraLinks", result.error.message)
    return undefined
  }
  return result.data
}

/**
 * A visible label is only needed to tell links apart (repeated platform) or when the platform has no
 * recognizable icon (twitch/other). Single links keep the icon-only rendering.
 */
export function withVisibleLabels(links: ExtraLink[]) {
  const counts = new Map<string, number>()
  for (const { platform } of links) counts.set(platform, (counts.get(platform) ?? 0) + 1)
  return links.map((link) => ({
    ...link,
    visibleLabel: (counts.get(link.platform) ?? 0) > 1 || link.platform === "twitch" || link.platform === "other",
  }))
}

export function isHttpUrl(value: string) {
  return /^https?:\/\//i.test(value)
}
