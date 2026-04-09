import { FaBookBookmark } from "react-icons/fa6"
import { FiBook, FiBookOpen, FiClipboard, FiFileText, FiPenTool, FiTriangle, FiUploadCloud } from "react-icons/fi"
import { CardCaption } from "@/components/card-caption"
import { CardCourseGroup } from "@/components/card-course-group"
import { CardCourse } from "@/components/card-course"
import { CardIcon } from "@/components/card-icon"
import { CardPathSelection } from "@/components/card-path-selection"
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
        <section>
          <CardCourseGroup groupName="Ingegneria Informatica" />
          <CardCourseGroup groupName="Ingegneria Elettronica" secondary />
          <CardCourseGroup groupName="Ingegneria Gestionale" />
          <CardCourseGroup groupName="Ingegneria Meccanica" secondary />
        </section>
        <section className="flex gap-4">
          <CardCourse courseName="Ingegneria Informatica" />
          <CardCourse courseName="Ingegneria Elettrica" />
          <CardCourse courseName="Ingegneria Gestionale" />
          <CardCourse courseName="Ingegneria Chimica" />
        </section>
        <section className="flex flex-row gap-6">
          <CardPathSelection caption="Triennale (o Ciclo Unico)"></CardPathSelection>
          <CardPathSelection caption="Magistrale"></CardPathSelection>
        </section>
        <section className="flex flex-row gap-4">
          <CardCaption
            title="Title"
            caption="Beccatevi questo lorem ipsum dolor sit amet: lorem ipsum dolor sit amet"
            icon={FaBookBookmark}
            iconPosition="right"
          ></CardCaption>
          <CardCaption
            title="CardCaption 2"
            caption="Beccatevi questo lorem ipsum dolor sit amet: lorem ipsum dolor sit amet"
            icon={FaBookBookmark}
            iconPosition="top"
          ></CardCaption>
        </section>
      </div>
    </main>
  )
}
