import Link from "next/link"
import { ContactCard, type ContactCardData } from "../contact-card"
import { CONTAINER, INLINE_LINK, SECTION_LEAD, SECTION_TITLE } from "../layout/page"

const contactCards: ContactCardData[] = [
  {
    title: "Informazioni Generali",
    description: "Per qualsiasi domanda su PoliNetwork, sui nostri strumenti o servizi.",
    email: "info@polinetwork.org",
  },
  {
    title: "Consiglio Direttivo",
    description: "Per richieste formali, segnalazioni di problemi o questioni che non rientrano nelle categorie sopra.",
    email: "direttivo@polinetwork.org",
  },
  {
    title: "Candidature",
    description: (
      <>
        Se vuoi candidarti come admin o come membro di un team, nella pagina{" "}
        <Link href="/join" className={INLINE_LINK}>
          Unisciti a noi
        </Link>{" "}
        trovi come fare.
      </>
    ),
    email: "hr@polinetwork.org",
  },
  {
    title: "Collaborazioni",
    description: (
      <>
        Se sei un&apos;azienda o associazione e vuoi proporre una collaborazione, puoi anche consultare la pagina{" "}
        <Link href="/collabora" className={INLINE_LINK}>
          Collabora con Noi
        </Link>{" "}
        per capire cosa offriamo.
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
        Per tutto il resto,{" "}
        <a href="mailto:info@polinetwork.org" className={INLINE_LINK}>
          puoi scriverci direttamente
        </a>
        .
        <br />
        Qui sotto trovi i contatti in base al tipo di richiesta.
      </p>

      {/* 2×2 between one and four columns, so no card is left alone on a row */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
        {contactCards.map((card) => (
          <ContactCard key={card.email} {...card} />
        ))}
      </div>
    </section>
  )
}
