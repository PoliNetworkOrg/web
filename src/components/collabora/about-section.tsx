import { FiArrowUpRight } from "react-icons/fi"
import chatIcon from "@/assets/icons/collabora/chat.svg?img"
import groupIcon from "@/assets/icons/collabora/group.svg?img"
import handshakeIcon from "@/assets/icons/collabora/handshake.svg?img"
import schoolIcon from "@/assets/icons/collabora/school.svg?img"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import { Link } from "@/components/link"
import { PeekCarousel } from "@/components/peek-carousel"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { InfoCard, type InfoCardData } from "./info-card"
import { Highlight } from "./section"

/** The same icon box on every card, so the four read as one set (Figma sized each icon differently) */
const ICON = "mr-3.75 size-7 object-contain md:mr-0 md:size-12.5"

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
    iconClassName: ICON,
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
    iconClassName: ICON,
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
    iconClassName: ICON,
  },
  {
    title: "4",
    description: (
      <>
        <Highlight>Team Operativi</Highlight> pronti a collaborare
      </>
    ),
    mobileDescription: "Team operativi pronti a collaborare",
    icon: handshakeIcon,
    iconClassName: ICON,
  },
]

export function AboutSection() {
  return (
    <section className={CONTAINER}>
      {/* Copy and figures side by side from xl, as in Figma; below, the figures run as one row (two on tablets) */}
      <div className="flex flex-col gap-8.75 md:gap-12 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex w-full flex-col items-start gap-6 md:max-w-179.75 md:gap-2.5">
          <div className="flex w-full flex-col gap-6 md:gap-3">
            <h2 className={SECTION_TITLE}>Chi siamo?</h2>
            <div className={cn(SECTION_LEAD, "flex flex-col gap-5 pb-2 md:gap-3 md:pb-0")}>
              <p>
                PoliNetwork è <Highlight>l'infrastruttura di comunicazione studentesca</Highlight> del Politecnico di
                Milano.
              </p>
              <p>
                Gestiamo <Highlight>oltre 500 gruppi Telegram e WhatsApp</Highlight>, una presenza social in crescita e
                strumenti digitali usati ogni anno da decine di migliaia di studenti di ingegneria, architettura e
                design.
              </p>
              <p>
                Chi entra al PoliMi, prima o poi, <Highlight>incontra PoliNetwork</Highlight>: e persino studenti delle
                scuole superiori o di altri atenei.
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

        <PeekCarousel
          items={cards}
          getKey={(card) => card.title}
          render={(card) => <InfoCard card={card} className="h-full min-h-26.25" />}
          className="md:hidden"
        />
      </div>
    </section>
  )
}
