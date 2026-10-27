import { FiEdit, FiFileText, FiUsers } from "react-icons/fi"
import { GradientIcon } from "@/components/gradient-icon"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "./constants"

const questions = [
  { text: "Dove trovo il gruppo del mio corso?", icon: FiUsers },
  { text: "Come funziona il piano degli studi?", icon: FiFileText },
  { text: "Cosa succede se non passo l’OFA di inglese?", icon: FiEdit },
] as const

export function ProblemSection() {
  return (
    <section className={`${CONTAINER} grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16`}>
      <div className="flex min-w-0 flex-col gap-6">
        <h2 className={SECTION_TITLE}>Il problema</h2>
        <p className={SECTION_LEAD}>Il PoliMi è complesso. Le informazioni non dovrebbero esserlo.</p>
      </div>
      {/* Questions students ask, not actions: compact chips, icon first, no hover */}
      <ul className="grid min-w-0 justify-items-start gap-3">
        {questions.map((question) => (
          <li
            key={question.text}
            className="flex items-center gap-4 rounded-rectangles border border-white/50 bg-background-blur px-5 py-4 backdrop-blur-md"
          >
            <GradientIcon icon={question.icon} className="size-6 shrink-0" />
            <span className="typo-body-large text-pretty">{question.text}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
