import type { Metadata } from "next"
import type { CardResourceProps } from "@/components/card-resource/types"
import GuideFind from "@/components/guides/guide-find"
import GuideContent from "@/components/guides/guide-general"
import { Hero } from "@/components/ui/hero"

export const metadata: Metadata = {
  title: "Guide",
  description: "Una raccolta di guide realizzate dai membri del Network",
}


const guidesInfo: CardResourceProps[] = [
  {
    title: "Chimica Generale",
    description: "È un esame che tratta tutti argomenti già visti in qualsiasi liceo scientifico...",
    tag: {
      text: "Teorico",
      variant: "primary",
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
        variant: "primary",
      },
      {
        text: "2 Anno",
        variant: "secondary",
      },
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
      variant: "primary",
    },
    author: "Giulia M.",
    date: "Ott 24",
    href: "/guides",
  },
]

export default function GuidePage() {
  return (
    <section className="flex min-h-screen w-full max-w-350 flex-col gap-32 px-12 pt-58 pb-18 sm:gap-48">
      <Hero title="Guide" description="Una raccolta di guide realizzate dai membri del Network" />

      <GuideFind />
      <GuideContent title="Guide Generali" guides={guidesInfo} />

    </section>
  )
}
