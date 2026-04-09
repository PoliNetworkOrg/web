import { FiBook, FiBookOpen, FiClipboard, FiFileText, FiPenTool, FiTriangle, FiUploadCloud } from "react-icons/fi"
import { CardIcon } from "@/components/card-icon"
import { CardList } from "@/components/card-list"
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

const cardListSections = [
  {
    title: "Corsi a scelta Secondo Anno",
    paragraphs: [
      `Questa guida è stata redatta dagli admin di Ingegneria Informatica di PoliNetwork, raccogliendo opinioni di diversi studenti che hanno frequentato il corso. Ogni paragrafo è un'opinione. Cliccate sul nome del corso per aprirne la pagina e leggere il programma dettagliato. Essendo, il secondo anno, in comune con Telecomunicazioni, è qui che, sulla base delle scelte tra i vari esami, si decide quale percorso intraprendere tra i due.

In particolare, nel primo semestre è presente, nel piano, un gruppo da 10CFU da comporre nel seguente modo a seconda del percorso scelto :

Informatica: LOGICA E ALGEBRA (5CFU) + (una a scelta tra CHIMICA GENERALE, ONDE ELETTROMAGNETICHE E MEZZI TRASMISSIVI e MISURE) (5CFU)

Telecomunicazioni: ELETTROMAGNETISMO (10CFU)`,
    ],
  },
] as const

const cardListItems = [
  {
    label: "Misure",
    paragraphs: [
      "Dall'ultima riforma del Regolamento Didattico del Corso di Studio in Ingegneria Informatica (Laurea Di Primo Livello) l'esame di Chimica Generale NON è più l'unico corso che permette di accedere alla magistrale in CS (al Polimi) senza dover svolgere Fisica Tecnica al secondo semestre del terzo anno. Ora un qualsiasi corso del gruppo TABA soddisfa il vincolo, quindi si può scegliere liberamente tra Chimica Generale, Fisica Tecnica, Misure e Onde Elettromagnetiche e Mezzi Trasmissivi. Nel caso in cui al secondo anno si scegliesse Elettromagnetismo e Campi da 10 cfu, al terzo anno si ha l'obbligo di inserire Logica e Algebra (gruppo TABREC) siccome è un corso obbligatorio per l'indirizzo I3I (informatica).",
    ],
  },
  {
    label: "Onde Elettromagnetiche e mezzi trasmissivi",
    paragraphs: [
      "Dall'ultima riforma del Regolamento Didattico del Corso di Studio in Ingegneria Informatica (Laurea Di Primo Livello) l'esame di Chimica Generale NON è più l'unico corso che permette di accedere alla magistrale in CS (al Polimi) senza dover svolgere Fisica Tecnica al secondo semestre del terzo anno. Ora un qualsiasi corso del gruppo TABA soddisfa il vincolo, quindi si può scegliere liberamente tra Chimica Generale, Fisica Tecnica, Misure e Onde Elettromagnetiche e Mezzi Trasmissivi. Nel caso in cui al secondo anno si scegliesse Elettromagnetismo e Campi da 10 cfu, al terzo anno si ha l'obbligo di inserire Logica e Algebra (gruppo TABREC) siccome è un corso obbligatorio per l'indirizzo I3I (informatica).",
    ],
  },
  {
    label: "Chimica Generale",
    paragraphs: [
      "Dall'ultima riforma del Regolamento Didattico del Corso di Studio in Ingegneria Informatica (Laurea Di Primo Livello) l'esame di Chimica Generale NON è più l'unico corso che permette di accedere alla magistrale in CS (al Polimi) senza dover svolgere Fisica Tecnica al secondo semestre del terzo anno. Ora un qualsiasi corso del gruppo TABA soddisfa il vincolo, quindi si può scegliere liberamente tra Chimica Generale, Fisica Tecnica, Misure e Onde Elettromagnetiche e Mezzi Trasmissivi. Nel caso in cui al secondo anno si scegliesse Elettromagnetismo e Campi da 10 cfu, al terzo anno si ha l'obbligo di inserire Logica e Algebra (gruppo TABREC) siccome è un corso obbligatorio per l'indirizzo I3I (informatica).",
    ],
  },
] as const

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <div className="mx-auto max-w-5xl px-4 py-12">
        <CardList sections={cardListSections} items={cardListItems} />
      </div>
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
    </main>
  )
}
