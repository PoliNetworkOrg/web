import Link from "next/link"
import { FiArrowUpRight, FiClock, FiUsers } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { GradientIcon } from "@/components/gradient-icon"
import { Button } from "@/components/ui/button"

const blocks = [
  {
    title: "Da dove veniamo",
    description: "Dal primo gruppo Telegram, nel 2016, a una rete costruita dagli studenti, per gli studenti.",
    icon: FiClock,
    cta: "La nostra storia",
    href: "/storia",
  },
  {
    title: "Come siamo organizzati",
    icon: FiUsers,
    description: "Direttivo, team operativi, admin e soci. Guarda come funziona la macchina dall'interno.",
    cta: "La nostra struttura",
    href: "/about",
  },
] as const

export function HistorySection() {
  return (
    <section className="page-container grid gap-6 md:grid-cols-2">
      {blocks.map((block) => (
        <Glass key={block.title} className="flex flex-col items-start gap-6 rounded-rectangles p-6 sm:p-8">
          <GradientIcon icon={block.icon} className="size-10" />
          <h2 className="typo-headline-medium text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
            {block.title}
          </h2>
          <p className="typo-body-large text-pretty">{block.description}</p>
          <Button variant="primary" size="lg" className="mt-auto w-fit" asChild>
            <Link href={block.href} className="flex items-center gap-2">
              {block.cta}
              <FiArrowUpRight aria-hidden />
            </Link>
          </Button>
        </Glass>
      ))}
    </section>
  )
}
