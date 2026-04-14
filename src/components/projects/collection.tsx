import { FiArrowDown, FiSearch, FiUploadCloud } from "react-icons/fi"
import { CardIcon } from "@/components/card-icon"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

// TODO da sostituire con dati veri
const collectionCards = [
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
  {
    title: "Title 5",
    description:
      "description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    icon: FiUploadCloud,
    size: "sm",
    href: "#",
  },
  {
    title: "Title 6",
    description:
      "description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    icon: FiUploadCloud,
    size: "sm",
    href: "#",
  },
  {
    title: "Title 7",
    description:
      "description: Lorem ipsum dolor sit amet, consectet ur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    icon: FiUploadCloud,
    size: "sm",
    href: "#",
  },
  {
    title: "Title 8",
    description:
      "description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua.",
    icon: FiUploadCloud,
    size: "sm",
    href: "#",
  },
] as const

export function Collection() {
  return (
    <section className="mx-auto flex min-h-screen max-w-400 flex-col items-center justify-center gap-22 px-4">
      <div className="flex flex-col items-center gap-8">
        <h2 className="typo-display-medium text-center">Esplora la raccolta completa dei progetti</h2>
        <div className="flex w-full justify-center">
          <Input
            icon={<FiSearch className="h-5 w-5" />}
            type="text"
            placeholder="Search by name"
            aria-label="Search by name"
            containerClassName="max-w-xl"
            className="typo-body-medium"
          />
        </div>
      </div>

      <div className="flex flex-col gap-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* TODO sostituire la card con la versione corretta */}
          {collectionCards.map((card) => (
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
