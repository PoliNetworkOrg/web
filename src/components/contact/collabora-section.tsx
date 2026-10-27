import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import { Button } from "@/components/ui/button"

export function CollaboraSection() {
  return (
    <section className={CONTAINER}>
      <div className="flex max-w-3xl flex-col items-start gap-6">
        <h2 className={SECTION_TITLE}>Vuoi sviluppare un progetto insieme a noi?</h2>

        <div className={`${SECTION_LEAD} flex flex-col gap-3`}>
          <p>
            Siamo sempre felici di{" "}
            <span className="text-blue-secondary">collaborare con aziende o associazioni studentesche</span> per portare
            agli studenti del PoliMi eventi e attività di valore.
          </p>
          <p>Consulta la pagina dedicata per scoprire come possiamo unire le forze!</p>
        </div>

        <Button variant="primary" size="lg" className="mt-2" asChild>
          <Link href="/collabora">
            Collabora con noi
            <FiArrowUpRight />
          </Link>
        </Button>
      </div>
    </section>
  )
}
