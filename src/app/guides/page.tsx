import type { Metadata } from "next"
import { FiBook, FiFileText } from "react-icons/fi"
import { CardIcon } from "@/components/card-icon"

const guides = [
  {
    title: "Guide Generali",
    caption: "Informazioni utili su segreterie, servizi, immatricolazione e vita al Politecnico.",
    href: "/guides/generali",
    icon: FiFileText,
    cta: "Esplora",
  },
  {
    title: "Guide del tuo Corso",
    caption: "Piani di studio, esami e tutto ciò che riguarda il tuo corso di studi.",
    href: "/guides/corso",
    icon: FiBook,
    cta: "Inizia",
  },
] as const

export const metadata: Metadata = {
  title: "Guide",
  description: "Esplora le guide del Politecnico di Milano, da quelle generali a quelle del tuo corso di studi.",
}

export default function GuidesHome() {
  return (
    <main className="w-full">
      <div className="flex min-h-svh flex-col items-center gap-16 px-6 py-64 md:gap-20 md:py-49">
        <div className="flex w-full flex-col items-center gap-5 text-center">
          <h2 className="typo-display-large md:typo-display-extralarge w-fit bg-linear-to-b from-text-primary to-text-secondary bg-clip-text py-4 text-transparent md:py-14">
            Guide
          </h2>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row md:gap-13">
          {guides.map((guide) => (
            <CardIcon
              key={guide.title}
              title={guide.title}
              description={guide.caption}
              href={guide.href}
              icon={guide.icon}
              cta={guide.cta}
              align="start"
              className="w-full max-w-108"
              size="compact"
            />
          ))}
        </div>
      </div>
    </main>
  )
}
