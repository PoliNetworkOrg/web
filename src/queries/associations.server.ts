import { z } from "zod"
import { trpc } from "@/lib/backend.server"

const extraLinksSchema = z.object({
  extraLinks: z
    .array(
      z.object({
        platform: z.string(),
        label: z.string(),
        url: z.url().refine((url) => /^https?:\/\//i.test(url)),
      })
    )
    .optional(),
})

export async function getAllAssociations() {
  try {
    const associations = await trpc.web.associations.getAllAssociations.query()
    // The published SDK predates repeated platform links. Validate the additive field, with old-server fallback.
    return associations.map((association) => ({
      ...association,
      extraLinks: extraLinksSchema.parse(association).extraLinks,
    }))
  } catch (error) {
    console.error("Failed to fetch associations", error)
    return []
  }
}
