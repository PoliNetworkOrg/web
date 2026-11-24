import { Fragment } from "react"
import { FiArrowUpRight, FiBookOpen, FiUploadCloud } from "react-icons/fi"
import { CardIcon } from "@/components/card-icon"
import { MATERIALS_URL } from "@/components/header/constants"
import { CONTAINER } from "@/components/layout/page"
import { Link } from "@/components/link"
import { useActivationToast } from "@/components/ui/activation-toast"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CardCaption } from "../card-caption"

// Upload and per-type archive pages will be activated later.
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
      "Cerca ciò che ti serve per il tuo prossimo esame: dispense, esami e appunti, divisi per corso di studi e condivisi da altri studenti come te.",
    icon: FiBookOpen,
    href: MATERIALS_URL,
  },
]

export function Materials() {
  const { showActivationToast, activationToast } = useActivationToast()
  return (
    <section
      className={cn(
        CONTAINER,
        "grid grid-cols-1 gap-y-6 py-20 sm:gap-y-8 sm:py-24 xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] xl:gap-x-16 xl:gap-y-10 xl:py-32"
      )}
    >
      <h2 className="typo-display-fluid-extralarge text-center text-gradient-grey xl:col-start-2 xl:text-start">
        Materiali
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

      <div className="mx-auto grid w-full max-w-4xl gap-4 pt-6 sm:grid-cols-2 sm:gap-6 sm:pt-8 xl:col-start-1 xl:row-start-2 xl:max-w-none xl:pt-0">
        {featuredCards.map((card) => (
          <Fragment key={card.title}>
            <CardCaption
              title={card.title}
              caption={card.description}
              icon={card.icon}
              href={card.href}
              onClick={card.href ? undefined : showActivationToast}
              className="h-auto w-full p-6 xl:hidden"
            />
            <CardIcon
              title={card.title}
              description={card.description}
              icon={card.icon}
              href={card.href}
              onClick={card.href ? undefined : showActivationToast}
              size="md"
              className="hidden h-full xl:block"
            />
          </Fragment>
        ))}
      </div>
      {activationToast}
    </section>
  )
}
