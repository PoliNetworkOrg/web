import { env } from "@/env.server"
import { parseExtraLinks } from "@/lib/association-links"
import { trpc } from "@/lib/backend.server"

export async function getAllAssociations() {
  try {
    const associations = await trpc.web.associations.getAllAssociations.query()
    // The published SDK predates repeated platform links. Validate the additive field, with old-server fallback.
    return associations.map((association) => ({
      ...association,
      extraLinks: parseExtraLinks((association as { extraLinks?: unknown }).extraLinks),
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
