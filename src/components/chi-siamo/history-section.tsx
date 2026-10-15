import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { Button } from "@/components/ui/button"

const blocks = [
  {
    title: "Da dove veniamo",
    description: "Dieci anni fa eravamo ....",
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

export function HistorySection() {
  return (
    <section className="page-container grid gap-section md:grid-cols-2 md:gap-block">
      {blocks.map((block) => (
        <div key={block.title} className="flex flex-col items-center gap-6 text-center md:items-start md:text-start">
          <h2 className="typo-headline-medium md:typo-display-medium bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
            {block.title}
          </h2>
          <p className="typo-body-large md:typo-headline-small">{block.description}</p>
          <Button variant="primary" size="lg" className="w-fit" asChild>
            <Link href={block.href} className="flex items-center gap-2">
              {block.cta}
              <FiArrowUpRight />
            </Link>
          </Button>
        </div>
      ))}
    </section>
  )
}
