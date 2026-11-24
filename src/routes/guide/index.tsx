import { createFileRoute } from "@tanstack/react-router"
import { FiBook, FiFileText } from "react-icons/fi"
import { CardIcon } from "@/components/card-icon"
import { CONTAINER, PAGE_HERO, PAGE_MAIN } from "@/components/layout/page"
import { Hero } from "@/components/ui/hero"
import { pageMeta, STATIC_PAGE_HEADERS } from "@/lib/seo"

const guides = [
  {
    title: "Guide Generali",
    caption: "Informazioni utili su segreterie, servizi, immatricolazione e vita al Politecnico.",
    href: "/guide/generali",
    icon: FiFileText,
    cta: "Esplora",
  },
  {
    title: "Guide del tuo Corso",
    caption: "Piani di studio, esami e tutto ciò che riguarda il tuo corso di studi.",
    href: "/guide/corso",
    icon: FiBook,
    cta: "Inizia",
  },
] as const

export const Route = createFileRoute("/guide/")({
  head: () => ({
    meta: pageMeta({
      title: "Guide",
      description: "Esplora le guide del Politecnico di Milano, da quelle generali a quelle del tuo corso di studi.",
    }),
  }),
  headers: () => STATIC_PAGE_HEADERS,
  component: GuidesHome,
})

function GuidesHome() {
  return (
    <main className={PAGE_MAIN}>
      <section className={`${CONTAINER} ${PAGE_HERO}`}>
        <Hero title="Guide" description="Una raccolta di guide realizzate dai membri del Network" />
      </section>

      {/* Two equal paths: same height, side by side from sm, and the whole card is the link */}
      <section className={CONTAINER}>
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 sm:gap-6">
          {guides.map((guide) => (
            <CardIcon
              key={guide.title}
              title={guide.title}
              description={guide.caption}
              href={guide.href}
              icon={guide.icon}
              cta={guide.cta}
              align="start"
              size="compact"
              hoverEffect
              className="h-full"
            />
          ))}
        </div>
      </section>
    </main>
  )
}
