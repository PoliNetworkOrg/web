import { InfoCard, type InfoCardData } from "@/components/collabora/info-card"
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from "@/components/ui/carousel"

const cardClassName = "h-full md:p-6 [&_h3]:typo-title-large [&_h3]:whitespace-normal [&_h3]:text-balance"

export function JoinCards({ cards, carousel = false }: { cards: InfoCardData[]; carousel?: boolean }) {
  if (!carousel) {
    return (
      <div className="grid min-w-0 gap-6 md:grid-cols-2">
        {cards.map((card) => (
          <InfoCard key={card.title} card={card} className={cardClassName} />
        ))}
      </div>
    )
  }

  return (
    <Carousel
      opts={{ align: "start", breakpoints: { "(min-width: 768px)": { active: false } } }}
      className="w-full min-w-0"
    >
      <CarouselContent className="md:ml-0 md:grid md:grid-cols-2 md:gap-6">
        {cards.map((card) => (
          <CarouselItem key={card.title} className="basis-[90%] sm:basis-1/2 md:pl-0">
            <InfoCard card={card} className={cardClassName} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots className="mt-6 md:hidden" />
    </Carousel>
  )
}
