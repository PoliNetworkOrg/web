import Link from "next/link"
import type { ReactNode } from "react"
import { Card, CardBottomButton, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


type ContactCardData = {
  title: string
  description: ReactNode
  email: string
}

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
        Se vuoi candidarti come admin o come membro di un team, ti consigliamo di passare dal form disponibile nella
        pagina{" "}
        <Link href="/join" className="text-blue-secondary underline underline-offset-2">
          Struttura
        </Link>
        .
      </>
    ),
    email: "hr@polinetwork.org",
  },
  {
    title: "Collaborazioni",
    description: (
      <>
        Se sei un&apos;azienda o associazione e vuoi proporre una collaborazione, puoi anche consultare la pagina{" "}
        <Link href="/collaborate" className="text-blue-secondary underline underline-offset-2">
          Collabora con Noi
        </Link>{" "}
        per capire cosa offriamo.
      </>
    ),
    email: "events@polinetwork.org",
  },
]

function ContactCard({ title, description, email }: ContactCardData) {
  return (
    <Card className="h-66 w-full max-w-78 gap-6 justify-self-center p-6">
      <CardHeader>
        <CardTitle className="typo-headline-small">{title}</CardTitle>
      </CardHeader>
      <CardContent className="typo-body-medium flex-1">{description}</CardContent>
      <CardBottomButton variant="tertiary" asChild className="mt-auto">
        <a href={`mailto:${email}`}>{email}</a>
      </CardBottomButton>
    </Card>
  )
}

export function EmailSection() {
  return (
    <section className="flex flex-col gap-6 px-48">
      <h2 className="typo-headline-medium sm:typo-display-medium bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
        Hai una richiesta specifica?
      </h2>
      <p className="typo-body-large sm:typo-headline-small text-text-primary">
        Per tutto il resto,{" "}
        <a href="mailto:info@polinetwork.org" className="text-blue-secondary hover:underline focus-visible:underline">
          puoi scriverci direttamente
        </a>
        .
        <br />
        Qui sotto trovi i contatti in base al tipo di richiesta.
      </p>

      <div className="flex flex-wrap gap-12 xl:gap-16">
        {contactCards.map((card) => (
          <ContactCard key={card.email} {...card} />
        ))}
      </div>
    </section>
  )
}
