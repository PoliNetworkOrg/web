import { createFileRoute } from "@tanstack/react-router"
import { FLOW_MAIN, FlowHeader } from "@/components/layout/flow-header"
import { ProblemReportForm } from "@/components/problem-report/form"
import type { ReportState } from "@/components/problem-report/schema"
import { submitProblemReport } from "@/components/problem-report/submit.server"
import { DYNAMIC_PAGE_HEADERS, pageMeta, STATIC_PAGE_HEADERS } from "@/lib/seo"

const idle: ReportState = { status: "idle" }

export const Route = createFileRoute("/segnala-problema")({
  server: {
    handlers: {
      // Without JavaScript the form posts here: the report is handled, then the page is rendered with its outcome
      // (the confirmation, or the form with the errors and what the person wrote).
      POST: async ({ request, next }) => {
        // Browsers send `Origin` with a form post: one from another site is not the person using this form
        const origin = request.headers.get("origin")
        if (origin && new URL(origin).host !== (request.headers.get("x-forwarded-host") ?? request.headers.get("host")))
          return new Response("Forbidden", { status: 403, headers: { "Cache-Control": "no-store" } })
        const submitted = await submitProblemReport(await request.formData())
        return next({ context: { submitted } })
      },
    },
  },
  // `serverContext` is what the POST handler passed on: it exists only while the server renders the answer to a form
  loader: ({ serverContext }): ReportState => serverContext?.submitted ?? idle,
  head: () => ({
    meta: pageMeta({
      title: "Segnala un problema",
      description: "Segnala un problema del sito al team IT di PoliNetwork e lascia un’email a cui ricontattarti.",
    }),
  }),
  headers: ({ loaderData }) => (loaderData?.status === "idle" ? STATIC_PAGE_HEADERS : DYNAMIC_PAGE_HEADERS),
  component: ReportProblemPage,
})

function ReportProblemPage() {
  return (
    <main className={FLOW_MAIN}>
      <FlowHeader
        title="Segnala un problema"
        subtitle="Raccontaci cosa non funziona. Il team IT riceverà la tua segnalazione."
        backHref="/"
      />
      <ProblemReportForm submitted={Route.useLoaderData()} />
    </main>
  )
}
