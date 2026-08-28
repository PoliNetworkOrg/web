import { FiArrowUpRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export function CollaboraSection() {
  return (
    <section className="flex w-full flex-row gap-8 px-48">
      <div className="flex max-w-[959] flex-col gap-6">
        <h2 className="typo-display-large sm:typo-display-medium text-start">Vuoi sviluppare un progetto insieme a noi?</h2>

        <div className="flex flex-col gap-3 text-start">
          <p className="typo-title-large sm:typo-headline-small">
            Siamo sempre felici di <span className="text-blue-primary">collaborare con aziende o associazioni studentesche</span>
            per portare agli studenti
            del PoliMi eventi e attività di valore.
          </p>
          <p className="typo-title-large sm:typo-headline-small">
            Consulta la pagina dedicata per scoprire come possiamo unire le forze!
          </p>
        </div>

        <Button variant="primary" size="lg" className="w-fit gap-2 self-center md:self-start">
          Collabora con noi
          <FiArrowUpRight />
        </Button>

      </div>
    </section>
  )
}