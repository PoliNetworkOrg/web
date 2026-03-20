import { BookOpen, Upload } from "lucide-react"
import { CardIcon } from "@/components/card-icon"
import { Hero } from "@/components/home/hero"

const architectureIcon = "/images/cards/architecture-icon.png"
const designIcon = "/images/cards/design-icon.png"

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-4 py-10 md:px-8">
      <Hero />
      <section className="space-y-5">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CardIcon
            title="Scuola di Architettura"
            imageSrc={architectureIcon}
            imageAlt="Icona Scuola di Architettura"
            href="#"
            showArrow
            hoverEffect
            actionVariant="highlight"
          />

          <CardIcon
            title="Scuola di Design"
            imageSrc={designIcon}
            imageAlt="Icona Scuola di Design"
            href="#"
            showArrow
            hoverEffect
            actionVariant="highlight"
          />
        </div>
      </section>

      <section className="space-y-5">
        <div className="grid gap-6 md:grid-cols-2">
          <CardIcon
            title="Carica"
            description="Hai appunti, dispense o temi d'esame che vuoi condividere? Caricali qui! Il tuo contributo è prezioso per aiutare migliaia di colleghi con materiale aggiornato!"
            icon={Upload}
            className="rounded-rectangles border-white/50 bg-background-blur px-6 py-8"
            mediaClassName="mb-4"
          />

          <CardIcon
            title="Visualizza"
            description="Cerca ciò che ti serve per il tuo prossimo esame. Naviga tra i corsi di studio e trova facilmente appunti, esercizi e dispense condivisi da altri studenti come te."
            icon={BookOpen}
            className="rounded-rectangles border-white/50 bg-background-blur px-6 py-8"
            mediaClassName="mb-4"
          />
        </div>
      </section>
    </main>
  )
}
