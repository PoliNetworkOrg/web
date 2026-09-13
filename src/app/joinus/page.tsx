import type { Metadata } from "next";
import Image from "next/image";
import sociImage from "@/assets/images/joinus_soci.png";
import { EnterSection } from "@/components/joinus/enter-section";
import { Hero } from "@/components/ui/hero";
import {
  TextChildrenLayout,
  TextOnlyLayout,
  TextImageLayout,
} from "@/components/layout";
import { CardIcon } from "@/components/card-icon";
import {
  MdOutlineChat,
  MdOutlineReport,
  MdAdsClick,
  MdOutlinePalette,
  MdNightlife,
  MdOutlineMailOutline,
  MdOpenInNew,
} from "react-icons/md";
import { IoCodeSlashSharp } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { FiArrowUpRight } from "react-icons/fi";
import { ImParagraphLeft } from "react-icons/im";
import { TbArrowBack } from "react-icons/tb";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Unisciti a Noi",
  description:
    "Scopri come fare la differenza per migliaia di studenti del PoliMi",
};

function StarShine() {
  return (
    <svg viewBox="0 0 54 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>Stella decorativa</title>
      <path d="M50.4673 42.1895L42.8972 34.6105L46.4299 31.0737L54 38.6526L50.4673 42.1895ZM41.3832 11.8737L37.8505 8.33684L45.4206 0.757895L48.9533 4.29474L41.3832 11.8737ZM12.6168 11.8737L5.04673 4.29474L8.57944 0.757895L16.1495 8.33684L12.6168 11.8737ZM3.53271 42.1895L0 38.6526L7.57009 31.0737L11.1028 34.6105L3.53271 42.1895ZM19.0514 37.4526L27 32.6526L34.9486 37.5158L32.8668 28.4211L39.8692 22.3579L30.6589 21.5368L27 12.9474L23.3411 21.4737L14.1308 22.2947L21.1332 28.4211L19.0514 37.4526ZM11.4182 48L15.5187 30.2526L1.76636 18.3158L19.9346 16.7368L27 0L34.0654 16.7368L52.2336 18.3158L38.4813 30.2526L42.5818 48L27 38.5895L11.4182 48Z" />
    </svg>
  );
}

const adminCards = [
  {
    title: "Risponde",
    description: "Alle domande delle matricole sulla burocrazia universitaria",
    icon: MdOutlineChat,
    size: "sm",
  },
  {
    title: "Rimuove",
    description: "I messaggi di spam o che vanno contro il regolamento",
    icon: MdOutlineReport,
    size: "sm",
  },
  {
    title: "Regola",
    description: "Le conversazioni mantenendo il gruppo in ordine",

    icon: StarShine,
    size: "sm",
  },
  {
    title: "Rafforza",
    description: "Il funzionamento del gruppo e la sua utilità",
    icon: MdAdsClick,
    size: "sm",
  },
] as const;

const teamsCards = [
  {
    title: "Sviluppo Tecnico",
    description:
      "Realizza prodotti digitali in produzione, usati da migliaia di persone",
    icon: IoCodeSlashSharp,
    size: "sm",
  },
  {
    title: "Comunicazione",
    description:
      "Gestisce la comunicazione e l'identità visiva dell'associazione, (Instagram, grafiche di eventi...)",
    icon: MdOutlinePalette,
    size: "sm",
  },
  {
    title: "Gestione HR",
    description:
      "Struttura i processi di recruiting e onboarding e gestisce i volontari del network",
    icon: BsPeople,
    size: "sm",
  },
  {
    title: "Eventi/Partnership",
    description:
      "Organizza eventi e costruisce collaborazioni con aziende e associazioni esterne",
    icon: MdNightlife,
    size: "sm",
  },
] as const;

const sociCards = [
  {
    icon: ImParagraphLeft,
    title: "Consulta lo Statuto dell’Associazione",
    external: true,
  },
  {
    icon: MdOutlineMailOutline,
    title: "Invia una Mail a info@polinetwork.org",
    description: (
      <ul className="list-disc pl-5">
        <li>Utilizza preferibilmente un indirizzo PoliMi valido</li>
        <li>Oggetto: “Richiesta ammissione sotto la qualifica di socio”</li>
        <li>
          Inserisci ogni informazione utile da avere (es username telegram)
        </li>
        <li>Se ricopri già ruoli in PoliNetwork, specificali</li>
      </ul>
    ),
  },
  {
    title: "Attendi la nostra Risposta",
    description:
      "Secondo le modalità descritte nella sezione “Ammissione” dello statuto",
    icon: TbArrowBack,
  },
];

