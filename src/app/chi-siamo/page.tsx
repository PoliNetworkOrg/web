import type { Metadata } from "next"
import { AnswerSection } from "@/components/chi-siamo/answer-section"
import { HistorySection } from "@/components/chi-siamo/history-section"
import { NumbersSection } from "@/components/chi-siamo/numbers-section"
import { PathSection } from "@/components/chi-siamo/path-section"
import { ProblemSection } from "@/components/chi-siamo/problem-section"
import { SupportSection } from "@/components/chi-siamo/support-section"
import { VisionSection } from "@/components/chi-siamo/vision-section"
import { PAGE_MAIN } from "@/components/layout/page"

export const metadata: Metadata = {
  title: "Su di noi",
  description: "Rendiamo le informazioni sul PoliMi più accessibili, comprensibili e facili da trovare.",
}

export default function ChiSiamoPage() {
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
