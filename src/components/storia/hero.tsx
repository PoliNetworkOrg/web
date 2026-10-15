import Image from "next/image"
import Link from "next/link"
import { FiArrowDown, FiArrowUpRight, FiUsers } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { GradientIcon } from "@/components/gradient-icon"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Hero } from "@/components/ui/hero"
import { cn } from "@/lib/utils"
import { boardMembers } from "./constants"

const portraits = [
  { member: boardMembers[0], position: "top-8 left-0 -rotate-6" },
  { member: boardMembers[2], position: "-translate-x-1/2 top-0 left-1/2 z-10" },
  { member: boardMembers[5], position: "top-12 right-0 rotate-6" },
]

export function HistoryHero() {
  return (
    <section className="mx-auto grid w-full max-w-330 items-center gap-12 px-6 xl:grid-cols-2 xl:gap-16">
      <div className="flex min-w-0 flex-col items-center gap-6 xl:items-start">
        <Glass className="typo-label-large flex w-fit items-center gap-2 rounded-buttonsM border-white/50 bg-background-blur px-4 py-2 text-blue-secondary">
          <FiUsers aria-hidden className="size-4" /> Dal 2016, dagli studenti
        </Glass>
        <div className="[&_h2]:typo-display-medium sm:[&_h2]:typo-display-large 2xl:[&_h2]:typo-display-extralarge w-full xl:[&>div]:items-start [&_h2]:text-balance [&_h2]:py-0 xl:[&_h2]:text-start [&_p]:max-w-145 [&_p]:text-balance xl:[&_p]:text-start">
          <Hero
            title="La nostra storia"
            description="Da un gruppo Telegram a una rete costruita dagli studenti, per gli studenti."
          />
        </div>
        <div className="flex flex-wrap justify-center gap-3 xl:justify-start">
          <Button asChild size="lg">
            <Link href="#capitoli">
              Leggi la nostra storia <FiArrowDown aria-hidden />
            </Link>
          </Button>
          <Button asChild size="lg" variant="glass">
            <Link href="#direttivi">
              Conosci le persone <FiArrowUpRight aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-140">
        <div aria-hidden className="relative aspect-square w-full sm:aspect-4/3">
          {portraits.map(({ member, position }) => (
            <Card
              key={member.name}
              className={cn(
                "absolute aspect-[223.429/263] h-auto w-2/5 rounded-rectangles border-white/50 p-0 shadow-lg",
                position
              )}
            >
              <Image
                src={member.image}
                alt=""
                sizes="(max-width: 639px) 40vw, 224px"
                className={cn("absolute max-w-none", member.crop)}
              />
              <div className="absolute inset-0 bg-linear-to-t from-blue-secondary/30 to-transparent" />
            </Card>
          ))}
        </div>
        <Glass className="-translate-x-1/2 absolute bottom-0 left-1/2 z-20 flex w-max max-w-full items-center gap-4 rounded-rectangles border-white/50 bg-background-blur px-6 py-4 shadow-sm">
          <GradientIcon icon={FiUsers} className="size-10 shrink-0" />
          <div>
            <p className="typo-headline-small text-blue-secondary">200+</p>
            <p className="typo-body-medium">admin volontari, oggi</p>
          </div>
        </Glass>
      </div>
    </section>
  )
}
