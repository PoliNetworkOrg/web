import Image from "next/image"
import { boardMembers } from "@/components/storia/constants"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

export function BoardGallery() {
  return (
    <Carousel
      opts={{ align: "start", breakpoints: { "(min-width: 768px)": { active: false } } }}
      // Full-bleed on mobile so the next portrait peeks in from the screen edge
      className="-mx-6 sm:-mx-10 min-w-0 md:mx-0"
    >
      <CarouselContent className="ml-2 sm:ml-6 md:mx-auto md:max-w-242 md:flex-wrap md:justify-center md:gap-6">
        {boardMembers.map((member) => (
          <CarouselItem key={member.name} className="basis-60 md:max-w-56 md:basis-[calc((100%-72px)/4)] md:pl-0">
            <Card className="relative mx-auto aspect-[223.429/263] h-auto w-full max-w-56 rounded-rectangles border-white/50 p-0 shadow-sm">
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
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots className="mt-6 md:hidden" />
    </Carousel>
  )
}
