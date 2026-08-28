"use server"

import { trpc } from "@/lib/backend"

export async function getAllFaqs() {
  try {
    return await trpc.web.faqs.getAllFaqs.query()
  } catch (error) {
    console.error("Failed to fetch faqs", error)
    return []
  }
}
