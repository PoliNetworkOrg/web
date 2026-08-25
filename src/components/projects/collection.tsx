import { FiArrowDown, FiSearch, FiUploadCloud } from "react-icons/fi"
import { CardCaption } from "../card-caption"
import { Button } from "../ui/button"
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from "../ui/carousel"
import { Input } from "../ui/input"

const collectionCards = [
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
  {
    title: "Title 5",
    caption:
      "caption: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    icon: FiUploadCloud,
    href: "#",
  },
  {
    title: "Title 6",
    caption:
      "caption: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    icon: FiUploadCloud,
    href: "#",
  },
  {
    title: "Title 7",
    caption:
      "caption: Lorem ipsum dolor sit amet, consectet ur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    icon: FiUploadCloud,
    href: "#",
  },
  {
    title: "Title 8",
    caption:
      "caption: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    icon: FiUploadCloud,
    href: "#",
  },
] as const

export function Collection() {
  return (
    <section className="mx-auto flex min-h-screen max-w-400 flex-col items-center justify-center gap-12 px-4 sm:gap-22">
      <div className="flex flex-col items-center gap-8">
        <h2 className="typo-headline-medium sm:typo-display-medium text-center">
          Esplora la raccolta completa dei progetti
        </h2>
        <div className="flex w-full justify-center">
          <Input
            icon={<FiSearch className="h-5 w-5" />}
            type="text"
            placeholder="Search by name"
            aria-label="Search by name"
            containerClassName="max-w-xl"
            className="typo-body-medium"
          />
        </div>
      </div>

      <div className="hidden flex-col gap-12 sm:flex">
        <div className="grid 1xl:grid-cols-4 grid-cols-2 justify-items-center gap-6">
          {collectionCards.map((card) => (
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
            {collectionCards.map((card) => (
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
