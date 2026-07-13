"use server"

import { trpc } from "@/lib/backend"

export async function getLatestGuidaMatricola() {
  const guide = await trpc.web.guides_matricole.getLatestGuide.query().catch(() => null)
  if (!guide) return null

  return { version: guide.version, date: guide.date, url: guide.file }
}
