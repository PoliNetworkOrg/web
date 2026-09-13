import { FiHeart, FiMail } from "react-icons/fi"
import { TbArrowBack } from "react-icons/tb"
import { cn } from "@/lib/utils"
import { CardIcon } from "../card-icon"

const cards = [
  {
    title: "Dimostra la tua attività e disponibilità",
    description: "All’avvio dell’anno accademico, con i gruppi matricole. In seguito, il recruiting avviene per segnalazione dei Capi Admin o del team HR.",
    icon: FiMail,
    size: "sm",
  },
  {
    title: "Fai un colloquio iniziale con team HR",
    description: "Una chiacchierata breve informale pensata per capire motivazione e disponibilità.",
    icon: FiHeart,
    size: "sm",
  },
  {
    title: "Incontra il Capo Admin del tuo corso",
    description: "Fungerà da punto di riferimento per qualsiasi dubbio sulla gestione del gruppo.",
    icon: TbArrowBack,
    size: "sm",
  },
] as const

export function EnterSection() {
  return (
    <section className="flex w-full flex-col gap-6 px-2 md:px-36">
      <h2 className="typo-display-large sm:typo-display-medium text-start">Come contattarci</h2>

      <div className="grid w-full grid-cols-1 gap-y-10 text-start min-[1616px]:grid-cols-3 min-[1616px]:gap-x-10 min-[1616px]:gap-y-0">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className={cn(
              "relative",
              index < cards.length - 1 &&
                "after:-translate-x-1/2 min-[1616px]:after:-translate-y-1/2 after:absolute after:top-full after:left-1/2 after:z-0 after:h-10 after:w-1 after:bg-[linear-gradient(180deg,#0069A8,#74D4FF)] after:content-[''] min-[1616px]:after:top-1/2 min-[1616px]:after:left-full min-[1616px]:after:h-1 min-[1616px]:after:w-10 min-[1616px]:after:translate-x-0 min-[1616px]:after:bg-[linear-gradient(90deg,#0069A8,#74D4FF)]"
            )}
          >
            <CardIcon
              {...card}
              align="start"
              className={cn(
                "relative z-10 w-full min-w-0 min-[1616px]:min-w-104 [&_div>p]:w-55",
                index === cards.length - 1 && "[&_div>svg]:scale-x-[-1]"
              )}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
