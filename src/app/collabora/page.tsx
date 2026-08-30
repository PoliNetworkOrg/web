import type { Metadata } from "next";
import { Hero } from "@/components/ui/hero";
import { TextImageLayout, TextOnlyLayout, TextChildrenLayout } from "@/components/layout";
import { ContactSection } from "@/components/collabora/contact-section";
import { FiArrowUpRight, FiMessageSquare, FiUsers } from "react-icons/fi"
import { MdOutlineHandshake, MdOutlineSchool } from "react-icons/md"
import associationsImage from "@/assets/images/collabora_associations.jpg";
import companyImage from "@/assets/images/collabora_company.png";
import { CardIcon } from "@/components/card-icon";

const aboutCards = [
  {
    title: "18k+",
    description: (
      <>
        <span className="text-blue-secondary">Membri</span> del nostro gruppo Telegram principale
      </>
    ),
    icon: FiMessageSquare,
    size: "sm",
  },
  {
    title: "45k+",
    description: (
      <>
        <span className="text-blue-secondary">Studenti</span> raggiunti da PoliNetwork ogni anno
      </>
    ),
    icon: MdOutlineSchool,
    size: "sm",
  },
  {
    title: "1000+",
    description: (
      <>
        <span className="text-blue-secondary">Persone</span> nel nostro evento più grande
      </>
    ),

    icon: FiUsers,
    size: "sm",
  },
  {
    title: "5",
    description: (
      <>
        <span className="text-blue-secondary">Team Operativi</span> pronti a collaborare
      </>
    ),
    icon: MdOutlineHandshake,
    size: "sm",
  },
] as const

export const metadata: Metadata = {
  title: "Collabora con Noi",
  description:
    "Mettiamo la nostra infrastruttura e i nostri talenti a disposizione di chi ha buone idee per gli studenti del PoliMi",
};

export default function CollaboraPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-700 flex-col items-center justify-center gap-60 px-4 py-49 md:gap-38">
      <Hero
        title="Collabora con Noi"
        description="Mettiamo la nostra infrastruttura e i nostri talenti a disposizione di chi ha buone idee per gli studenti del PoliMi"
        gradientDescription
      />
      <TextChildrenLayout
        title="Chi siamo?"
        description={
          <>
            <p className="typo-title-large text-center min-[1616px]:text-start">
              PoliNetwork è l'infrastruttura di comunicazione studentesca del Politecnico di Milano.
            </p>
            <p className="typo-title-large text-center min-[1616px]:text-start">
              Gestiamo oltre 500 gruppi Telegram e WhatsApp, una presenza social in crescita e strumenti digitali usati
              ogni anno da decine di migliaia di studenti di ingegneria, architettura e design.
            </p>
            <div>
              <p className="typo-title-large text-center text-blue-secondary min-[1616px]:text-start">
                Chi entra al PoliMi, prima o poi, incontra PoliNetwork.
              </p>
              <p className="typo-title-large text-center min-[1616px]:text-start">(e persino studenti di liceo o altri atenei)</p>
            </div>
          </>
        }
        button={{ text: "Scopri la nostra storia", icon: <FiArrowUpRight /> }}
        classNames={{ textDiv:"flex min-w-0 flex-1 basis-120 flex-col gap-6", cardsContainer: "grid min-w-0 flex-1 basis-120 grid-cols-2 grid-rows-2 gap-x-8 gap-y-9", button:"gap-2 self-center md:self-start"}}
      >
        {aboutCards.map((card) => (
          <CardIcon key={card.title} {...card} align="start" className="w-full min-w-0" />
        ))}
      </TextChildrenLayout>
      <TextOnlyLayout
        title="Cosa possiamo fare insieme?"
        description={
          <>
            <p className="typo-title-large sm:typo-headline-small">
              Collaborare con noi significa{" "}
              <span className="text-blue-primary">
                accedere a questa community in modo diretto
              </span>
              . Non siamo un canale pubblicitario e non accettiamo promozioni
              commerciali generiche: ogni collaborazione viene valutata in
              termini di valore concreto per gli studenti del Politecnico
              <span className="typo-headline-extrasmall">
                {" "}
                (e nel rispetto dei nostri valori sanciti sul nostro statuto).
              </span>
            </p>
            <p className="typo-title-large sm:typo-headline-small">
              Se il progetto ha senso per la nostra community, siamo disponibili
              a costruirlo insieme!
            </p>
          </>
        }
      />
      <TextImageLayout
        title="Sei un'associazione studentesca?"
        description={
          <>
            <p className="typo-title-large sm:typo-headline-small">
              Se fai parte dell'ecosistema universitario del Politecnico di
              Milano o di un'altra università, possiamo valutare collaborazioni
              su
              <span className="text-blue-secondary">
                {" "}
                eventi congiunti, visibilità reciproca sui canali o iniziative
                rivolte agli studenti.
              </span>
            </p>
            <p className="typo-title-large sm:typo-headline-small">
              Le collaborazioni più efficaci che abbiamo avuto nel tempo sono
              nate da gruppi studenteschi che condividevano una parte degli
              obiettivi che perseguiamo:
              <span className="text-blue-secondary">
                {" "}
                rendere la vita universitaria meno complicata e più ricca per
                chi studia al Politecnico.
              </span>
            </p>
            <p className="typo-title-large sm:typo-headline-small">
              Il processo è semplice: ci scrivi, ci descrivi il progetto e
              valutiamo insieme se c'è una base comune (per poi mettere i nostri
              talent a disposizione di questa partnership).
            </p>
          </>
        }
        imageSrc={associationsImage}
        imageW={611}
        imageH={408}
      />
      <TextImageLayout
        title="Sei un’azienda?"
        description={
          <>
            <p className="typo-title-large sm:typo-headline-small">
              PoliNetwork è un punto di accesso diretto alla community
              studentesca del Politecnico di Milano: migliaia di studenti di
              corsi tecnici e progettuali, da tutta Italia, in tutti gli anni di
              corso. Se hai
              <span className="text-blue-secondary">
                {" "}
                un'iniziativa che porta valore reale agli studenti
              </span>
              , siamo disponibili a valutarla.
            </p>
            <p className="typo-title-large sm:typo-headline-small">
              Siamo aperti a proposte su
              <span className="text-blue-secondary">
                {" "}
                eventi, iniziative di recruiting o progetti di visibilità
              </span>
              . Ogni proposta viene discussa nel rispetto della nostra
              indipendenza: non facciamo cose che compromettono la fiducia che
              gli studenti ripongono in noi.
            </p>
          </>
        }
        imageSrc={companyImage}
        imageW={611}
        imageH={298}
        horizontalOrientation="rl"
      />
      <ContactSection />
    </main>
  );
}
