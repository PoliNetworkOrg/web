import { FiUserPlus } from "react-icons/fi"
import GuideContent from "@/components/guides/content"
import GuideHero from "@/components/guides/hero"
import { Button } from "@/components/ui/button"

const guidesInfo = {
  title: "Le guide per Ingegneria Informatica",
  description: "Rimani aggiornato sulle idee appena condivise dagli studenti del Politecnico",
  guides: [
    {
      text: "Corsi a scelta Primo Anno",
    },
    {
      text: "Corsi a scelta Secondo Anno",
    },
    {
      text: "Corsi a scelta Terzo Anno",
    },
  ],
}

const guidesGeneral = {
  title: "Le guide generali",
  description: "Consulta le guide generali per orientarti al meglio nella vita universitaria",
  guides: [
    {
      text: "Guida a Webex",
    },
    {
      text: "Guida alla connessione alla rete del Polimi",
    },
  ],
}

export default function GuidePage() {
  return (
    <section className="min-h-screen w-full">
      <div className="mx-auto flex w-full max-w-350 flex-col gap-35 px-12 pt-58 pb-18">
        <GuideHero />
        <GuideContent {...guidesInfo} />
      </div>

      <div className="flex w-full justify-end px-12 pb-18">
        <Button variant="tertiaryBlur" size="lg" className="text-blue-secondary">
          <FiUserPlus />
          Sei una matricola?
        </Button>
      </div>

      <div className="mx-auto flex w-full max-w-350 flex-col px-12 pb-18">
        <GuideContent {...guidesGeneral} />
      </div>
    </section>
  )
}
