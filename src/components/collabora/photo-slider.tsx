import { FiImage } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { Image, type StaticImage } from "@/components/image"
import { CONTAINER } from "@/components/layout/page"
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from "@/components/ui/carousel"

type Photo = { image?: StaticImage; alt: string }

// TODO: the photos of events and collaborations. Until each `image` is set, its slide shows a placeholder
const photos: Photo[] = [
  { alt: "Foto di un evento di PoliNetwork" },
  { alt: "Foto di una collaborazione con un’associazione" },
  { alt: "Foto di un evento con un’azienda" },
  { alt: "Foto della community di PoliNetwork" },
  { alt: "Foto di un evento di PoliNetwork" },
  { alt: "Foto dello staff di PoliNetwork" },
]

/** Photos of past events and collaborations, between the two invitations and the contacts. */
export function PhotoSlider() {
  return (
    <section aria-label="Le nostre collaborazioni in foto" className={CONTAINER}>
      <Carousel opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-6">
          {photos.map((photo, index) => (
            // One photo on phones, two on tablets, three from desktop
            <CarouselItem key={`${photo.alt}-${index}`} className="basis-[85%] pl-6 sm:basis-1/2 xl:basis-1/3">
              <Glass className="relative aspect-[4/3] overflow-hidden rounded-rectangles border-white/50 bg-background-blur p-0">
                {photo.image ? (
                  <Image
                    src={photo.image}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 85vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex size-full flex-col items-center justify-center gap-3 text-text-secondary">
                    <FiImage aria-hidden className="size-10" />
                    <span className="typo-body-medium">Foto in arrivo</span>
                  </div>
                )}
              </Glass>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-6 h-4">
          <CarouselDots />
        </div>
      </Carousel>
    </section>
  )
}
