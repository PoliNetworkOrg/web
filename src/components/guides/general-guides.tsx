import Link from "next/link"
import { FiArrowLeft, FiX } from "react-icons/fi"
import AccordionList from "@/components/accordion-list"
import { LOREM_GUIDES } from "@/components/guides/constants"

export function GeneralGuides() {
  return (
    <main className="mx-auto flex min-h-svh w-full min-w-0 max-w-7xl flex-col gap-8 px-6 py-52 md:gap-0">
      <header className="relative flex flex-col items-center gap-1 md:static md:flex-row md:items-center md:gap-4">
        <Link
          href="/guides"
          replace
          aria-label="Indietro"
          className="absolute top-0 left-0 grid size-10 shrink-0 place-items-center rounded-full bg-white/60 md:static"
        >
          <FiArrowLeft className="size-5" />
        </Link>
        <div className="flex min-w-0 flex-col items-center gap-1 text-center md:flex-1">
          <h1 className="typo-title-large md:typo-display-medium text-text-primary">Guide Generali</h1>
        </div>
        <Link
          href="/guides"
          aria-label="Chiudi"
          className="absolute top-0 right-0 grid size-10 shrink-0 place-items-center rounded-full bg-white/60 md:static"
        >
          <FiX className="size-5" />
        </Link>
      </header>

      {LOREM_GUIDES.length > 0 ? (
        <AccordionList items={LOREM_GUIDES} className="md:mt-25.75" />
      ) : (
        <p className="typo-body-medium text-center text-text-secondary md:mt-16.25">
          Nessuna guida disponibile al momento.
        </p>
      )}
    </main>
  )
}
