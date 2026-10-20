"use server"

import { trpc } from "@/lib/backend"

export async function getFreshmanContent() {
  try {
    return await trpc.web.freshman.getContent.query()
  } catch (error) {
    console.error("Failed to fetch freshman content", error)
    return null
  }
}
