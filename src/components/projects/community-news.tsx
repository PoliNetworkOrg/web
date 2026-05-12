import { FiCrop } from "react-icons/fi"
import { CardCaption } from "../card-caption"

const communityCards = [
  {
    title: "Title 1",
    caption:
      "description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    icon: FiCrop,
    iconPosition: "right",
  },
  {
    title: "Title 2",
    caption:
      "description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    icon: FiCrop,
    iconPosition: "right",
  },
  {
    title: "Title 3",
    caption:
      "description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    icon: FiCrop,
    iconPosition: "right",
  },
  {
    title: "Title 4",
    caption:
      "description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    icon: FiCrop,
    iconPosition: "right",
  },
] as const

export function CommunityNews() {
  return (
    <section className="mx-auto flex min-h-screen max-w-400 flex-col items-center justify-center gap-48 px-4 py-49">
      <div className="flex flex-col items-center gap-6">
        <h2 className="typo-display-large sm:typo-display-extralarge w-fit bg-linear-to-b from-text-primary to-text-secondary bg-clip-text py-4 text-transparent sm:py-14">
          Projects
        </h2>
        <p className="typo-title-large sm:typo-headline-small max-w-xl text-center">
          Esplora e contribuisci ai progetti degli studenti
        </p>
      </div>

      <div className="flex flex-col gap-14">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <h3 className="typo-headline-medium sm:typo-display-medium text-center sm:text-left">
            Le novità della community
          </h3>
          <p className="typo-body-large text-center sm:text-left">
            Rimani aggiornato sulle idee appena condivise dagli studenti del Politecnico
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
          {communityCards.map((card) => (
            <CardCaption key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}
