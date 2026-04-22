import { FiUploadCloud } from "react-icons/fi"
import { CardIcon } from "@/components/card-icon"

const communityCards = [
  {
    title: "Title 1",
    description:
      "description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    icon: FiUploadCloud,
    size: "sm",
    href: "#",
  },
  {
    title: "Title 2",
    description:
      "description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    icon: FiUploadCloud,
    size: "sm",
    href: "#",
  },
  {
    title: "Title 3",
    description:
      "description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    icon: FiUploadCloud,
    size: "sm",
    href: "#",
  },
  {
    title: "Title 4",
    description:
      "description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    icon: FiUploadCloud,
    size: "sm",
    href: "#",
  },
] as const

export function CommunityNews() {
  return (
    <section className="mx-auto flex min-h-screen max-w-400 flex-col items-center justify-center gap-48 px-4 py-24">
      <div className="flex flex-col items-center gap-6">
        <h2 className="typo-display-extralarge w-fit bg-linear-to-b from-text-primary to-text-secondary bg-clip-text py-14 text-transparent">
          Projects
        </h2>
        <p className="typo-headline-small max-w-xl text-center">Esplora e contribuisci ai progetti degli studenti</p>
      </div>

      <div className="flex flex-col gap-14">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <h3 className="typo-display-medium text-center md:text-left">Le novità della community</h3>
          <p className="typo-body-large text-center md:text-left">
            {/* TODO a me sembra troppo piccolo*/}
            Rimani aggiornato sulle idee appena condivise dagli studenti del Politecnico
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* TODO sostituire la card con la versione corretta */}
          {communityCards.map((card) => (
            <CardIcon key={card.title} {...card} className="h-full" />
          ))}
        </div>
      </div>
    </section>
  )
}
