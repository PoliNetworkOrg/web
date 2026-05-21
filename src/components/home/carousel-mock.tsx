"use client"

import { CardCaption } from "@/components/card-caption"
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from "@/components/ui/carousel"

const mockCards = [
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
    caption: "Scarica ed esegui lo script Python per attivare la connessione permanente al WiFi Polimi.",
  },
  {
    title: "The TOL Project",
    caption: "Un simulatore gratuito del test di ammissione per le aspiranti matricole di Ingegneria del PoliMi.",
  },
] as const

// TODO: delete this when merging
export function CarouselMock() {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-16 px-7.5">
      <h1 className="typo-headline-medium sm:typo-display-large bg-linear-to-r from-text-primary via-blue-secondary to-blue-primary bg-clip-text text-transparent">
        PoliNetwork
      </h1>

      <Carousel className="w-full">
        <CarouselContent>
          {mockCards.map((card) => (
            <CarouselItem key={card.title}>
              <div className="flex justify-center">
                <CardCaption {...card} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots className="mt-8" />
      </Carousel>
    </section>
  )
}
