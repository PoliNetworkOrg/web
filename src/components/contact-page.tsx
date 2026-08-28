import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { FiArrowUpRight } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Card, CardBottomButton, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Hero } from "@/components/ui/hero"

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

function ContactHero() {
  return (
    <section className="h-[536px] w-full px-6 pt-[262px] sm:h-[788px] sm:px-10 sm:pt-[286px]">
      <Hero
        title="Contattaci"
        description={
          <>
            Qualunque sia la tua domanda,
            <br />
            PoliNetwork è a disposizione.
          </>
        }
        titleAs="h1"
        gradientDescription
        className="gap-10"
        titleClassName="py-0 sm:py-0"
        descriptionClassName="max-w-[780px]"
      />
    </section>
  )
}

function GroupsSection() {
  return (
    <section className="mx-auto grid min-h-[775px] w-full max-w-7xl gap-[60px] px-6 py-30 sm:px-10 md:min-h-[494px] md:py-[75px] lg:grid-cols-2 lg:items-center lg:gap-20">
      <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
        <h2 className="typo-headline-medium sm:typo-display-medium bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
          Hai mille dubbi sul Poli?
          <br />
          Siamo pronti ad aiutarti!
        </h2>
        <p className="typo-body-large sm:typo-headline-small max-w-2xl text-text-primary">
          Il modo più rapido per ottenere risposte su esami, burocrazia universitaria o sulla vita al Politecnico è{" "}
          <Link href="/groups" className="text-blue-secondary hover:underline focus-visible:underline">
            entrare nel gruppo del tuo corso
          </Link>
          , su Telegram o su WhatsApp, dove gli admin sono presenti ogni giorno.
        </p>
        <Button asChild size="lg">
          <Link href="/groups">
            Trova il tuo gruppo
            <FiArrowUpRight className="size-5" />
          </Link>
        </Button>
      </div>

      <Image
        src="/contact-group.png"
        alt="Foto di gruppo della community PoliNetwork"
        width={721}
        height={342}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="aspect-[354/176.251] w-full rounded-rectangles object-cover md:aspect-[721/342]"
      />
    </section>
  )
}

function CollaborationSection() {
  return (
    <section className="mx-auto flex min-h-[523px] w-full max-w-7xl items-center px-6 py-30 sm:px-10 md:min-h-[548px] md:py-[150px]">
      <div className="flex w-full max-w-[968px] flex-col items-center gap-6 text-center md:items-start md:text-left">
        <h2 className="typo-headline-medium sm:typo-display-medium bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
          Vuoi sviluppare un <br className="md:hidden" /> progetto insieme a noi?
        </h2>
        <div className="typo-body-large sm:typo-headline-small flex flex-col gap-2.5 text-text-primary">
          <p>
            Siamo sempre felici di collaborare con{" "}
            <Link href="/collaborate" className="text-blue-secondary hover:underline focus-visible:underline">
              aziende o associazioni studentesche
            </Link>{" "}
            per portare agli studenti del PoliMi eventi e attività di valore.
          </p>
          <p>Consulta la pagina dedicata per scoprire come possiamo unire le forze!</p>
        </div>
        <Button asChild size="lg">
          <Link href="/collaborate">
            Collabora con noi
            <FiArrowUpRight className="size-5" />
          </Link>
        </Button>
      </div>
    </section>
  )
}

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

function EmailSection() {
  return (
    <section className="mx-auto min-h-[1650px] w-full max-w-7xl px-6 py-30 sm:px-10 md:min-h-[773px] md:py-[150px]">
      <div className="flex max-w-4xl flex-col items-center gap-6 text-center md:items-start md:text-left">
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
      </div>

      <div className="mt-6 grid gap-12 sm:grid-cols-2 sm:gap-6 xl:grid-cols-[repeat(4,312px)] xl:justify-between xl:gap-0">
        {contactCards.map((card) => (
          <ContactCard key={card.email} {...card} />
        ))}
      </div>
    </section>
  )
}

export function ContactPage() {
  return (
    <main className="w-full">
      <ContactHero />
      <GroupsSection />
      <CollaborationSection />
      <EmailSection />
    </main>
  )
}
