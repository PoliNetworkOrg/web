import { FiLogIn } from "react-icons/fi"
import type { CardResourceProps } from "@/components/card-resource/types"
import { CardCaption } from "@/components/card-caption"
import GuideContent from "@/components/guides/content"
import { GuideContentMobile } from "@/components/guides/content-mobile"
import { Hero } from "@/components/ui/hero"

const guidesInfo = {
  title: "Le guide per Ingegneria Informatica",
  description: "Rimani aggiornato sulle idee appena condivise dagli studenti del Politecnico",
  guides: [
    {
      text: "Corsi a scelta Primo Anno",
    },
    {
      text: "Corsi a scelta Secondo Anno",
    },
    {
      text: "Corsi a scelta Terzo Anno",
    },
  ],
}

const guidesGeneral = {
  title: "Le guide generali",
  description: "Consulta le guide generali per orientarti al meglio nella vita universitaria",
  guides: [
    {
      text: "Guida a Webex",
    },
    {
      text: "Guida alla connessione alla rete del Polimi",
    },
  ],
}

const guidesInfoMobile: CardResourceProps[] = [
  {
    title: "Chimica Generale",
    description: "È un esame che tratta tutti argomenti già visti in qualsiasi liceo scientifico...",
    tag: {
      text: "Teorico",
      variant: "primary"
    },
    author: "Giulia M.",
    date: "Ott 24",
    href: "/guides",
  },
  {
    title: "Chimica",
    description: "È un esame che tratta tutti argomenti già visti in qualsiasi liceo scientifico...",
    tag: [
      {
        text: "Teorico",
        variant: "primary"
      },
      {
        text: "2 Anno",
        variant: "secondary"
      }
    ],
    author: "Giulia M.",
    date: "Ott 24",
    href: "/guides",
  },
  {
    title: "Generale",
    description: "È un esame che tratta tutti argomenti già visti in qualsiasi liceo scientifico...",
    tag: {
      text: "Teorico",
      variant: "primary"
    },
    author: "Giulia M.",
    date: "Ott 24",
    href: "/guides",
  },
]

const guidesMobile = {
  title: "Trova le guide del tuo corso",
  caption: "Una raccolta di guide scritte dagli studenti del tuo corso",
  icon: FiLogIn,
}

export default function GuidePage() {
  return (
    <section className="flex min-h-screen w-full max-w-350 flex-col gap-32 px-12 pt-58 pb-18 sm:gap-48">
      <Hero title="Guide" description="Una raccolta di guide realizzate dai membri del Network" />

      {/* Desktop */}
      <div className="hidden w-full flex-col gap-28 sm:flex">
        <GuideContent {...guidesInfo} />

        <GuideContent {...guidesGeneral} />
      </div>

      {/* Mobile */}
      <div className="flex w-full flex-col items-center gap-32 sm:hidden">
        <CardCaption {...guidesMobile} />

        <GuideContentMobile title="Guide Generali" guides={guidesInfoMobile} />
      </div>
    </section>
  )
}
