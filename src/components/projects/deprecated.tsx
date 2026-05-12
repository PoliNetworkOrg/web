import { FiArrowDown, FiUploadCloud } from "react-icons/fi"
import { CardCaption } from "../card-caption"
import { Button } from "../ui/button"
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from "../ui/carousel"

const communityCards = [
  {
    title: "Title 1",
    caption:
      "caption: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    icon: FiUploadCloud,
    href: "#",
  },
  {
    title: "Title 2",
    caption:
      "caption: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    icon: FiUploadCloud,
    href: "#",
  },
  {
    title: "Title 3",
    caption:
      "caption: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    icon: FiUploadCloud,
    href: "#",
  },
  {
    title: "Title 4",
    caption:
      "caption: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    icon: FiUploadCloud,
    href: "#",
  },
] as const

export function Deprecated() {
  return (
    <section className="mx-auto flex min-h-screen max-w-400 flex-col items-center justify-center px-4 py-49">
      <div className="flex w-full flex-col gap-14 sm:w-fit">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <h3 className="typo-headline-medium sm:typo-display-medium text-center sm:text-left">Progetti deprecati</h3>
          <p className="typo-body-large text-center sm:text-left">
            Qui raccogliamo i progetti non più aggiornati o attivi. <br />
            Puoi contribuire a riportarli in vita, migliorarli o usarli come base per nuove idee.
          </p>
        </div>

        <div className="hidden flex-col gap-12 sm:flex">
          <div className="grid grid-cols-2 justify-items-center gap-6 xl:grid-cols-4">
            {communityCards.map((card) => (
              <CardCaption key={card.title} {...card} />
            ))}
          </div>
          <div className="flex justify-center">
            <Button variant="primary" size="lg">
              Mostra di più
              <FiArrowDown />
            </Button>
          </div>
        </div>

        <div className="flex w-full items-center justify-center sm:hidden">
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
