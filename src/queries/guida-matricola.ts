"use server"

// TODO: sostituire questo
const LATEST_GUIDA_MATRICOLA = {
  version: "1.0.0",
  publishedAt: "2025-09-01",
  url: "/guides/guida-matricola.pdf",
}

export async function getLatestGuidaMatricola() {
  return LATEST_GUIDA_MATRICOLA
}
