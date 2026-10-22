import { Fragment } from "react"
import favoriteIcon from "@/assets/icons/collabora/favorite.svg"
import mailIcon from "@/assets/icons/collabora/mail.svg"
import promptSuggestionIcon from "@/assets/icons/collabora/prompt-suggestion.svg"
import { cn } from "@/lib/utils"
import { InfoCard, type InfoCardData } from "./info-card"
import { SectionTitle, sectionContainerClass } from "./section"

const cards: InfoCardData[] = [
  {
    title: "events@polinetwork.org",
    description: "Ci scrivi una mail descrivendo chi sei e cosa vorresti fare",
    mobileDescription: "Ci scrivi una mail spiegando chi sei e cosa vorresti fare",
    icon: mailIcon,
    iconClassName: "mr-2.5 h-5.5 w-7 md:mr-0 md:h-12 md:w-15",
    descriptionClassName: "max-w-56",
  },
  {
    title: "Condividi la tua visione",
    description: "Quale valore porta il tuo progetto agli studenti del Politecnico?",
    mobileDescription: "Quale valore porta il progetto agli studenti del Poli?",
    icon: favoriteIcon,
    iconClassName: "mr-2.5 h-5.5 w-6 md:mt-0.5 md:mr-0 md:ml-0.5 md:h-12.5 md:w-13.5",
    descriptionClassName: "max-w-65.75",
  },
  {
    title: "Ricevi il nostro feedback",
    description: (
      <>
        Rispondiamo al più presto
        <br />a tutte le richieste
      </>
    ),
    mobileDescription: "Rispondiamo al più presto a tutte le richieste!",
    icon: promptSuggestionIcon,
    iconClassName: "mr-2.5 h-5.5 w-7 md:mt-0.5 md:mr-0 md:h-11.75 md:w-15",
    descriptionClassName: "max-w-56",
  },
]

/** Figma's connectors between the steps; vertical while the cards are stacked. */
const connectorClassNames = [
  "from-[#51a2ff] to-[#0069a8]", // Vector 4
  "from-[#0069a8] to-[#74d4ff]", // Vector 5
]

export function ContactSection() {
  return (
    <section className={cn(sectionContainerClass, "pt-15 pb-33.25 md:pt-31.25 md:pb-54.5")}>
      <SectionTitle className="mb-7.5 md:mb-9.25">Come contattarci</SectionTitle>

      <div className="flex flex-col items-center md:max-[1615px]:items-start min-[1616px]:flex-row">
        {cards.map((card, index) => (
          <Fragment key={card.title}>
            <InfoCard card={card} className="w-full md:min-h-61.25 md:w-104.25 md:shrink-0" />
            {index < connectorClassNames.length && (
              <div
                aria-hidden
                className={cn(
                  "h-10 w-1 shrink-0 bg-linear-to-b md:max-[1615px]:ml-51.5 min-[1616px]:h-1 min-[1616px]:w-auto min-[1616px]:min-w-10 min-[1616px]:flex-1 min-[1616px]:bg-linear-to-r",
                  connectorClassNames[index]
                )}
              />
            )}
          </Fragment>
        ))}
      </div>
    </section>
  )
}
