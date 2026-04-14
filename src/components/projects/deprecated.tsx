import { FiArrowDown, FiUploadCloud } from "react-icons/fi"
import { CardIcon } from "@/components/card-icon"
import { Button } from "../ui/button"

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

export function Deprecated() {
  return (
    <section className="mx-auto flex min-h-screen max-w-400 flex-col items-center justify-center gap-14 px-4 md:items-start">
      <div className="flex flex-col items-center gap-2 md:items-start">
        <h3 className="typo-display-medium text-center md:text-left">Progetti deprecati</h3>
        <p className="typo-body-large text-center md:text-left">
          {/* TODO a me sembra troppo piccolo*/}
          Qui raccogliamo i progetti non più aggiornati o attivi. <br />
          Puoi contribuire a riportarli in vita, migliorarli o usarli come base per nuove idee.
        </p>
      </div>
      <div className="flex flex-col gap-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* TODO sostituire la card con la versione corretta */}
          {communityCards.map((card) => (
            <CardIcon key={card.title} {...card} className="h-full" />
          ))}
        </div>
        <div className="flex justify-center">
          <Button variant="primary" size="lg">
            Mostra di più
            <FiArrowDown />
          </Button>
        </div>
      </div>
    </section>
  )
}
