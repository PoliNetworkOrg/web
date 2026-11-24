import { trpc } from "@/lib/backend.server"

export async function getAllAssociations() {
  try {
    return await trpc.web.associations.getAllAssociations.query()
  } catch (error) {
    console.error("Failed to fetch associations", error)
    return []
  }
}
