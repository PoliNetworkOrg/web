import Link from "next/link"
import { FiArrowUpRight, FiBook, FiBookOpen, FiClipboard, FiFileText, FiUploadCloud } from "react-icons/fi"
import { CardIcon } from "@/components/card-icon"
import { Button } from "@/components/ui/button"
import { CardCaption } from "../card-caption"

const MATERIALS_URL = "https://polinetwork.org/it/materials/view/"

// "Carica" has no destination yet (the old upload page is empty), so it stays a plain card instead of a dead link
const featuredCards = [
  {
    title: "Carica",
    description:
      "Hai appunti, dispense o temi d'esame che vuoi condividere? Caricali qui! Il tuo contributo è prezioso per aiutare migliaia di colleghi con materiale aggiornato!",
    icon: FiUploadCloud,
  },
  {
    title: "Visualizza",
    description:
      "Cerca ciò che ti serve per il tuo prossimo esame. Naviga tra i corsi di studio e trova facilmente appunti, esercizi e dispense condivisi da altri studenti come te.",
    icon: FiBookOpen,
    href: MATERIALS_URL,
  },
]

// The archive has no per-type pages: every shortcut opens it
const quickLinks = [
  { title: "Dispense", icon: FiBook },
  { title: "Esami", icon: FiFileText },
  { title: "Appunti", icon: FiClipboard },
]

export function Materials() {
  return (
    <section className="mx-auto grid w-full max-w-384 grid-cols-1 gap-y-6 px-6 py-20 sm:gap-y-8 sm:px-10 sm:py-24 lg:px-16 xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] xl:gap-x-16 xl:gap-y-10 xl:py-32">
      <h2 className="typo-display-fluid-extralarge bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-center text-transparent xl:col-start-2 xl:text-start">
        Materials
      </h2>

      <div className="flex flex-col items-center gap-8 text-center xl:col-start-2 xl:row-start-2 xl:items-start xl:text-start">
        <p className="typo-body-large hidden max-w-xl sm:block">
          Il più grande archivio didattico creato dagli studenti per gli studenti del Politecnico di Milano. Cerca tra
          migliaia di appunti, dispense, temi d'esame e molto altro. Carica i tuoi file per far crescere la community e
          trova tutto ciò che ti serve, organizzato per corso di studi.
        </p>
        <p className="typo-body-large max-w-lg sm:hidden">
          Il più grande archivio didattico degli studenti del Politecnico. Trova appunti, dispense ed esami, oppure
          carica i tuoi file per far crescere la community.
        </p>
        <Button variant="primary" size="lg" className="w-fit" asChild>
          <Link href={MATERIALS_URL}>
            Scopri di più
            <FiArrowUpRight />
          </Link>
        </Button>
      </div>

      {/* Below xl the cards follow the text, centered and capped so they keep their proportions on tablets */}
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 pt-6 sm:gap-6 sm:pt-8 xl:col-start-1 xl:row-start-2 xl:max-w-none xl:pt-0">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {featuredCards.map((card) => (
            <div key={card.title} className="contents">
              <CardCaption
                title={card.title}
                caption={card.description}
                icon={card.icon}
                href={card.href}
                className="h-auto w-full p-6 xl:hidden"
              />
              <CardIcon
                title={card.title}
                description={card.description}
                icon={card.icon}
                href={card.href}
                hoverEffect={Boolean(card.href)}
                size="md"
                className="hidden h-full xl:block"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          {quickLinks.map((card) => (
            <CardIcon
              key={card.title}
              {...card}
              href={MATERIALS_URL}
              hoverEffect
              size={{ base: "xs", sm: "sm" }}
              className="h-full"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
