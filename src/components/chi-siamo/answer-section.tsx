import { FiAward, FiBookOpen, FiUsers } from "react-icons/fi"
import { CardIcon } from "@/components/card-icon"

const cards = [
  {
    title: "Community",
    description:
      "Gruppi Telegram e WhatsApp per corsi, scaglioni, sedi e interessi. Una rete moderata ogni giorno da admin volontari.",
    icon: FiUsers,
  },
  {
    title: "Strumenti",
    description:
      "Strumenti gratuiti e open source: graduatorie e simulazioni TOL, bot per trovare il tuo gruppo, appunti e temi d’esame.",
    icon: FiBookOpen,
  },
  {
    title: "Eventi",
    description: "Eventi per incontrarsi e fare community. Collaborazioni che portano valore concreto agli studenti.",
    icon: FiAward,
  },
] as const

export function AnswerSection() {
  return (
    <section id="cosa-facciamo" className="mx-auto flex w-full max-w-330 scroll-mt-32 flex-col gap-10 px-6 md:gap-14">
      <div className="flex flex-col gap-4">
        <h2 className="typo-headline-medium md:typo-display-medium bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
          La nostra risposta
        </h2>
        <p className="typo-body-large sm:typo-headline-extrasmall max-w-200 text-pretty">
          Costruiamo e manteniamo la rete di comunicazione studentesca del Politecnico di Milano.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {cards.map((card) => (
          <CardIcon
            key={card.title}
            {...card}
            size="compact"
            align="start"
            className="h-full p-0 [&_h3]:text-balance"
          />
        ))}
      </div>
    </section>
  )
}
