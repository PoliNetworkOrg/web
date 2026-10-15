import { FiAward, FiBookOpen, FiUsers } from "react-icons/fi"
import { CardIcon } from "@/components/card-icon"

const cards = [
  {
    title: "Community",
    description:
      "Lo facciamo attraverso una community di gruppi Telegram e WhatsApp organizzati per tematiche, corsi, scaglioni e sedi, moderati ogni giorno da admin volontari.",
    icon: FiUsers,
  },
  {
    title: "Strumenti",
    description:
      "Lo facciamo con strumenti digitali gratuiti e open source: dalle graduatorie TOL navigabili al simulatore del test d’ingresso, dal bot per trovare il proprio gruppo agli archivi di appunti e temi d’esame.",
    icon: FiBookOpen,
  },
  {
    title: "Eventi",
    description:
      "E lo facciamo di persona, con eventi che aggregano la community e collaborazioni che portano valore concreto agli studenti.",
    icon: FiAward,
  },
] as const

export function AnswerSection() {
  return (
    <section className="page-container flex flex-col gap-block">
      <div className="flex flex-col gap-6 text-center md:text-start">
        <h2 className="typo-headline-medium md:typo-display-medium bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
          La nostra risposta
        </h2>
        <p className="typo-body-large md:typo-headline-small">
          Costruiamo e manteniamo la rete di comunicazione studentesca del Politecnico di Milano.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
        {cards.map((card) => (
          <CardIcon key={card.title} {...card} size={{ base: "md", lg: "lg" }} className="h-full" />
        ))}
      </div>
    </section>
  )
}
