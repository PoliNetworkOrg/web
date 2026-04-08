import { FiArrowUpRight, FiBook, FiBookOpen, FiClipboard, FiFileText, FiUploadCloud } from "react-icons/fi"
import { CardIcon } from "@/components/card-icon"
import { Button } from "@/components/ui/button"

const featuredCards = [
  {
    title: "Carica",
    description:
      "Hai appunti, dispense o temi d'esame che vuoi condividere? Caricali qui! Il tuo contributo é prezioso per aiutare migliaia di colleghi con materiale aggiornato!",
    icon: FiUploadCloud,
    size: "lg",
    href: "#",
  },
  {
    title: "Visualizza",
    description:
      "Cerca cio che ti serve per il tuo prossimo esame. Naviga tra i corsi di studio e trova facilmente appunti, esercizi e dispense condivisi da altri studenti come te.",
    icon: FiBookOpen,
    size: "lg",
    href: "#",
  },
] as const

const quickLinks = [
  { title: "Dispense", icon: FiBook, size: "sm", href: "#" },
  { title: "Esami", icon: FiFileText, size: "sm", href: "#" },
  { title: "Appunti", icon: FiClipboard, size: "sm", href: "#" },
] as const

export function Materials() {
  return (
    <section className="mx-auto grid gap-8 px-4 py-10 sm:px-8 sm:py-12 lg:gap-10 lg:px-12 xl:grid-cols-2 xl:items-start xl:gap-12 xl:px-16 2xl:gap-16 2xl:px-32">
      <div className="order-2 flex flex-col gap-5 lg:gap-6 xl:order-1 xl:gap-8 xl:pt-12 2xl:pt-44">
        <div className="grid gap-12 md:grid-cols-2 2xl:gap-20">
          {featuredCards.map((card) => (
            <CardIcon key={card.title} {...card} className="h-full" />
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 2xl:gap-20">
          {quickLinks.map((card) => (
            <CardIcon key={card.title} {...card} className="h-full" />
          ))}
        </div>
      </div>

      <div className="order-1 flex flex-col items-start gap-8 xl:order-2 xl:justify-self-end">
        <h2 className="typo-display-large sm:typo-display-extralarge w-fit bg-linear-to-b from-text-primary to-text-secondary bg-clip-text py-4 text-transparent">
          Materials
        </h2>
        <p className="typo-body-large max-w-lg">
          Il piu grande archivio didattico creato dagli studenti per gli studenti del Politecnico di Milano. Cerca tra
          migliaia di appunti, dispense, temi d'esame e molto altro. Carica i tuoi file per far crescere la community e
          trova tutto cio che ti serve, organizzato per corso di studi.
        </p>
        <Button variant="primary" size="lg" className="w-fit">
          Scopri di piu
          <FiArrowUpRight />
        </Button>
      </div>
    </section>
  )
}
