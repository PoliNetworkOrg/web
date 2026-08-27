import { CardIcon } from "../card-icon";
import { cn } from "@/lib/utils";
import { TbArrowBack } from "react-icons/tb";
import { FiHeart, FiMail } from "react-icons/fi";

const cards = [
  {
    title: "events@polinetwork.org",
    description: "Ci scrivi una mail descrivendo chi sei e cosa vorresti fare",
    icon: FiMail,
    size: "sm",
  },
  {
    title: "Condividi la tua visione",
    description: "Quale valore porta il tuo progetto agli studenti del Politecnico?",
    icon: FiHeart,
    size: "sm",
  },
  {
    title: "Ricevi il nostro feedback",
    description: "Rispondiamo al più presto a tutte le richieste",
    icon: TbArrowBack,
    size: "sm",
  },
] as const;

export function ContactSection() {
  return (
    <section className="flex w-full flex-col gap-6 px-2 md:px-36">
      <h2 className="typo-display-large sm:typo-display-medium text-start">
        Come contattarci
      </h2>

      <div className="grid w-full grid-cols-1 gap-y-10 text-start min-[1616px]:grid-cols-3 min-[1616px]:gap-x-10 min-[1616px]:gap-y-0">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className={cn(
              "relative",
              index < cards.length - 1 &&
                "after:absolute after:z-0 after:bg-[linear-gradient(180deg,#0069A8,#74D4FF)] after:content-[''] after:left-1/2 after:top-full after:h-10 after:w-1 after:-translate-x-1/2 min-[1616px]:after:left-full min-[1616px]:after:top-1/2 min-[1616px]:after:h-1 min-[1616px]:after:w-10 min-[1616px]:after:-translate-y-1/2 min-[1616px]:after:translate-x-0 min-[1616px]:after:bg-[linear-gradient(90deg,#0069A8,#74D4FF)]"
            )}
          >
            <CardIcon
              {...card}
              align="start"
              className={cn(
                "relative z-10 min-w-0 w-full [&_div>p]:w-55 min-[1616px]:min-w-104",
                index === cards.length - 1 && "[&_div>svg]:scale-x-[-1]"
              )}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
