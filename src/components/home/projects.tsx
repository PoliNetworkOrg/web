import { FiArrowUpRight } from "react-icons/fi"
import { CardCaption } from "@/components/card-caption"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from "../ui/carousel"

const featuredCards = [
  {
    title: "WeBeepSync",
    caption:
      "WeBeep Sync è una semplice app, user-friendly e senza compromessi che serve per tenere sincronizzati tutti i tuoi file di WeBeep.",
  },
  {
    title: "PolimiSchedule",
    caption:
      "Genera un file iCalendar (.ics) a partire dal formato testuale dell’Orario delle lezioni. Possibilità di importare su Google Calendar.",
  },
  {
    title: "WiFiLinux",
    caption: "Scarica ed esegui lo script Python per attivare la connessione permanente al WiFi Polimi",
  },
  {
    title: "The TOL Project",
    caption: "Un simulatore gratuito del test di ammissione per le aspiranti matricole di Ingegneria del PoliMi.",
  },
] as const

export function Projects() {
  return (
    <section className="mx-auto flex max-w-400 flex-col gap-24 p-11 py-40 sm:px-20 2xl:flex-row 2xl:items-start 2xl:gap-32">
      <div className="flex flex-col items-center gap-8 text-center sm:items-start sm:text-start">
        <h2 className="typo-display-large sm:typo-display-extralarge bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent leading-[0.8] sm:py-6 md:whitespace-nowrap">
          15+ Projects
        </h2>
        <p className="typo-body-large hidden max-w-lg sm:block">
          Progetti e strumenti creati dalla nostra community. Qui trovi le iniziative nate dagli studenti del
          Politecnico per semplificare la vita universitaria e creare innovazione. Hai un'idea o un progetto? Proponilo!
          Puoi trovare collaboratori, ricevere supporto dal nostro team e dare vita alla tua soluzione.
        </p>
        <p className="typo-body-large max-w-lg sm:hidden">
          Progetti e strumenti nati dalla community del Politecnico per semplificare la vita universitaria e promuovere
          l’innovazione. Hai un’idea? Proponila, trova collaboratori e realizza la tua soluzione.
        </p>
        <Button variant="primary" size="lg" className="w-fit">
          Esplora la raccolta
          <FiArrowUpRight />
        </Button>
      </div>

      <div className="hidden flex-col gap-6 sm:flex lg:gap-10 2xl:pt-30">
        <div className="grid grid-cols-2 gap-6 xl:grid-cols-4 2xl:grid-cols-2">
          {featuredCards.map((card) => (
            <CardCaption key={card.title} {...card} className="w-full" />
          ))}
        </div>
      </div>

      <div className="flex w-full items-center justify-center sm:hidden">
        <Carousel className="w-full">
          <CarouselContent>
            {featuredCards.map((card) => (
              <CarouselItem key={card.title}>
                <div className="flex justify-center">
                  <CardCaption {...card} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots className="mt-8" />
        </Carousel>
      </div>
    </section>
  )
}
