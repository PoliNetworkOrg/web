import type { ReactNode } from "react"
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

/**
 * Phone carousel whose next card peeks in from the screen edge, so the row reads as scrollable.
 * It bleeds over the CONTAINER's 24px phone gutter: use it below `sm` only.
 */
export function PeekCarousel<T>({
  items,
  getKey,
  render,
  className,
}: {
  items: readonly T[]
  getKey: (item: T) => string | number
  render: (item: T) => ReactNode
  className?: string
}) {
  return (
    // `min-w-0`: as a grid item the slide row would otherwise widen its column to fit every card side by side
    <div className={cn("-mx-6 min-w-0", className)}>
      <Carousel opts={{ align: "start" }}>
        <CarouselContent className="mr-6 ml-2">
          {items.map((item) => (
            <CarouselItem key={getKey(item)} className="basis-[85%]">
              {render(item)}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots className="mt-6" />
      </Carousel>
    </div>
  )
}
