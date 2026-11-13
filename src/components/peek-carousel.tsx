import type { ReactNode } from "react"
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

/** One card and a peek of the next on phones, two and a peek on small tablets. */
export const PEEK_SLIDE = "basis-[85%] sm:basis-[45%]"

/**
 * The site's card carousel below `md`: the next card peeks in from the screen edge, so the row reads as scrollable.
 * It bleeds over the CONTAINER's gutter (24px, 40px from `sm`): hide it from `md` and show the grid instead.
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
  // A single card has nothing to scroll to: show it at full width
  const [only] = items
  if (items.length === 1 && only !== undefined) return <div className={cn("min-w-0", className)}>{render(only)}</div>

  return (
    // `min-w-0`: as a grid item the slide row would otherwise widen its column to fit every card side by side
    <div className={cn("-mx-6 sm:-mx-10 min-w-0", className)}>
      <Carousel opts={{ align: "start" }}>
        <CarouselContent className="mr-6 ml-2 sm:mr-10 sm:ml-6">
          {items.map((item) => (
            <CarouselItem key={getKey(item)} className={PEEK_SLIDE}>
              {render(item)}
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* The dots only render once Embla has measured the slides: reserve their row to avoid a layout shift */}
        <div className="mt-6 h-4">
          <CarouselDots />
        </div>
      </Carousel>
    </div>
  )
}
