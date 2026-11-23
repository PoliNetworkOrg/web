"use client"

import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import * as React from "react"
import { FiPause, FiPlay } from "react-icons/fi"
import { cn } from "@/lib/utils"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
  /** Milliseconds between automatic advances, or `false` to keep the carousel still. */
  autoplay?: number | false
}

const AUTOPLAY_MS = 4000

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  selectedIndex: number
  scrollSnaps: number[]
  /** Autoplay is enabled and motion isn't reduced, so the carousel can move by itself. */
  canAutoplay: boolean
  /** Autoplay was turned off by the user (Pause, or a drag) and only resumes when they choose Play. */
  stopped: boolean
  toggleAutoplay: () => void
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  autoplay = AUTOPLAY_MS,
  className,
  children,
  onPointerEnter,
  onPointerLeave,
  onFocusCapture,
  onBlurCapture,
  ...props
}: React.ComponentProps<"section"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])
  // Autoplay pauses while the pointer or focus is inside, and stops until the user picks Play once they press Pause
  // or drag the carousel
  const [hovered, setHovered] = React.useState(false)
  const [focused, setFocused] = React.useState(false)
  const paused = hovered || focused
  const [stopped, setStopped] = React.useState(false)
  const [reducedMotion, setReducedMotion] = React.useState(false)
  const canAutoplay = autoplay !== false && !reducedMotion

  const toggleAutoplay = React.useCallback(() => setStopped((stopped) => !stopped), [])

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
    setSelectedIndex(api.selectedScrollSnap())
    setScrollSnaps(api.scrollSnapList())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (orientation === "vertical") {
        if (event.key === "ArrowUp") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowDown") {
          event.preventDefault()
          scrollNext()
        }
      } else if (event.key === "ArrowLeft") {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        scrollNext()
      }
    },
    [orientation, scrollPrev, scrollNext]
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)

    return () => {
      api.off("reInit", onSelect)
      api.off("select", onSelect)
    }
  }, [api, onSelect])

  // The press in progress and where the slides were when it began. Embla reports `pointerDown` for every touch, page
  // scrolls and taps included, so only a press that moves the slides counts as a drag
  const press = React.useRef<{ start: number } | null>(null)

  React.useEffect(() => {
    if (!api) return
    const down = () => {
      press.current = { start: api.scrollProgress() }
    }
    const up = () => {
      press.current = null
    }
    // Embla freezes the slides on `pointerDown`, so while pressed they only move because of the drag
    const scroll = () => {
      if (press.current && api.scrollProgress() !== press.current.start) setStopped(true)
    }
    // A short drag can end before its first frame: Embla then picks the next slide on release, emitting `select`
    // before `pointerUp`
    const select = () => {
      if (press.current) setStopped(true)
    }
    api.on("pointerDown", down)
    api.on("pointerUp", up)
    api.on("scroll", scroll)
    api.on("select", select)
    return () => {
      api.off("pointerDown", down)
      api.off("pointerUp", up)
      api.off("scroll", scroll)
      api.off("select", select)
    }
  }, [api])

  React.useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(motion.matches)
    update()
    motion.addEventListener("change", update)
    return () => motion.removeEventListener("change", update)
  }, [])

  React.useEffect(() => {
    if (!api || autoplay === false || reducedMotion || paused || stopped) return
    const interval = setInterval(() => {
      // Inactive at this breakpoint (a grid instead) or nothing to scroll: stay put
      if (api.scrollSnapList().length <= 1) return
      // Never move the slides under a finger, or the press would read as a drag
      if (press.current) return
      // At the end, go back to the first card rather than stopping
      if (api.canScrollNext()) api.scrollNext()
      else api.scrollTo(0)
    }, autoplay)
    return () => clearInterval(interval)
  }, [api, autoplay, reducedMotion, paused, stopped])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        selectedIndex,
        scrollSnaps,
        canAutoplay,
        stopped,
        toggleAutoplay,
      }}
    >
      <section
        onKeyDownCapture={handleKeyDown}
        // Pointer events rather than mouse ones: a tap fires a synthetic `mouseenter` but no `mouseleave` until the next
        // tap elsewhere, which would leave the carousel paused on touch screens
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setHovered(true)
          onPointerEnter?.(event)
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") setHovered(false)
          onPointerLeave?.(event)
        }}
        onFocusCapture={(event) => {
          // Focus on the Pause/Play control doesn't pause, so Play takes effect at once; anywhere else inside does
          const target = event.target as Element
          setFocused(!target.closest('[data-slot="carousel-autoplay-toggle"]'))
          onFocusCapture?.(event)
        }}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
          onBlurCapture?.(event)
        }}
        className={cn("relative", className)}
        data-slot="carousel"
        {...props}
      >
        {children}
      </section>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden" data-slot="carousel-content">
      <div className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)} {...props} />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"fieldset">) {
  const { orientation } = useCarousel()

  return (
    <fieldset
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)}
      {...props}
    />
  )
}

function CarouselDots({ className, ...props }: React.ComponentProps<"div">) {
  const { api, scrollSnaps, selectedIndex, canAutoplay, stopped, toggleAutoplay } = useCarousel()

  if (scrollSnaps.length <= 1) return null

  return (
    <div data-slot="carousel-dots" className={cn("flex items-center justify-center gap-1.5", className)} {...props}>
      {canAutoplay && (
        <button
          type="button"
          data-slot="carousel-autoplay-toggle"
          aria-label={stopped ? "Avvia lo scorrimento automatico" : "Metti in pausa lo scorrimento automatico"}
          onClick={toggleAutoplay}
          // Same height as the current dot; the pseudo-element enlarges the hit area like the dots'
          className="after:-inset-1.5 relative mr-1.5 flex size-4 shrink-0 items-center justify-center rounded-full text-blue-primary after:absolute after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-secondary"
        >
          {stopped ? <FiPlay aria-hidden className="size-3" /> : <FiPause aria-hidden className="size-3" />}
        </button>
      )}
      {scrollSnaps.map((_, index) => (
        <button
          // Snap positions aren't unique (they can repeat with `containScroll: false`); the list is index-addressed anyway
          // biome-ignore lint/suspicious/noArrayIndexKey: one dot per snap index
          key={index}
          type="button"
          aria-label={`Vai alla slide ${index + 1}`}
          aria-current={selectedIndex === index}
          onClick={() => api?.scrollTo(index)}
          // Figma "slider dots": 16px current dot, 12px others, 6px apart. The pseudo-element enlarges the hit area.
          className={cn(
            "after:-inset-1.5 relative shrink-0 rounded-full border backdrop-blur-md transition-[width,height] after:absolute after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-secondary",
            selectedIndex === index
              ? "size-4 border-blue-primary bg-blue-primary"
              : "size-3 border-slate-500 bg-background-blur"
          )}
        />
      ))}
    </div>
  )
}

export { type CarouselApi, Carousel, CarouselContent, CarouselDots, CarouselItem }
