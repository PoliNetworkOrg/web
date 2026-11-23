import { InfoCard, type InfoCardData } from "@/components/collabora/info-card"
import { PEEK_SLIDE } from "@/components/peek-carousel"
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

const cardClassName = "h-full md:p-6"
const titleClassName = "md:typo-title-large md:whitespace-normal text-balance"

export function JoinCards({ cards, carousel = false }: { cards: InfoCardData[]; carousel?: boolean }) {
  if (!carousel) {
    return (
      <div className="grid min-w-0 gap-6 md:grid-cols-2">
        {cards.map((card) => (
          <InfoCard key={card.title} card={card} className={cardClassName} titleClassName={titleClassName} />
        ))}
      </div>
    )
  }

  return (
    <Carousel
      opts={{ align: "start", breakpoints: { "(min-width: 768px)": { active: false } } }}
      // Mobile: the carousel runs to the screen edges so the next card peeks in, as in the homepage
      className="-mx-6 sm:-mx-10 min-w-0 md:mx-0"
    >
      <CarouselContent className="mr-6 ml-2 sm:mr-10 sm:ml-6 md:mx-0 md:grid md:grid-cols-2 md:gap-6">
        {cards.map((card) => (
          <CarouselItem key={card.title} className={cn(PEEK_SLIDE, "md:basis-auto md:pl-0")}>
            <InfoCard card={card} className={cardClassName} titleClassName={titleClassName} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots className="mt-6 md:hidden" />
    </Carousel>
  )
}
