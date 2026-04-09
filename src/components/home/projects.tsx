import { FiArrowUpRight, FiBookOpen, FiUploadCloud } from "react-icons/fi"
import { CardIcon } from "@/components/card-icon"
import { Button } from "@/components/ui/button"

const featuredCards = [
  {
    title: "WeBeepSync",
    description:
      "WeBeep Sync è una semplice app, user-friendly e senza compromessi che serve per tenere sincronizzati tutti i tuoi file di WeBeep.",
    icon: FiUploadCloud,
    //buttonText: "Sincronizza ora",
    size: "sm",
  },
  {
    title: "PolimiSchedule",
    description:
      "Genera un file iCalendar (.ics) a partire dal formato testuale dell’Orario delle lezioni. Possibilità di importare su Google Calendar.",
    icon: FiBookOpen,
    // buttonText: "Organizza",
    size: "sm",
  },
  {
    title: "WiFiLinux",
    description: "Scarica ed esegui lo script Python per attivare la connessione permanente al WiFi Polimi",
    icon: FiBookOpen,
    // buttonText: "Connetti ora",
    size: "sm",
  },
  {
    title: "The TOL Project",
    description: "Un simulatore gratuito del test di ammissione per le aspiranti matricole di Ingegneria del PoliMi.",
    icon: FiBookOpen,
    // buttonText: "Apri Simulatore",
    size: "sm",
  },
] as const

export function Projects() {
  return (
    <section className="mx-auto grid sm:px-46 sm:py-28 lg:grid-cols-2 lg:items-start">
      <div className="flex flex-col items-start gap-8 lg:justify-self-start">
        <h2 className="typo-display-medium md:typo-display-large lg:typo-display-extralarge w-fit bg-linear-to-b from-text-primary to-text-secondary bg-clip-text py-10 text-transparent">
          15+ Projects
        </h2>
        <p className="typo-body-large max-w-xl">
          Progetti e strumenti creati dalla nostra community. Qui trovi le iniziative nate dagli studenti del
          Politecnico per semplificare la vita universitaria e creare innovazione. Hai un'idea o un progetto? Proponilo!
          Puoi trovare collaboratori, ricevere supporto dal nostro team e dare vita alla tua soluzione.
        </p>
        <Button variant="primary" size="lg" className="w-fit">
          Esplora la raccolta
          <FiArrowUpRight />
        </Button>
      </div>

      <div className="flex flex-col gap-6 lg:gap-10 lg:pt-44">
        <div className="grid gap-6 md:grid-cols-2 md:gap-20">
          {featuredCards.map((card) => (
            <CardIcon key={card.title} {...card} href="#" className="h-full" />
          ))}
        </div>
      </div>
    </section>
  )
}
