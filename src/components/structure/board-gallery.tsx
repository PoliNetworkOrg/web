import { boardMembers } from "@/components/storia/constants"
import { BoardMemberCard } from "@/components/structure/board-member-card"
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from "@/components/ui/carousel"

export function BoardGallery() {
  return (
    <Carousel
      opts={{ align: "start", breakpoints: { "(min-width: 768px)": { active: false } } }}
      // Out to the screen edge on mobile, so the next portrait peeks in
      className="-mx-6 sm:-mx-10 min-w-0 md:mx-0"
    >
      <CarouselContent className="ml-2 sm:ml-6 md:mx-auto md:max-w-242 md:flex-wrap md:justify-center md:gap-6">
        {boardMembers.map((member) => (
          <CarouselItem key={member.name} className="basis-60 md:max-w-56 md:basis-[calc((100%-72px)/4)] md:pl-0">
            <BoardMemberCard
              member={member}
              sizes="(max-width: 767px) 224px, (max-width: 1279px) 25vw, 224px"
              className="mx-auto"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots className="mt-6 md:hidden" />
    </Carousel>
  )
}
