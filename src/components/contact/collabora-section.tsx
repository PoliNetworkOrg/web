import { FiArrowUpRight } from "react-icons/fi"
import { Button } from "@/components/ui/button"

export function CollaboraSection() {
  return (
    <section className="flex w-full flex-row justify-center gap-8 px-6 min-[1616px]:justify-start min-[1616px]:px-36">
      <div className="flex max-w-[959] flex-col gap-6">
        <h2 className="typo-headline-medium md:typo-display-medium text-center min-[1616px]:text-start">
          Vuoi sviluppare un progetto insieme a noi?
        </h2>

        <div className="flex min-w-0 flex-col gap-3 text-center md:text-start">
          <p className="typo-body-large md:typo-headline-small text-center min-[1616px]:text-start">
            Siamo sempre felici di{" "}
            <span className="text-blue-primary">collaborare con aziende o associazioni studentesche</span> per portare
            agli studenti del PoliMi eventi e attività di valore.
          </p>
          <p className="typo-body-large md:typo-headline-small text-center min-[1616px]:text-start">
            Consulta la pagina dedicata per scoprire come possiamo unire le forze!
          </p>
        </div>

        <Button variant="primary" size="lg" className="w-fit gap-2 self-center min-[1616px]:self-start">
          Collabora con noi
          <FiArrowUpRight />
        </Button>
      </div>
    </section>
  )
}
