import { FiCrop } from "react-icons/fi"
import { CardCaption } from "../card-caption"
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from "../ui/carousel"
import { Hero } from "../ui/hero"

const communityCards = [
  {
    title: "Title 1",
    caption:
      "description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    icon: FiCrop,
    iconPosition: "right",
  },
  {
    title: "Title 2",
    caption:
      "description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    icon: FiCrop,
    iconPosition: "right",
  },
  {
    title: "Title 3",
    caption:
      "description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    icon: FiCrop,
    iconPosition: "right",
  },
  {
    title: "Title 4",
    caption:
      "description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    icon: FiCrop,
    iconPosition: "right",
  },
] as const

export function CommunityNews() {
  return (
    <section className="mx-auto flex min-h-screen max-w-400 flex-col items-center justify-center gap-48 px-4 py-49">
      <Hero title="Projects" description=" Esplora e contribuisci ai progetti degli studenti" />

      <div className="mx-auto flex w-full flex-col gap-14 sm:w-fit">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <h3 className="typo-headline-medium sm:typo-display-medium text-center sm:text-left">
            Le novità della community
          </h3>
          <p className="typo-body-large text-center sm:text-left">
            Rimani aggiornato sulle idee appena condivise dagli studenti del Politecnico
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden 1xl:grid-cols-4 justify-items-center gap-6 md:grid md:grid-cols-2">
          {communityCards.map((card) => (
            <CardCaption key={card.title} {...card} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="sm:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {communityCards.map((card) => (
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
      </div>
    </section>
  )
}
