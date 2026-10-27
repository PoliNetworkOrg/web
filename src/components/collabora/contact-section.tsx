import { Fragment } from "react"
import favoriteIcon from "@/assets/icons/collabora/favorite.svg"
import mailIcon from "@/assets/icons/collabora/mail.svg"
import promptSuggestionIcon from "@/assets/icons/collabora/prompt-suggestion.svg"
import { CONTAINER } from "@/components/layout/page"
import { cn } from "@/lib/utils"
import { InfoCard, type InfoCardData } from "./info-card"
import { SectionTitle } from "./section"

const cards: InfoCardData[] = [
  {
    title: "events@polinetwork.org",
    description: "Ci scrivi una mail descrivendo chi sei e cosa vorresti fare",
    mobileDescription: "Ci scrivi una mail spiegando chi sei e cosa vorresti fare",
    icon: mailIcon,
    // In a row the three titles share the width: 24px, wrapping (the address after its "@")
    titleClassName: "md:typo-headline-small lg:whitespace-normal",
    iconClassName: "mr-2.5 h-5.5 w-7 md:mr-0 md:h-12 md:w-15",
    descriptionClassName: "max-w-56",
    // The only step that is an action: it opens the mail client
    href: "mailto:events@polinetwork.org",
  },
  {
    title: "Condividi la tua visione",
    description: "Quale valore porta il tuo progetto agli studenti del Politecnico?",
    mobileDescription: "Quale valore porta il progetto agli studenti del Poli?",
    icon: favoriteIcon,
    // In a row the three titles share the width: 24px, wrapping (the address after its "@")
    titleClassName: "md:typo-headline-small lg:whitespace-normal",
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
    // In a row the three titles share the width: 24px, wrapping (the address after its "@")
    titleClassName: "md:typo-headline-small lg:whitespace-normal",
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
    <section className={CONTAINER}>
      <SectionTitle className="mb-7.5 md:mb-9.25">Come contattarci</SectionTitle>

      {/* A row of equal steps from lg (tighter padding until 3xl); stacked below, at Figma's card width */}
      <div className="flex flex-col items-center md:items-start lg:flex-row lg:items-stretch">
        {cards.map((card, index) => (
          <Fragment key={card.title}>
            <InfoCard
              card={card}
              className="w-full md:w-104.25 md:shrink-0 lg:w-auto lg:min-w-0 lg:flex-1 lg:max-3xl:p-6"
            />
            {index < connectorClassNames.length && (
              <div
                aria-hidden
                className={cn(
                  "h-10 w-1 shrink-0 bg-linear-to-b md:max-lg:ml-51.5 lg:h-1 lg:w-10 lg:self-center lg:bg-linear-to-r",
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
