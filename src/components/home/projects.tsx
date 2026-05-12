import { FiArrowUpRight, FiBookOpen, FiUploadCloud } from "react-icons/fi"
import { CardIcon } from "@/components/card-icon"
import { Button } from "@/components/ui/button"

const featuredCards = [
  {
    title: "WeBeepSync",
    description:
      "WeBeep Sync è una semplice app, user-friendly e senza compromessi che serve per tenere sincronizzati tutti i tuoi file di WeBeep.",
    icon: FiUploadCloud,
    size: "md",
  },
  {
    title: "PolimiSchedule",
    description:
      "Genera un file iCalendar (.ics) a partire dal formato testuale dell’Orario delle lezioni. Possibilità di importare su Google Calendar.",
    icon: FiBookOpen,
    size: "md",
  },
  {
    title: "WiFiLinux",
    description: "Scarica ed esegui lo script Python per attivare la connessione permanente al WiFi Polimi",
    icon: FiBookOpen,
    size: "md",
  },
  {
    title: "The TOL Project",
    description: "Un simulatore gratuito del test di ammissione per le aspiranti matricole di Ingegneria del PoliMi.",
    icon: FiBookOpen,
    size: "md",
  },
] as const

export function Projects() {
  return (
    <section className="mx-auto flex max-w-400 flex-col gap-24 p-11 md:px-20 md:py-28 2xl:flex-row 2xl:items-start 2xl:gap-32">
      <div className="flex flex-col items-center gap-8 text-center md:items-start md:text-start">
        <h2 className="typo-display-large md:typo-display-extralarge whitespace-nowrap bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent md:py-4">
          15+ Projects
        </h2>
        <p className="typo-body-large hidden max-w-lg md:block">
          Progetti e strumenti creati dalla nostra community. Qui trovi le iniziative nate dagli studenti del
          Politecnico per semplificare la vita universitaria e creare innovazione. Hai un'idea o un progetto? Proponilo!
          Puoi trovare collaboratori, ricevere supporto dal nostro team e dare vita alla tua soluzione.
        </p>
        <p className="typo-body-large max-w-lg md:hidden">
          Progetti e strumenti nati dalla community del Politecnico per semplificare la vita universitaria e promuovere
          l’innovazione. Hai un’idea? Proponila, trova collaboratori e realizza la tua soluzione.
        </p>
        <Button variant="primary" size="lg" className="w-fit">
          Esplora la raccolta
          <FiArrowUpRight />
        </Button>
      </div>

      <div className="flex flex-col gap-6 lg:gap-10 2xl:pt-30">
        <div className="grid grid-cols-2 gap-6 xl:grid-cols-4 2xl:grid-cols-2">
          {featuredCards.map((card) => (
            <CardIcon key={card.title} {...card} href="#" className="h-full" />
          ))}
        </div>
      </div>
    </section>
  )
}
