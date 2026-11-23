import { Highlight } from "../collabora/section"
import { ContactCard, type ContactCardData } from "../contact-card"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "../layout/page"
import { PeekCarousel } from "../peek-carousel"

const contactCards: ContactCardData[] = [
  {
    title: "Informazioni Generali",
    description: "Per qualsiasi domanda su PoliNetwork, sui nostri strumenti o servizi.",
    email: "info@polinetwork.org",
  },
  {
    title: "Consiglio Direttivo",
    description: "Per richieste formali, segnalazioni di problemi o questioni che non rientrano nelle altre categorie.",
    email: "direttivo@polinetwork.org",
  },
  {
    title: "Candidature",
    description: (
      <>
        Se vuoi candidarti come admin o come membro di un team, segui le indicazioni nella pagina{" "}
        <Highlight>Unisciti a noi</Highlight>.
      </>
    ),
    email: "hr@polinetwork.org",
  },
  {
    title: "Collaborazioni",
    description: (
      <>
        Se sei un&apos;azienda o un&apos;associazione e vuoi proporre una collaborazione, consulta anche la pagina{" "}
        <Highlight>Collabora con noi</Highlight> per capire cosa offriamo.
      </>
    ),
    email: "events@polinetwork.org",
  },
]

export function EmailSection() {
  return (
    <section className={`${CONTAINER} flex flex-col gap-6`}>
      <h2 className={SECTION_TITLE}>Hai una richiesta specifica?</h2>
      <p className={SECTION_LEAD}>
        Qui sotto trovi a chi scrivere in base al tipo di richiesta: per tutto il resto,{" "}
        <a
          href="mailto:info@polinetwork.org"
          className="rounded-sm text-blue-secondary outline-none transition-colors duration-200 decoration-1 underline-offset-4 hover:text-blue-primary hover:underline focus-visible:underline focus-visible:ring-2 focus-visible:ring-blue-secondary"
        >
          info@polinetwork.org
        </a>
        .
      </p>

      {/* 2×2 between one and four columns, so no card is left alone on a row */}
      <div className="mt-4 hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-4">
        {contactCards.map((card) => (
          <ContactCard key={card.email} {...card} />
        ))}
      </div>
      {/* Phones: a carousel instead of four stacked cards */}
      <PeekCarousel
        items={contactCards}
        getKey={(card) => card.email}
        render={(card) => <ContactCard {...card} />}
        className="mt-4 md:hidden"
      />
    </section>
  )
}
