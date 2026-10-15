import type { Metadata } from "next"
import { AnswerSection } from "@/components/chi-siamo/answer-section"
import { HistorySection } from "@/components/chi-siamo/history-section"
import { NumbersSection } from "@/components/chi-siamo/numbers-section"
import { PathSection } from "@/components/chi-siamo/path-section"
import { ProblemSection } from "@/components/chi-siamo/problem-section"
import { SupportSection } from "@/components/chi-siamo/support-section"
import { VisionSection } from "@/components/chi-siamo/vision-section"
import {
  ChiSiamoAnswerShapes,
  ChiSiamoHistoryShapes,
  ChiSiamoNumbersShapes,
  ChiSiamoPathShapes,
  ChiSiamoProblemShapes,
  ChiSiamoVisionShapes,
} from "./shapes"

export const metadata: Metadata = {
  title: "Su di noi",
  description: "Rendiamo le informazioni sul PoliMi più accessibili, comprensibili e facili da trovare.",
}

export default function ChiSiamoPage() {
  return (
    // Narrower content column (1200px, as in Figma): `page-container` caps its padding on this variable
    <main className="flex w-full flex-col gap-section pb-section [--container-page:75rem]">
      <div className="relative">
        <ChiSiamoVisionShapes />
        <VisionSection />
      </div>
      <div className="relative">
        <ChiSiamoProblemShapes />
        <ProblemSection />
      </div>
      <div className="relative">
        <ChiSiamoAnswerShapes />
        <AnswerSection />
      </div>
      <div className="relative">
        <ChiSiamoPathShapes />
        <PathSection />
      </div>
      <div className="relative">
        <ChiSiamoNumbersShapes />
        <NumbersSection />
      </div>
      <div className="relative">
        <ChiSiamoHistoryShapes />
        <HistorySection />
      </div>
      <SupportSection />
    </main>
  )
}
