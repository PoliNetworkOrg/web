import { FiBook, FiBookOpen, FiClipboard, FiFileText, FiPenTool, FiTriangle, FiUploadCloud } from "react-icons/fi"
import { CardCourseGroup } from "@/components/card-course-group"
import { CardIcon } from "@/components/card-icon"
import { Hero } from "@/components/home/hero"

const schoolCards = [
  { title: "Scuola di Architettura", icon: FiTriangle, size: "md" },
  { title: "Scuola di Design", icon: FiPenTool, size: "md" },
  { title: "Scuola di Ingegneria", icon: FiBookOpen, size: "md" },
] as const

const materialCards = [
  {
    title: "Carica",
    description:
      "Hai appunti, dispense o temi d'esame che vuoi condividere? Caricali qui! Il tuo contributo è prezioso per aiutare migliaia di colleghi con materiale aggiornato!",
    icon: FiUploadCloud,
    size: "lg",
  },
  {
    title: "Visualizza",
    description:
      "Cerca ciò che ti serve per il tuo prossimo esame. Naviga tra i corsi di studio e trova facilmente appunti, esercizi e dispense condivisi da altri studenti come te.",
    icon: FiBookOpen,
    size: "lg",
  },
] as const

const otherCards = [
  { title: "Dispense", icon: FiBook, size: "sm" },
  { title: "Appunti", icon: FiFileText, size: "sm" },
  { title: "Esami", icon: FiClipboard, size: "sm" },
] as const

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <section>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {schoolCards.map((card) => (
              <CardIcon key={card.title} {...card} href="#" hoverEffect />
            ))}
          </div>
        </section>
        <section className="flex max-w-4xl flex-col gap-6">
          <div className="grid gap-32 sm:grid-cols-2">
            {materialCards.map((card) => (
              <CardIcon key={card.title} {...card} href="#" />
            ))}
          </div>
          <div className="grid gap-16 sm:grid-cols-3">
            {otherCards.map((card) => (
              <CardIcon key={card.title} {...card} href="#" />
            ))}
          </div>
        </section>
      </div>
      <CardCourseGroup groupName="Ingegneria Informatica" />
    </main>
  )
}
