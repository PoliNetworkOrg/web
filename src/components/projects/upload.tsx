import { FiMail } from "react-icons/fi"
import { CardCaption } from "../card-caption"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "../layout/page"

const EMAIL = "it@polinetwork.org"

export function Upload() {
  return (
    <section id="proponi" aria-labelledby="proponi-title" className={`${CONTAINER} scroll-mt-32`}>
      {/* The text with the requirements under it, the contact card beside it from lg */}
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16">
        <div className="flex flex-col gap-6">
          <h2 id="proponi-title" className={SECTION_TITLE}>
            Hai un'idea?
          </h2>
          <p className={`${SECTION_LEAD} max-w-2xl`}>
            Proponi un nuovo progetto o un miglioramento al sito: il team di PoliNetwork ti aiuta a svilupparlo e, se
            rispetta i requisiti, lo pubblica qui.
          </p>
          <p className="typo-body-large max-w-2xl text-pretty text-text-secondary">
            <strong className="font-medium text-text-primary">Requisiti:</strong> il progetto deve essere open source,
            utile alla community e senza scopo di lucro.
          </p>
        </div>

        <CardCaption
          title="Contatti"
          caption={
            <a
              href={`mailto:${EMAIL}`}
              className="typo-body-large flex w-fit items-center gap-2 whitespace-nowrap underline-offset-4 hover:underline focus-visible:underline"
            >
              <FiMail aria-hidden className="shrink-0" /> {EMAIL}
            </a>
          }
          className="h-auto w-full p-6"
        />
      </div>
    </section>
  )
}
