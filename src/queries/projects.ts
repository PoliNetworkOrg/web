"use server"

import { trpc } from "@/lib/backend"

export async function getAllProjects() {
  try {
    return await trpc.web.projects.getAllProjects.query()
  } catch (error) {
    console.error("Failed to fetch projects", error)
    return []
  }
}
