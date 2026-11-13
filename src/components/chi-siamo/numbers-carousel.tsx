"use client"

import { useEffect, useState } from "react"
import { FiBook, FiBookOpen, FiHeadphones, FiSend, FiUser, FiUsers } from "react-icons/fi"
import { GradientIcon } from "@/components/gradient-icon"
import { Card } from "@/components/ui/card"
import { Carousel, type CarouselApi, CarouselContent, CarouselDots, CarouselItem } from "@/components/ui/carousel"

const stats = [
  { value: "500+", label: "gruppi Telegram e WhatsApp attivi", icon: FiSend },
  { value: "30+", label: "corsi di laurea coperti", icon: FiBook },
  { value: "45k+", label: "studenti raggiunti ogni anno", icon: FiUser },
  { value: "100+", label: "admin volontari su tutte le sedi", icon: FiUsers },
  { value: "5", label: "team operativi", icon: FiHeadphones },
  { value: "100%", label: "progetti tecnici rilasciati open source", icon: FiBookOpen },
] as const

const AUTOPLAY_MS = 3500

/**
 * The numbers as a looping carousel that advances on its own. It stops for good once someone drags it, and pauses
 * while hovered or focused; with reduced motion it never moves by itself.
 */
export function NumbersCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [paused, setPaused] = useState(false)
  const [stopped, setStopped] = useState(false)

  useEffect(() => {
    if (!api) return
    const stop = () => setStopped(true)
    api.on("pointerDown", stop)
    return () => {
      api.off("pointerDown", stop)
    }
  }, [api])

  useEffect(() => {
    if (!api || paused || stopped) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const interval = setInterval(() => api.scrollNext(), AUTOPLAY_MS)
    return () => clearInterval(interval)
  }, [api, paused, stopped])

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "start", loop: true }}
      aria-label="I numeri di PoliNetwork"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      // Phones: the row runs to the screen edges so the next card peeks in, as elsewhere on the site
      className="-mx-6 sm:mx-0"
    >
      <CarouselContent className="sm:-ml-6 mr-6 ml-2 sm:mr-0">
        {stats.map((stat, index) => (
          <CarouselItem
            key={stat.label}
            aria-label={`${index + 1} di ${stats.length}`}
            className="basis-[85%] sm:basis-1/2 sm:pl-6 xl:basis-1/3"
          >
            <Card className="h-full w-full flex-row items-center gap-5 p-6">
              <GradientIcon icon={stat.icon} className="size-10 shrink-0" />
              <div className="flex min-w-0 flex-col gap-1">
                <p className="typo-headline-large text-blue-secondary tabular-nums">{stat.value}</p>
                <p className="typo-body-large text-pretty">{stat.label}</p>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots className="mt-6" />
    </Carousel>
  )
}
