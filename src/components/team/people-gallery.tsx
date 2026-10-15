import Image from "next/image"
import { FiUser } from "react-icons/fi"
import { GradientIcon } from "@/components/gradient-icon"
import { boardMembers } from "@/components/storia/constants"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

export function PeopleGallery({ placeholderCount = 0 }: { placeholderCount?: number }) {
  const placeholders = Array.from({ length: placeholderCount }, (_, index) => `profilo-${index + 1}`)
  const items = placeholderCount ? placeholders : boardMembers

  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      <Carousel
        opts={{ align: "center", breakpoints: { "(min-width: 768px)": { active: false } } }}
        className="w-full min-w-0"
      >
        <CarouselContent className="md:ml-0 md:flex-wrap md:justify-center md:gap-6">
          {items.map((member) => (
            <CarouselItem
              key={typeof member === "string" ? member : member.name}
              className={cn(
                "sm:basis-1/2 md:max-w-56 md:basis-[calc((100%-72px)/4)] md:pl-0",
                placeholderCount && "basis-1/2 sm:basis-1/3 md:max-w-40 md:basis-40"
              )}
            >
              <Card
                className={cn(
                  "relative mx-auto aspect-[223.429/263] h-auto w-full max-w-56 rounded-rectangles border-white/50 p-0",
                  placeholderCount && "max-w-40 bg-linear-to-t from-blue-secondary/10 to-background-blur"
                )}
              >
                {typeof member === "string" ? (
                  <>
                    <div className="flex h-full items-center justify-center pb-10">
                      <GradientIcon icon={FiUser} className="size-10 opacity-50" />
                    </div>
                    <CardContent className="absolute inset-x-4 bottom-4 flex flex-col gap-1 text-text-primary">
                      <p className="typo-body-medium">Profilo del team</p>
                      <p className="typo-body-small text-text-secondary">In aggiornamento</p>
                    </CardContent>
                  </>
                ) : (
                  <>
                    <Image
                      src={member.image}
                      alt={member.name}
                      sizes="(max-width: 767px) 224px, (max-width: 1279px) 25vw, 224px"
                      className={cn("absolute max-w-none", member.crop)}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-linear-to-t from-5% from-blue-secondary/70 to-60% to-transparent"
                    />
                    <CardContent className="absolute inset-x-4 bottom-5 text-white">
                      <h3 className="typo-body-large font-poppins">{member.name}</h3>
                      {member.role && <p className="typo-body-small">{member.role}</p>}
                    </CardContent>
                  </>
                )}
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots className="mt-6 md:hidden" />
      </Carousel>
      {placeholderCount > 0 && (
        <p className="typo-body-small text-center text-text-secondary">
          Foto e nomi dei membri del team sono in aggiornamento.
        </p>
      )}
    </div>
  )
}
