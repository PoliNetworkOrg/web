import { createFileRoute } from "@tanstack/react-router"
import { AnswerSection } from "@/components/chi-siamo/answer-section"
import { HistorySection } from "@/components/chi-siamo/history-section"
import { NumbersSection } from "@/components/chi-siamo/numbers-section"
import { PathSection } from "@/components/chi-siamo/path-section"
import { ProblemSection } from "@/components/chi-siamo/problem-section"
import { SupportSection } from "@/components/chi-siamo/support-section"
import { VisionSection } from "@/components/chi-siamo/vision-section"
import { PAGE_MAIN } from "@/components/layout/page"
import { pageMeta, STATIC_PAGE_HEADERS } from "@/lib/seo"

export const Route = createFileRoute("/chi-siamo")({
  head: () => ({
    meta: pageMeta({
      title: "Su di noi",
      description: "Rendiamo le informazioni sul PoliMi più semplici.",
    }),
  }),
  headers: () => STATIC_PAGE_HEADERS,
  component: ChiSiamoPage,
})

function ChiSiamoPage() {
  return (
    <main className={PAGE_MAIN}>
      <VisionSection />
      <ProblemSection />
      <AnswerSection />
      <PathSection />
      <NumbersSection />
      <HistorySection />
      <SupportSection />
    </main>
  )
}
