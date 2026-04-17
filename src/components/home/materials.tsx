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
  { title: "Dispense", icon: FiBook, size: { base: "xs", sm: "sm" }, href: "#" },
  { title: "Esami", icon: FiFileText, size: { base: "xs", sm: "sm" }, href: "#" },
  { title: "Appunti", icon: FiClipboard, size: { base: "xs", sm: "sm" }, href: "#" },
] as const

export function Materials() {
  return (
    <section className="mx-auto flex max-w-400 flex-col-reverse gap-24 px-11 py-28 sm:px-20 2xl:flex-row 2xl:items-start 2xl:gap-32">
      <div className="flex grow flex-col gap-5 sm:gap-6 2xl:gap-8 2xl:pt-44">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-12 2xl:gap-20">
          {/* TODO sotto sm usare le altre card fatte da Diubi */}
          {featuredCards.map((card) => (
            <CardIcon key={card.title} {...card} className="h-full" />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 sm:gap-12 2xl:gap-20">
          {quickLinks.map((card) => (
            <CardIcon key={card.title} {...card} className="h-full" />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 text-center sm:ml-auto sm:items-start sm:text-start">
        <h2 className="typo-display-large sm:typo-display-extralarge bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent sm:py-4">
          Materials
        </h2>
        <p className="typo-body-large hidden max-w-lg sm:block">
          Il piu grande archivio didattico creato dagli studenti per gli studenti del Politecnico di Milano. Cerca tra
          migliaia di appunti, dispense, temi d'esame e molto altro. Carica i tuoi file per far crescere la community e
          trova tutto cio che ti serve, organizzato per corso di studi.
        </p>
        <p className="typo-body-large max-w-lg sm:hidden">
          Il più grande archivio didattico degli studenti del Politecnico. Trova appunti, dispense ed esami, oppure
          carica i tuoi file per far crescere la community.
        </p>
        <Button variant="primary" size="lg" className="w-fit">
          Scopri di piu
          <FiArrowUpRight />
        </Button>
      </div>
    </section>
  )
}
