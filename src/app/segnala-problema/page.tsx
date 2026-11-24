import type { Metadata } from "next"
import { FLOW_MAIN, FlowHeader } from "@/components/layout/flow-header"
import { ProblemReportForm } from "@/components/problem-report/form"

export const metadata: Metadata = {
  title: "Segnala un problema",
  description: "Segnala un problema del sito al team IT di PoliNetwork e lascia un’email a cui ricontattarti.",
}

export default function ReportProblemPage() {
  return (
    <main className={FLOW_MAIN}>
      <FlowHeader
        title="Segnala un problema"
        subtitle="Raccontaci cosa non funziona. Il team IT riceverà la tua segnalazione."
        backHref="/"
      />
      <ProblemReportForm />
    </main>
  )
}
