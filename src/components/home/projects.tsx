import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { CardCaption } from "@/components/card-caption"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from "../ui/carousel"

const featuredCards = [
  {
    title: "WeBeepSync",
    caption:
      "WeBeep Sync è una semplice app, user-friendly e senza compromessi che serve per tenere sincronizzati tutti i tuoi file di WeBeep.",
    href: "https://github.com/toto04/webeep-sync",
  },
  {
    title: "PolimiSchedule",
    caption:
      "Genera un file iCalendar (.ics) a partire dal formato testuale dell’Orario delle lezioni. Possibilità di importare su Google Calendar.",
    href: "https://github.com/jacopo-j/polimi-schedule",
  },
  {
    title: "WiFiLinux",
    caption: "Scarica ed esegui lo script Python per attivare la connessione permanente al WiFi Polimi",
    href: "https://github.com/PoliNetworkOrg/WiFiLinux",
  },
  {
    title: "The TOL Project",
    caption: "Un simulatore gratuito del test di ammissione per le aspiranti matricole di Ingegneria del PoliMi.",
    href: "https://tol.polinetwork.org/",
  },
] as const

function ProjectCard({ className, ...card }: (typeof featuredCards)[number] & { className?: string }) {
  return (
    <CardCaption
      {...card}
      className={className}
      // Figma reserves the bottom-right corner for an action: show where the card leads
      footer={
        <span className="typo-label-large flex items-center justify-end gap-1 text-blue-secondary">
          {new URL(card.href).hostname}
          <FiArrowUpRight className="size-4" />
        </span>
      }
    />
  )
}

export function Projects() {
  return (
    <section className="mx-auto grid w-full max-w-384 grid-cols-1 gap-y-6 px-6 py-20 sm:gap-y-8 sm:px-10 sm:py-24 lg:px-16 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] xl:gap-x-16 xl:gap-y-10 xl:py-32">
      <h2 className="typo-display-fluid-extralarge bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-center text-transparent xl:col-span-2 xl:text-start">
        15+ Projects
      </h2>

      <div className="flex flex-col items-center gap-8 text-center xl:items-start xl:text-start">
        <p className="typo-body-large hidden max-w-xl sm:block">
          Progetti e strumenti creati dalla nostra community. Qui trovi le iniziative nate dagli studenti del
          Politecnico per semplificare la vita universitaria e creare innovazione. Hai un'idea o un progetto? Proponilo!
          Puoi trovare collaboratori, ricevere supporto dal nostro team e dare vita alla tua soluzione.
        </p>
        <p className="typo-body-large max-w-lg sm:hidden">
          Progetti e strumenti nati dalla community del Politecnico per semplificare la vita universitaria e promuovere
          l’innovazione. Hai un’idea? Proponila, trova collaboratori e realizza la tua soluzione.
        </p>
        <Button variant="primary" size="lg" className="w-fit" asChild>
          <Link href="/projects">
            Esplora la raccolta
            <FiArrowUpRight />
          </Link>
        </Button>
      </div>

      <div className="mx-auto hidden w-full max-w-4xl auto-rows-fr gap-6 pt-8 sm:grid sm:grid-cols-2 xl:max-w-none xl:pt-0">
        {featuredCards.map((card) => (
          <ProjectCard key={card.title} {...card} className="h-auto w-full p-6" />
        ))}
      </div>

      {/* Mobile: the next card peeks in from the edge, so the row reads as scrollable */}
      <div className="-mx-6 pt-6 sm:hidden">
        <Carousel opts={{ align: "start" }}>
          <CarouselContent className="mr-6 ml-2">
            {featuredCards.map((card) => (
              <CarouselItem key={card.title} className="basis-[85%]">
                <ProjectCard {...card} className="h-full w-full p-6" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots className="mt-6" />
        </Carousel>
      </div>
    </section>
  )
}