export default function CollaboraPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-700 flex-col items-center justify-center gap-60 px-4 py-49 md:gap-38">
      <Hero
        title="Unisciti a Noi"
        description={`Nessuna simulazione, solo progetti reali.\nScopri come fare la differenza per migliaia di studenti del PoliMi`}
        gradientDescription
      />
      <TextOnlyLayout
        title="Cosa significa far parte di PoliNetwork"
        description={
          <>
            <p>
              PoliNetwork è gestita interamente da{" "}
              <span className="text-blue-secondary">
                studenti del Politecnico di Milano
              </span>
              .
            </p>
            <p>
              Tutto ciò che funziona, funziona perché c'è qualcuno che lo
              costruisce e lo mantiene: studenti che moderano centinaia di
              gruppi ogni giorno, sviluppano strumenti, gestiscono
              comunicazione, recruiting ed eventi.{" "}
              <span className="text-blue-secondary">
                Su base volontaria, senza compenso economico
              </span>
              .
            </p>
            <p>
              PoliNetwork è un{" "}
              <span className="text-blue-secondary">
                progetto con impatto reale e misurabile
              </span>
              . Nel corso del tempo, si ottengono competenze difficilmente
              acquisibili altrove e il{" "}
              <span className="text-blue-secondary">
                tipo di esperienza che spesso si cerca dopo la laurea, ma che
                qui è disponibile durante
              </span>
              .
            </p>
          </>
        }
        classNames={{
          section: "gap-28",
          textDiv: "flex-1 basis-120",
          descriptionDiv:
            "flex flex-col gap-5 typo-body-large md:typo-headline-small text-text-primary",
          contentDiv: "flex-1 basis-120 relative",
        }}
      >
        <svg
          width="489"
          height="275"
          viewBox="0 0 489 275"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute overflow-visible opacity-[0.6]"
        >
          <title> </title>
          <path
            d="M10673.119 156.297C10652.94 123.147 10627.403 93.7576 10609.208 60.534C10600.391 69.3885 10593.523 80.3046 10589.155 92.735L270.306 104.996C253.289 34.4198 185.651 -8.678 116.968 1.47518C47.3456 11.7673 -2.62349 73.1553 0.104537 142.271C2.90098 213.298 58.9078 269.595 128.757 273.868C199.399 278.19 261.525 228.163 272.649 157.825L10589.387 145.685C10601.701 182.044 10636.066 203.364 10671.11 201.955C10679.08 201.637 10686.755 200.198 10693.989 197.807C10689.532 183.34 10681.331 169.821 10673.119 156.297Z"
            fill="white"
          />
        </svg>

        <Image
          src="/logos/polinetwork.png"
          alt="PoliNetwork Logo"
          width={273}
          height={273}
          className="z-50"
        />

        <svg
          width="227"
          height="583"
          viewBox="0 0 227 583"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute overflow-visible left-[calc(50%+16px)] top-[273px] opacity-[0.6]"
        >
          <title> </title>
          <path
            d="M37.671 96.0842C43.0438 91.3958 50.565 92.1364 54.8139 96.8071C59.4338 101.886 59.5189 109.711 54.5573 114.445C49.5956 119.179 41.6509 119.328 36.9421 114.197C32.3936 109.234 31.9577 101.067 37.671 96.0842ZM204.019 577.703C208.001 583.137 215.547 584.935 221.715 580.136C226.483 576.429 228.177 568.838 223.774 562.843C220.397 558.25 213.203 556.06 207.264 559.871C200.88 563.969 199.847 571.994 204.027 577.7L204.019 577.703ZM187.932 532.294C192.517 537.5 199.634 537.718 204.616 533.848C210.156 529.549 211.081 521.758 206.826 516.133C203.218 511.357 195.675 509.176 189.641 514.109C183.17 519.407 183.871 527.668 187.94 532.291L187.932 532.294ZM138.802 394.007C144.141 398.397 151.023 397.485 155.04 393.7C160.734 388.327 160.111 380.607 155.704 375.998C150.999 371.079 143.337 370.152 137.848 375.813C132.15 381.69 134.131 390.169 138.802 394.007ZM155.706 440.663C160.223 444.533 167.499 444.549 172.039 439.931C176.777 435.113 177.113 427.562 172.803 422.612C168.493 417.663 160.911 416.42 155.107 421.982C149.233 427.614 150.395 436.112 155.709 440.671L155.706 440.663ZM20.8189 68.3389C26.5422 72.9816 33.5025 72.0156 37.4872 68.1804C43.02 62.8617 42.2906 54.7436 37.7566 50.2024C33.2226 45.6612 25.2938 44.7803 20.0137 50.4305C14.4729 56.3663 16.5953 64.9116 20.8189 68.3389ZM86.1353 252.13C90.0588 257.496 97.078 259.199 102.799 255.626C108.52 252.053 110.43 244.549 106.681 238.09C103.944 233.393 96.6201 230.221 90.0681 234.236C83.4853 238.265 82.4968 247.145 86.1465 252.134L86.1353 252.13ZM105.844 301.667C110.971 305.549 118.698 304.532 123.107 298.887C126.7 294.291 126.022 286.716 121.822 282.646C116.753 277.744 108.641 277.299 103.58 283.677C98.6502 289.875 100.753 297.825 105.847 301.675L105.844 301.667ZM70.6337 207.17C74.6403 211.635 82.1466 212.773 87.8046 207.648C92.0079 203.844 93.5547 196.44 89.0073 190.538C85.7095 186.263 77.8425 183.635 71.6969 188.832C65.6921 193.91 65.9802 201.977 70.6414 207.167L70.6337 207.17ZM53.9104 160.749C58.3204 165.262 66.1774 165.637 70.7332 161.422C75.7795 156.751 76.4499 149.485 72.1098 143.917C68.5137 139.312 60.4131 137.357 54.4558 142.682C48.4986 148.008 49.457 156.18 53.9181 160.745L53.9104 160.749ZM171.748 486.343C175.921 490.519 183.594 491.348 188.364 486.887C193.133 482.426 194.293 475.133 189.91 469.613C186.267 465.029 178.237 462.512 172.411 467.982C166.553 473.486 166.805 481.393 171.745 486.336L171.748 486.343ZM4.75379 22.4457C9.74121 26.5115 17.2459 25.3728 20.9736 21.3196C26.218 15.6113 25.3032 8.49759 20.9458 3.69026C16.5885 -1.11707 8.10609 -1.57934 3.0521 4.40506C-2.00189 10.3895 -0.318364 18.3161 4.74957 22.4569L4.75379 22.4457ZM121.793 347.408C126.794 352.035 134.628 351.314 139.367 345.947C143.742 340.986 143.064 333.328 137.945 328.42C133.58 324.23 126.146 324.277 121.011 329.304C115.711 334.48 116.822 342.805 121.793 347.408Z"
            fill="url(#paint0_linear_5514_7267)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_5514_7267"
              x1="11.1248"
              y1="16.1887"
              x2="215.793"
              y2="568.892"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="white" />
              <stop offset="1" stop-color="#FFFDF2" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </TextOnlyLayout>
      <TextChildrenLayout
        title="Diventa Admin"
        description={
          <>
            <p>Un admin è la presenza di PoliNetwork nei gruppi ogni giorno.</p>
            <p>
              Non servono competenze specifiche ma solamente{" "}
              <span className="text-blue-secondary">
                conoscenza del Politecnico, disponibilità a rispondere e
                pazienza
              </span>{" "}
              con le domande che si ripetono ogni anno.
            </p>
            <p>
              Chi diventa admin entra a far parte di una community di centinaia
              di studenti distribuiti su tutti i corsi e tutte le sedi del
              PoliMi, con cui{" "}
              <span className="text-blue-secondary">
                condivide l'esperienza di tenere in piedi qualcosa di concreto e
                utile.
              </span>
            </p>
          </>
        }
        classNames={{
          section: "gap-28",
          textDiv: "flex-1 basis-120",
          descriptionDiv: "flex flex-col gap-5",
          cardsContainer:
            "grid min-w-0 flex-1 basis-120 grid-cols-2 grid-rows-2 gap-x-8 gap-y-9",
        }}
      >
        {adminCards.map((card) => (
          <CardIcon
            key={card.title}
            {...card}
            align="start"
            className="w-full min-w-0"
          />
        ))}
      </TextChildrenLayout>
      <EnterSection /> {/* TODO: Icons*/}
      <TextChildrenLayout
        title="Entra in un Team"
        description={
          <>
            <p>
              Entrare in un team significa avere un{" "}
              <span className="text-blue-secondary">
                ruolo operativo con deliverable reali
              </span>
              , non essere osservatori di un progetto altrui.
            </p>
            <p>
              <span className="text-blue-secondary">
                Non servono esperienze pregresse per tutti i ruoli
              </span>
              . Serve chiarezza su cosa si sa fare, disponibilità a lavorare in
              modo autonomo e apertura ad occuparsi di cose nuove.
            </p>
            <p>
              PoliNetwork è in una fase di costruzione attiva:{" "}
              <span className="text-blue-secondary">
                chi entra adesso ha l'opportunità di definire come funzionerà
                nel medio periodo
              </span>
              , invece di limitarsi a eseguire procedure già consolidate.
            </p>
          </>
        }
        button={{
          text: "Scopri i team e come entrarci",
          icon: <FiArrowUpRight />,
        }}
        classNames={{
          section: "gap-28",
          textDiv: "flex-1 basis-120",
          descriptionDiv: "flex flex-col gap-5",
          cardsContainer:
            "grid min-w-0 flex-1 basis-120 grid-cols-2 grid-rows-2 gap-x-8 gap-y-9",
        }}
      >
        {teamsCards.map((card) => (
          <CardIcon
            key={card.title}
            {...card}
            align="start"
            className="w-full min-w-0"
          />
        ))}
      </TextChildrenLayout>
      <div className="flex w-full flex-col items-center gap-8 px-6 md:px-36 min-[1616px]:flex-row min-[1616px]:items-start">
        <TextImageLayout
          title="Diventa Socio di PoliNetwork"
          description={
            <>
              <p>
                Il tesseramento è il modo per fare parte di PoliNetwork in modo
                formale, con{" "}
                <span className="text-blue-secondary">diritto di voto</span>{" "}
                nelle Assemblee dei Soci, di candidarsi alle elezioni del
                direttivo e{" "}
                <span className="text-blue-secondary">accesso ai benefit</span>{" "}
                dell'associazione.
              </p>
              <p>
                <span className="text-blue-secondary">
                  È aperto ai membri attivi
                </span>{" "}
                dell'organizzazione: admin e componenti dei team operativi.
              </p>
            </>
          }
          imageSrc={sociImage}
          imageW={642}
          imageH={312}
          classNames={{
            section: "!flex-col flex-1 basis-120",
            descriptionDiv:
              "typo-body-large md:typo-headline-small text-text-primary",
          }}
        />
        <div className="flex-1 basis-120 flex flex-col gap-10">
          {sociCards.map((card, index) => (
            <div
              key={card.title}
              className={cn(
                "relative flex flex-row items-start before:absolute before:left-11 before:top-0 before:-bottom-10 before:z-0 before:w-1 before:bg-blue-secondary before:content-['']",
                index === sociCards.length - 1 && "before:hidden",
              )}
            >
              <CardIcon
                title=""
                icon={card.icon}
                size="xs"
                className={cn(
                  "relative z-10 min-w-fit min-h-fit [&>div>div>div>div]:bg-transparent [&_div>svg]:text-blue-secondary [&_div>svg]:h-10 [&_div>svg]:w-10 [&>div]:p-6",
                  index === sociCards.length - 1 && "[&_div>svg]:scale-x-[-1]",
                )}
                iconOnly
              />
              <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-1 pl-9">
                <div className="flex w-fit max-w-full flex-row items-center gap-1">
                  <h3 className="w-fit max-w-full flex-none bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent typo-headline-medium">
                    {card.title}
                  </h3>
                  {card.external && (
                    <MdOpenInNew className="min-h-6 min-w-6 text-[#2684D1]" />
                  )}
                </div>
                {card.description && <p>{card.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
