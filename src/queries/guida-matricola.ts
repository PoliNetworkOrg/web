"use server"

import { trpc } from "@/lib/backend"

export async function getLatestGuidaMatricola() {
  try {
    const guide = await trpc.web.guides_matricole.getLatestGuide.query()
    if (!guide) return null

    return { version: guide.version, date: guide.date, url: guide.file }
  } catch (error) {
    console.error("Failed to fetch latest guida matricola", error)
    return null
  }
}
