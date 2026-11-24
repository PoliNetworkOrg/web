import { createFileRoute } from "@tanstack/react-router"
import { serveDocumentFile } from "@/queries/document-file.server"

export const Route = createFileRoute("/documenti/file/$slug")({
  server: {
    handlers: {
      GET: ({ request, params }) => serveDocumentFile(request, params.slug),
    },
  },
})
