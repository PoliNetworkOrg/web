import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import chatIcon from "@/assets/icons/collabora/chat.svg"
import groupIcon from "@/assets/icons/collabora/group.svg"
import handshakeIcon from "@/assets/icons/collabora/handshake.svg"
import schoolIcon from "@/assets/icons/collabora/school.svg"
import { CONTAINER } from "@/components/layout/page"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { InfoCard, type InfoCardData } from "./info-card"
import { Aside, Highlight, SectionTitle, sectionTextClass } from "./section"

const cards: InfoCardData[] = [
  {
    title: "18k+",
    description: (
      <>
        <Highlight>Membri</Highlight> del nostro gruppo Telegram principale
      </>
    ),
    mobileDescription: "Membri del nostro gruppo Telegram",
    icon: chatIcon,
    iconClassName: "mr-3.75 h-7 w-7.5 md:mt-px md:mr-0 md:h-12.5 md:w-13.25",
    descriptionClassName: "md:-mr-px",
  },
  {
    title: "45k+",
    description: (
      <>
        <Highlight>Studenti</Highlight> raggiunti da PoliNetwork ogni anno
      </>
    ),
    mobileDescription: "Studenti raggiunti ogni anno",
    icon: schoolIcon,
    iconClassName: "mr-3.75 h-7 w-8.5 md:-mt-px md:mr-0 md:-ml-0.75 md:h-12.5 md:w-15.25",
    descriptionClassName: "md:-mr-px",
  },
  {
    title: "1000+",
    description: (
      <>
        <Highlight>Persone</Highlight> nel nostro evento più grande
      </>
    ),
    mobileDescription: "Persone al nostro evento più grande",
    icon: groupIcon,
    iconClassName: "mr-3.75 h-7 w-9.25 md:-mt-px md:mr-0 md:h-12.5 md:w-16.75",
    descriptionClassName: "md:-mr-px",
  },
  {
    title: "5",
    description: (
      <>
        <Highlight>Team Operativi</Highlight> pronti a collaborare
      </>
    ),
    mobileDescription: "Team operativi pronti a collaborare",
    icon: handshakeIcon,
    iconClassName: "mr-3.75 h-7 w-7.75 md:mr-0 md:h-12.5 md:w-13.75",
    descriptionClassName: "md:-mr-px",
  },
]

export function AboutSection() {
  return (
    <section className={CONTAINER}>
      {/* Copy and figures side by side from xl, as in Figma; below, the figures run as one row (two on tablets) */}
      <div className="flex flex-col gap-8.75 md:gap-12 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex w-full flex-col items-start gap-6 md:max-w-179.75 md:gap-2.5">
          <div className="flex w-full flex-col gap-6 md:gap-3">
            <SectionTitle>Chi siamo?</SectionTitle>
            <div className={cn(sectionTextClass, "flex flex-col gap-5 pb-2 md:gap-3 md:pb-0")}>
              <p>PoliNetwork è l'infrastruttura di comunicazione studentesca del Politecnico di Milano.</p>
              <p>
                Gestiamo oltre 500 gruppi Telegram e WhatsApp, una presenza social in crescita e strumenti digitali
                usati ogni anno da decine di migliaia di studenti di ingegneria, architettura e design.
              </p>
              <p>
                <Highlight>Chi entra al PoliMi, prima o poi, incontra PoliNetwork</Highlight>.
                <Aside className="block">(e persino studenti delle scuole superiori o altri atenei)</Aside>
              </p>
            </div>
          </div>
          <div className="md:pt-3">
            <Button asChild variant="primary" size="lg" className="px-6.5 has-[>svg]:px-6.5">
              <Link href="/storia">
                Scopri la nostra storia
                <FiArrowUpRight className="size-5" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid shrink-0 3xl:grid-cols-[repeat(2,17.5rem)] grid-cols-2 gap-6 3xl:gap-x-13.75 3xl:gap-y-8.75 max-md:hidden lg:grid-cols-4 xl:grid-cols-[repeat(2,15rem)]">
          {cards.map((card) => (
            <InfoCard key={card.title} card={card} className="h-full lg:max-3xl:p-6" />
          ))}
        </div>

        {/* Bleeds to the screen edges like the Figma carousel, so the next card peeks in */}
        <Carousel opts={{ containScroll: false }} className="w-screen max-w-none self-center md:hidden">
          <CarouselContent className="-ml-2">
            {cards.map((card) => (
              <CarouselItem key={card.title} className="basis-auto pl-2">
                <InfoCard card={card} className="h-26.25 w-62.75" />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* The dots only render once Embla has measured the slides: reserve their row to avoid a layout shift */}
          <div className="mt-6 h-4">
            <CarouselDots />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
