import Link from "next/link"
import { Fragment } from "react"
import { FiArrowUpRight, FiBook, FiBookOpen, FiClipboard, FiFileText, FiUploadCloud } from "react-icons/fi"
import { CardIcon } from "@/components/card-icon"
import { MATERIALS_URL } from "@/components/header/constants"
import { CONTAINER } from "@/components/layout/page"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CardCaption } from "../card-caption"

// "Carica" has no destination yet, so it stays a plain card
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

// What the archive holds. Not links: the archive has no per-type pages to open
const archiveTypes = [
  { title: "Dispense", icon: FiBook },
  { title: "Esami", icon: FiFileText },
  { title: "Appunti", icon: FiClipboard },
]

export function Materials() {
  return (
    <section
      className={cn(
        CONTAINER,
        "grid grid-cols-1 gap-y-6 py-20 sm:gap-y-8 sm:py-24 xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] xl:gap-x-16 xl:gap-y-10 xl:py-32"
      )}
    >
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

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 pt-6 sm:gap-6 sm:pt-8 xl:col-start-1 xl:row-start-2 xl:max-w-none xl:pt-0">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {featuredCards.map((card) => (
            <Fragment key={card.title}>
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
                size="md"
                className="hidden h-full xl:block"
              />
            </Fragment>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          {archiveTypes.map((card) => (
            <CardIcon key={card.title} {...card} size={{ base: "xs", sm: "sm" }} className="h-full" />
          ))}
        </div>
      </div>
    </section>
  )
}
