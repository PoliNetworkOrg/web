import { env } from "@/env.server"
import { parseExtraLinks } from "@/lib/association-links"
import { parseRegistryFields } from "@/lib/association-registry"
import { trpc } from "@/lib/backend.server"

export async function getAllAssociations() {
  try {
    const associations = await trpc.web.associations.getAllAssociations.query()
    // The published SDK predates repeated platform links. Validate the additive field, with old-server fallback.
    return associations.map((association) => ({
      ...association,
      extraLinks: parseExtraLinks((association as { extraLinks?: unknown }).extraLinks),
      // Programmes, campuses and public contacts are absent from older backends and from the published SDK's types.
      ...parseRegistryFields(association as Record<string, unknown>),
    }))
  } catch (error) {
    console.error("Failed to fetch associations", error)
    return []
  }
}

/** The association portal of the admin dashboard, where representatives register an association or ask for access */
export function associationPortalUrl() {
  return new URL("/dashboard/associations", env.ADMIN_URL || "https://admin.polinetwork.org").href
}
