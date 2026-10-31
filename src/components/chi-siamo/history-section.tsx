import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { CONTAINER } from "@/components/layout/page"
import { Button } from "@/components/ui/button"

const blocks = [
  {
    title: "Da dove veniamo",
    description: "Dal primo gruppo Telegram, nel 2016, a una rete costruita dagli studenti, per gli studenti.",
    cta: "La nostra storia",
    href: "/storia",
  },
  {
    title: "Come siamo organizzati",
    description: "Direttivo, team operativi, admin e soci. Guarda come funziona la macchina dall'interno.",
    cta: "La nostra struttura",
    href: "/about",
  },
] as const

// Figma lays these out as two free columns: in glass cards each held a section title, and the hierarchy broke
export function HistorySection() {
  return (
    <section className={`${CONTAINER} grid gap-16 md:grid-cols-2 md:gap-10 lg:gap-16`}>
      {blocks.map((block) => (
        <div key={block.title} className="flex flex-col items-start gap-5">
          <h2 className="typo-headline-medium lg:typo-display-small text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
            {block.title}
          </h2>
          <p className="typo-body-large max-w-120 text-pretty">{block.description}</p>
          <Button variant="primary" size="lg" className="mt-auto w-fit" asChild>
            <Link href={block.href}>
              {block.cta}
              <FiArrowUpRight aria-hidden />
            </Link>
          </Button>
        </div>
      ))}
    </section>
  )
}
