import { BookOpen, Upload } from "lucide-react"
import architectureIcon from "@/assets/icons/architecture.svg"
import designIcon from "@/assets/icons/design.svg"
import { CardIcon } from "@/components/card-icon"
import { Hero } from "@/components/home/hero"

const schoolCards = [
  { title: "Scuola di Architettura", imageSrc: architectureIcon, showArrow: false },
  { title: "Scuola di Design", imageSrc: designIcon, showArrow: true },
] as const

const materialCards = [
  {
    title: "Carica",
    description:
      "Hai appunti, dispense o temi d'esame che vuoi condividere? Caricali qui! Il tuo contributo è prezioso per aiutare migliaia di colleghi con materiale aggiornato!",
    icon: Upload,
  },
  {
    title: "Visualizza",
    description:
      "Cerca ciò che ti serve per il tuo prossimo esame. Naviga tra i corsi di studio e trova facilmente appunti, esercizi e dispense condivisi da altri studenti come te.",
    icon: BookOpen,
  },
] as const

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-4 py-10 md:px-8">
      <Hero />

      {/* This is just to show the cards */}
      <section className="space-y-5">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {schoolCards.map((card) => (
            <CardIcon key={`${card.title}-side`} variant="school-side" {...card} href="#" hoverEffect />
          ))}

          <CardIcon
            key={`${schoolCards[0].title}-stacked`}
            variant="school-stacked"
            {...schoolCards[0]}
            href="#"
            hoverEffect
          />
        </div>
      </section>

      <section className="space-y-5">
        <div className="grid gap-6 md:grid-cols-2">
          {materialCards.map((card) => (
            <CardIcon
              key={card.title}
              variant="material"
              {...card}
              className="rounded-rectangles border-white/50 bg-background-blur"
            />
          ))}
        </div>
      </section>
    </main>
  )
}
