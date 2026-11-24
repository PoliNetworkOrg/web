import { trpc } from "@/lib/backend.server"

export async function getAcknowledgements() {
  try {
    return await trpc.web.acknowledgements.getAll.query()
  } catch (error) {
    console.error("Failed to fetch acknowledgements", error)
    return { website: [], projects: [] }
  }
}
