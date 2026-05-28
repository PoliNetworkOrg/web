import {
  FiBell,
  FiBook,
  FiDollarSign,
  FiHome,
  FiMap,
  FiMonitor,
  FiRadio,
  FiShoppingCart,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi"
import { CardIcon } from "@/components/card-icon"
import { CardGroup } from "../card-group"

const guides = [
  {
    title: "Guida della matricola",
    description: "Dalla prima iscrizione alla vita in campus: il manuale completo per ogni nuovo studente.",
    icon: FiBook,
  },
  {
    title: "Mappa Microonde",
    description: "Dove scaldare il pranzo nei vari campus.",
    icon: FiMap,
  },
  {
    title: "Corsi a Scelta",
    description: "Consigli su come comporre il Piano di Studi.",
    icon: FiBook,
  },
  {
    title: "News",
    description: "Le ultime novità dagli studenti del Politecnico..",
    icon: FiRadio,
  },
  {
    title: "Borsa di Studio",
    description: "Requisiti e scadenze per le agevolazioni.",
    icon: FiDollarSign,
  },
] as const

const hub = {
  title: "Telegram Hub",
  description:
    "Unisiciti alla più grande rete di studenti del Poli su Telegram. Gruppi specifici per ogni esigenza, dai libri alla ricerca della casa.",
  cards: [
    {
      title: "Generale",
      icon: FiBell,
    },
    {
      title: "Matricole",
      icon: FiUserCheck,
    },
    {
      title: "Ripetizioni",
      icon: FiUsers,
    },
    {
      title: "PoliBook",
      icon: FiBook,
    },
    {
      title: "DSU",
      icon: FiDollarSign,
    },
    {
      title: "Mercatino",
      icon: FiShoppingCart,
    },
    {
      title: "Case",
      icon: FiHome,
    },
    {
      title: "Consigli PC",
      icon: FiMonitor,
    },
  ],
}

export function MatricoleGuides() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center px-6 sm:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-13 text-start">
        <h3 className="typo-display-small md:typo-display-medium">Guide e Utility</h3>

        <div className="grid w-full gap-6 md:grid-cols-2">
          <CardIcon key={guides[0].title} {...guides[0]} align="start" className="h-full" size="compact" />
          <div className="grid w-full gap-6 md:grid-cols-2">
            {guides.slice(1).map((guide) => (
              <CardIcon key={guide.title} {...guide} align="inline" className="h-full" size="inline" />
            ))}
          </div>
        </div>
        <CardGroup title={hub.title} description={hub.description} className="w-full">
          <div className="grid w-full grid-cols-2 gap-6 md:grid-cols-4">
            {hub.cards.map((card) => (
              <CardIcon key={card.title} {...card} align="inline" size="inline" />
            ))}
          </div>
        </CardGroup>
      </div>
    </section>
  )
}
