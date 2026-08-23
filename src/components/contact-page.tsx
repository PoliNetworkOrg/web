import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { FiArrowUpRight } from "react-icons/fi"
import { Button } from "@/components/ui/button"
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
    description: "Per richieste formali, segnalazioni di problemi o questioni che non rientrano nelle altre categorie.",
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
        Se sei un&apos;azienda o associazione e vuoi proporre una collaborazione, puoi consultare la pagina{" "}
        <Link href="/collaborate" className="text-blue-secondary underline underline-offset-2">
          Collabora con Noi
        </Link>
        .
      </>
    ),
    email: "events@polinetwork.org",
  },
]

function ContactHero() {
  return (
    <section className="flex w-full flex-col items-center px-6 pt-40 pb-24 sm:px-10 sm:pt-48 sm:pb-32">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        <div className="flex w-full max-w-4xl flex-col items-center gap-6 text-center">
          <h1 className="typo-display-large md:typo-display-extralarge bg-linear-to-b from-text-primary to-text-secondary bg-clip-text py-8 text-transparent">
            Contattaci
          </h1>
          <p className="typo-title-large md:typo-headline-small text-text-primary">
            Qualunque sia la tua domanda, PoliNetwork è a disposizione.
          </p>
        </div>
      </div>
    </section>
  )
}

function GroupsSection() {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:items-center lg:gap-20">
      <div className="flex flex-col items-start gap-6">
        <h2 className="typo-headline-medium md:typo-display-small bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
          Hai mille dubbi sul Poli?
          <br />
          Siamo pronti ad aiutarti!
        </h2>
        <p className="typo-body-large md:typo-title-large max-w-2xl text-text-primary">
          Il modo più rapido per ottenere risposte su esami, burocrazia universitaria o sulla vita al Politecnico è{" "}
          <Link href="/groups" className="text-blue-secondary hover:underline focus-visible:underline">
            entrare nel gruppo del tuo corso
          </Link>
          , su Telegram o su WhatsApp, dove gli admin sono presenti ogni giorno.
        </p>
        <Button asChild size="lg">
          <Link href="/groups">
            Trova il tuo gruppo
            <FiArrowUpRight />
          </Link>
        </Button>
      </div>

      <Image
        src="/contact-group.png"
        alt="Foto di gruppo della community PoliNetwork"
        width={721}
        height={342}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="aspect-[721/342] w-full rounded-rectangles object-cover"
      />
    </section>
  )
}

function ContactCard({ title, description, email }: ContactCardData) {
  return (
    <Card className="h-full min-h-66 w-full">
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

function EmailSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 sm:py-28">
      <div className="flex max-w-4xl flex-col gap-6">
        <h2 className="typo-headline-medium md:typo-display-small bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
          Hai una richiesta specifica?
        </h2>
        <p className="typo-body-large md:typo-title-large text-text-primary">
          Per tutto il resto,{" "}
          <a href="mailto:info@polinetwork.org" className="text-blue-secondary hover:underline focus-visible:underline">
            puoi scriverci direttamente
          </a>
          .
          <br />
          Qui sotto trovi i contatti in base al tipo di richiesta.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {contactCards.map((card) => (
          <ContactCard key={card.email} {...card} />
        ))}
      </div>
    </section>
  )
}

export function ContactPage() {
  return (
    <main className="w-full pb-16">
      <ContactHero />
      <GroupsSection />
      <EmailSection />
    </main>
  )
}
