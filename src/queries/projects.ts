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

export async function getProject(id: number) {
  const projects = await getAllProjects()
  return projects.find((project) => project.id === id) ?? null
}
